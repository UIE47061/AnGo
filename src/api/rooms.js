import client from './client'

export const roomsApi = {
  /**
   * 建立協作
   * @param {Object} data
   * @param {string} data.displayName
   */
  createRoom(data) {
    return client.post('/rooms', data)
  },

  /**
   * 加入協作
   * @param {Object} data
   * @param {string} data.roomCode
   */
  joinRoom(data) {
    return client.post('/rooms/join', data)
  },

  /**
   * 取得協作成員
   * @param {string} roomId
   */
  getMembers(roomId) {
    return client.get(`/rooms/${roomId}/members`)
  }
}
