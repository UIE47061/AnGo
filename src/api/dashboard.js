import client from './client'

export const dashboardApi = {
  /**
   * 獲取儀表板資訊
   * @param {string} familyId
   */
  getDashboardData(familyId) {
    return client.get(`/dashboard/${familyId}`)
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
