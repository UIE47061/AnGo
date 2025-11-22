import client from './client'

export const documentsApi = {
  /**
   * 獲取文件列表
   * @param {string} roomId
   * @param {string} [status] - 全部 | 已審核 | 待補件 | 尚未上傳
   */
  getDocuments(roomId, status) {
    return client.get(`/documents/room/${roomId}`, {
      params: { status }
    })
  },

  /**
   * 上傳文件
   * @param {number|string} documentId
   * @param {File} file
   */
  uploadDocument(documentId, file) {
    const formData = new FormData()
    formData.append('documentId', documentId)
    formData.append('file', file)

    return client.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  /**
   * 查看文件詳情
   * @param {number|string} id
   */
  getDocumentDetail(id) {
    return client.get(`/documents/${id}`)
  }
}
