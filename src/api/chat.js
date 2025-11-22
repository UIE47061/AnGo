import client from './client'

export const chatApi = {
  /**
   * 獲取聊天記錄
   * @param {Object} params
   * @param {number} [params.limit]
   * @param {number|string} [params.before]
   */
  getMessages(params) {
    return client.get('/chat/messages', { params })
  },

  /**
   * 發送訊息
   * @param {Object} data
   * @param {string} data.content
   * @param {string} data.type - text
   */
  sendMessage(data) {
    return client.post('/chat/messages', data)
  },

  /**
   * 快速查詢
   * @param {string} query - document_status | payment_status
   */
  quickQuery(query) {
    return client.post('/chat/quick-query', { query })
  }
}
