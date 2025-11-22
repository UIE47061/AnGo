import client from './client'

export const paymentsApi = {
  /**
   * 獲取金流進度
   */
  getPaymentStatus() {
    return client.get('/payment/status')
  },

  /**
   * 獲取交易歷史
   */
  getTransactions() {
    return client.get('/payment/transactions')
  }
}
