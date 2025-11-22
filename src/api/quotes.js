import client from './client'

export const quotesApi = {
  /**
   * 獲取報價列表
   * @param {Object} params
   * @param {string} [params.religion] - 佛教 | 道教 | 無宗教/通用
   * @param {string} [params.sort] - price_asc | price_desc | rating_desc
   */
  getQuotes(params) {
    return client.get('/quotes', { params })
  },

  /**
   * 獲取單一報價詳情
   * @param {number|string} id
   */
  getQuoteDetail(id) {
    return client.get(`/quotes/${id}`)
  },

  /**
   * 委託廠商
   * @param {string} roomId
   * @param {number|string} quoteId
   * @param {Object} data
   * @param {string} data.notes
   */
  commissionQuote(roomId, quoteId, data) {
    return client.post('/quotes/requests', {
      roomId,
      quoteId,
      notes: data.notes
    })
  }
}
