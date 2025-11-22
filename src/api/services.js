import client from './client'

export const servicesApi = {
  /**
   * 獲取房間已分配的服務
   * @param {string} roomId
   */
  getServices(roomId) {
    return client.get(`/services/${roomId}`)
  },

  /**
   * 更新房間已分配的服務
   * @param {string} roomId
   * @param {Array<{processId: number, providerName: string}>} services
   */
  updateServices(roomId, services) {
    return client.put(`/services/${roomId}`, services)
  }
}
