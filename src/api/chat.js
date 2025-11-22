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
   * 快速查詢
   * @param {string} query - document_status | payment_status
   */
  quickQuery(query) {
    return client.post('/ai/chat/quick-query', { query })
  }
}
