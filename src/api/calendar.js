import client from './client'

export const calendarApi = {
  /**
   * 獲取行事曆活動
   * @param {string} roomId
   * @param {number} [year]
   * @param {number} [month]
   */
  getEvents(roomId, year, month) {
    return client.get(`/calendar/${roomId}/events`, {
      params: { year, month }
    })
  },

  /**
   * 新增行事曆活動
   * @param {string} roomId
   * @param {Object} data
   * @param {string} data.title
   * @param {string} data.date - YYYY-MM-DD
   * @param {string} data.time - HH:MM
   * @param {string} data.category - 行政 | 禮儀
   * @param {string[]} data.participants - Array of user IDs
   */
  createEvent(roomId, data) {
    return client.post(`/calendar/${roomId}/events`, data)
  },

  /**
   * 獲取共編成員列表
   * @param {string} roomId
   */
  getCollaborators(roomId) {
    return client.get(`/calendar/${roomId}/collaborators`)
  },

  /**
   * 獲取共編代碼
   * @param {string} roomId
   */
  getShareCode(roomId) {
    return client.get(`/calendar/${roomId}/share-code`)
  },

  /**
   * 刪除行事曆活動
   * @param {string} roomId
   * @param {string} eventId
   */
  deleteEvent(roomId, eventId) {
    return client.delete(`/calendar/${roomId}/events/${eventId}`)
  }
}
