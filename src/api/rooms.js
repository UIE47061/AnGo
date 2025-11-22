import client from './client'

export const roomsApi = {
  /**
   * 建立房間
   * @param {Object} data
   * @param {string} data.displayName
   */
  createRoom(data) {
    return client.post('/rooms', data)
  },

  /**
   * 加入房間
   * @param {Object} data
   * @param {string} data.roomCode
   */
  joinRoom(data) {
    return client.post('/rooms/join', data)
  }
}
