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
   * @param {Array<{processId: number, providerName: string, assignType?: string, assignedUserId?: string}>} services
   */
  updateServices(roomId, services) {
    return client.put(`/services/${roomId}`, services)
  },

  /**
   * 分配單一服務 (業者或家屬)
   * @param {string} roomId
   * @param {object} service { processId, providerName, assignType, assignedUserId }
   */
  assignService(roomId, service) {
    return this.updateServices(roomId, [service])
  },

  /**
   * 更新服務狀態
   * @param {string} roomId
   * @param {number} processId
   * @param {string} status
   */
  updateStatus(roomId, processId, status) {
    return client.patch(`/services/${roomId}/${processId}/status`, { status })
  }
}
