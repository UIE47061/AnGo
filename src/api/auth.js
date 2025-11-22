import client from './client'

export const authApi = {
  /**
   * 用戶登入
   * @param {Object} data
   * @param {string} data.phone
   * @param {string} data.password
   */
  login(data) {
    return client.post('/auth/login', data)
  },

  /**
   * 獲取用戶資訊
   */
  getMe() {
    return client.get('/auth/me')
  }
}
