import client from './client'

export const chatApi = {
  /**
   * 獲取聊天記錄
   * @param {string} roomId
   * @param {Object} params
   * @param {number} [params.limit]
   * @param {number|string} [params.before]
   */
  getMessages(roomId, params) {
    return client.get(`/messages/${roomId}`, { params })
  },

  /**
   * 發送訊息
   * @param {string} roomId
   * @param {Object} data
   * @param {string} data.content
   * @param {string} data.senderType - family | assistant | provider
   */
  sendMessage(roomId, data) {
    return client.post(`/messages/${roomId}`, data)
  },

  /**
   * 發送 AI 訊息
   * @param {string} message
   */
  sendAiMessage(message) {
    return client.post('/ai/chat', { message })
  },

  /**
   * 發送 AI 串流訊息
   * @param {string} message
   * @param {function} onChunk - 接收到數據塊時的回調函數
   * @param {function} onDone - 完成時的回調函數
   * @param {function} onError - 發生錯誤時的回調函數
   */
  async streamAiMessage(message, onChunk, onDone, onError) {
    try {
      let baseURL = client.defaults.baseURL
      if (baseURL.endsWith('/')) {
        baseURL = baseURL.slice(0, -1)
      }
      
      const token = localStorage.getItem('token')
      console.log('[Stream] Connecting to:', `${baseURL}/ai/chat/stream`)
      
      const response = await fetch(`${baseURL}/ai/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ 
          message,
          systemPrompt: '你是安行助理，請使用繁體中文回答所有問題。'
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        
        const chunkText = decoder.decode(value, { stream: true })
        console.log('[Stream] Received chunk raw:', chunkText)
        buffer += chunkText
        const lines = buffer.split('\n')
        
        // Process all complete lines
        buffer = lines.pop() || '' 
        
        for (const line of lines) {
          if (line.trim() === '') continue
          console.log('[Stream] Processing line:', line)
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') {
              console.log('[Stream] Received DONE signal')
              if (onDone) onDone()
              return
            }
            try {
              const parsed = JSON.parse(data)
              if (parsed.content && onChunk) {
                console.log('[Stream] Parsed content:', parsed.content)
                onChunk(parsed.content)
              }
            } catch (e) {
              console.warn('Failed to parse chunk:', e)
            }
          }
        }
      }
    } catch (error) {
      if (onError) onError(error)
    }
  },

  /**
   * 快速查詢
   * @param {string} query - document_status | payment_status
   */
  quickQuery(query) {
    return client.post('/ai/chat/quick-query', { query })
  }
}
