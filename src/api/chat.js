import client from './client'

export const chatApi = {
  /**
   * 獲取聊天記錄
   * @param {string} familyId
   * @param {Object} params
   * @param {number} [params.limit]
   * @param {number|string} [params.before]
   */
  getMessages(familyId, params) {
    return client.get(`/messages/${familyId}`, { params })
  },

  /**
   * 發送訊息
   * @param {string} familyId
   * @param {Object} data
   * @param {string} data.content
   * @param {string} data.senderType - family | assistant | provider
   */
  sendMessage(familyId, data) {
    return client.post(`/messages/${familyId}`, data)
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
