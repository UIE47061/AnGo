import client from './client'

export const dashboardApi = {
  /**
   * 獲取儀表板資訊
   * @param {string} roomId
   */
  getDashboardData(roomId) {
    return client.get(`/dashboard/${roomId}`)
  },

  /**
   * 獲取日曆事件
   * @param {number} year
   * @param {number} month
   */
  getCalendarEvents(year, month) {
    return client.get('/dashboard/calendar', {
      params: { year, month }
    })
  }
}
