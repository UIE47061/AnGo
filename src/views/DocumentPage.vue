<script setup>
import { ref, computed, onMounted } from 'vue'
import BottomNav from '@/components/BottomNav.vue'
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/useToast'
import { documentsApi } from '@/api/documents'

const { displayToast } = useToast()

const activeTab = ref('全部')
const tabs = ['全部', '已審核', '待補件', '尚未上傳']
const sortBy = ref('分類') // 預設依分類排序
const sortOptions = ['分類', '狀態', '日期']
const isLoading = ref(true)
const fileInput = ref(null)
const currentUploadDocId = ref(null)
const roomId = localStorage.getItem('roomId')

// 所有文件的完整列表
const allDocuments = ref([])

const fetchDocuments = async () => {
  console.log('[DocumentPage] fetchDocuments started')
  console.log('[DocumentPage] roomId:', roomId)

  if (!roomId) {
    console.warn('[DocumentPage] No roomId found')
    displayToast('找不到協作資訊，請重新登入')
    isLoading.value = false
    return
  }

  try {
    isLoading.value = true
    console.log('[DocumentPage] Calling documentsApi.getDocuments...')
    
    // Use the correct API method name: getDocuments
    // The client interceptor returns response.data, which is the array of documents
    const data = await documentsApi.getDocuments(roomId)
    console.log('[DocumentPage] API Response:', data)
    
    // Map backend data to frontend structure
    // Ensure data is an array before mapping
    const docs = Array.isArray(data) ? data : []
    
    allDocuments.value = docs.map(doc => ({
      id: doc.id,
      name: doc.name,
      category: doc.category,
      status: doc.status,
      deadline: doc.deadline ? new Date(doc.deadline).toLocaleDateString() : null,
      uploadDate: doc.status !== '尚未上傳' ? new Date(doc.updated_at).toLocaleDateString() : null,
      approveDate: doc.reviewed_at ? new Date(doc.reviewed_at).toLocaleDateString() : null,
      rejectReason: doc.reject_reason,
      uploadUrl: doc.upload_url
    }))
    console.log('[DocumentPage] Documents mapped:', allDocuments.value)
  } catch (error) {
    console.error('[DocumentPage] Failed to fetch documents:', error)
    displayToast('載入文件失敗')
  } finally {
    console.log('[DocumentPage] Setting isLoading to false')
    isLoading.value = false
  }
}

// 計算屬性：依選擇的標籤過濾文件
const filteredDocuments = computed(() => {
  if (activeTab.value === '全部') return allDocuments.value
  
  return allDocuments.value.filter(doc => {
    if (activeTab.value === '已審核') {
      return doc.status === '已審核' || doc.status === '審核中'
    } else if (activeTab.value === '待補件') {
      return doc.status === '待補件'
    } else if (activeTab.value === '尚未上傳') {
      return doc.status === '尚未上傳'
    }
    return false
  })
})

// 計算屬性：依選擇的排序方式排序文件
const documents = computed(() => {
  const filtered = filteredDocuments.value
  
  // 排序邏輯
  const sorted = [...filtered]
  
  if (sortBy.value === '狀態') {
    // 按狀態排序：尚未上傳 > 待補件 > 審核中 > 已審核
    const statusPriority = {
      '尚未上傳': 1,
      '待補件': 2,
      '審核中': 3,
      '已審核': 4
    }
    sorted.sort((a, b) => {
      const priorityDiff = statusPriority[a.status] - statusPriority[b.status]
      if (priorityDiff !== 0) return priorityDiff
      
      // 相同狀態則按日期排序
      if (a.deadline && b.deadline) {
        return new Date(a.deadline) - new Date(b.deadline)
      }
      return 0
    })
  } else if (sortBy.value === '日期') {
    // 按日期排序：越緊急的越上面
    sorted.sort((a, b) => {
      // 有deadline的優先
      if (a.deadline && !b.deadline) return -1
      if (!a.deadline && b.deadline) return 1
      
      // 兩個都有deadline，按日期排序
      if (a.deadline && b.deadline) {
        return new Date(a.deadline) - new Date(b.deadline)
      }
      
      // 兩個都沒有deadline，按上傳日期排序（較新的在前）
      if (a.uploadDate && b.uploadDate) {
        return new Date(b.uploadDate) - new Date(a.uploadDate)
      }
      
      return 0
    })
  } else if (sortBy.value === '分類') {
    // 按分類排序 (1. ..., 2. ...)
    sorted.sort((a, b) => {
      const catA = parseInt(a.category) || 0
      const catB = parseInt(b.category) || 0
      return catA - catB
    })
  }
  
  return sorted
})

const handleUpload = (doc) => {
  currentUploadDocId.value = doc.id
  fileInput.value.click()
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file || !currentUploadDocId.value) return

  try {
    displayToast('上傳中...')
    await documentsApi.uploadDocument(currentUploadDocId.value, file)
    displayToast('上傳成功')
    await fetchDocuments() // Refresh list
  } catch (error) {
    console.error('Upload failed:', error)
    displayToast('上傳失敗，請稍後再試')
  } finally {
    // Reset input
    event.target.value = ''
    currentUploadDocId.value = null
  }
}

const handleView = (doc) => {
  if (doc.uploadUrl) {
    window.open(doc.uploadUrl, '_blank')
  } else {
    displayToast('無法開啟文件')
  }
}

// 狀態管理功能 (模擬後台操作)
const updateStatus = async (doc, newStatus) => {
  try {
    // 這裡應該呼叫後端 API 更新狀態
    // 暫時模擬前端更新
    // await documentsApi.updateStatus(doc.id, newStatus)
    
    // 為了演示，我們直接呼叫後端 (需要實作 API)
    // 假設我們有一個 updateStatus API
    // const response = await client.patch(`/documents/${doc.id}/status`, { status: newStatus })
    
    // 既然沒有現成的 API client method，我們暫時只更新前端狀態並提示
    // 實際專案中應該實作 documentsApi.updateStatus
    
    // 讓我們實作一個簡單的 API call
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/documents/${doc.id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
    
    if (!response.ok) throw new Error('Update failed')
    
    displayToast(`狀態已更新為：${newStatus}`)
    await fetchDocuments()
  } catch (error) {
    console.error('Status update failed:', error)
    displayToast('更新狀態失敗')
  }
}
</script>

<template>
  <div class="phone">
    <main id="main-content">
      <header class="page-header">
        <h2>文件管理</h2>
        <p>追蹤所有文件的上傳與審核狀態</p>
      </header>
      
      <!-- 排序選擇器 -->
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>載入中...</p>
      </div>

      <template v-else>
        <div class="sort-section">
          <label class="sort-label">排序方式：</label>
          <div class="sort-buttons">
            <button
              v-for="option in sortOptions"
              :key="option"
              class="sort-btn"
              :class="{ active: sortBy === option }"
              @click="sortBy = option"
            >
              <svg v-if="option === '狀態'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="4" y1="6" x2="20" y2="6"/>
                <line x1="4" y1="12" x2="16" y2="12"/>
                <line x1="4" y1="18" x2="12" y2="18"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {{ option }}
            </button>
          </div>
        </div>

        <div class="doc-tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="doc-tab"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div class="doc-list">
          <div
            v-for="doc in documents"
            :key="doc.id"
            class="doc-card"
          >
            <div class="doc-header">
              <div class="doc-title-section">
                <h4>{{ doc.name }}</h4>
                <span class="doc-category">{{ doc.category }}</span>
              </div>
              <span class="doc-status" :class="doc.status === '審核中' ? 'reviewing' : doc.status">{{ doc.status }}</span>
            </div>
            <p v-if="doc.deadline" class="doc-note">
              <svg class="note-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              截止日期：{{ doc.deadline }}
            </p>
            <p v-if="doc.uploadDate" class="doc-note">
              <svg class="note-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
              </svg>
              上傳日期：{{ doc.uploadDate }}
            </p>
            <p v-if="doc.approveDate" class="doc-note">
              <svg class="note-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              核准日期：{{ doc.approveDate }}
            </p>
            <p v-if="doc.rejectReason" class="doc-note reject-reason">
              <svg class="note-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              退件原因：{{ doc.rejectReason }}
            </p>
            
            <div class="doc-actions">
              <button v-if="doc.status === '尚未上傳'" class="upload-btn" @click="handleUpload(doc)">
                <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                上傳文件
              </button>
              <button v-else-if="doc.status === '審核中'" class="view-doc" @click="handleView(doc)">
                <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                查看文件 (審核中)
              </button>
              <button v-else-if="doc.status === '已審核'" class="view-doc" @click="handleView(doc)">
                <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                查看文件
              </button>
              <button v-if="doc.status === '待補件'" class="reupload-doc" @click="handleUpload(doc)">
                <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                </svg>
                重新上傳
              </button>
            </div>
          </div>

          <div v-if="documents.length === 0" class="empty-state">
            <p>目前沒有{{ activeTab }}的文件</p>
          </div>
        </div>
      </template>

      <!-- Hidden File Input -->
      <input 
        type="file" 
        ref="fileInput" 
        style="display: none" 
        accept="image/*,.pdf"
        @change="handleFileChange" 
      />

    </main>

    <Toast />
    <BottomNav />
  </div>
</template>

<style scoped>
.phone {
  width: 100%;
  max-width: 414px;
  min-height: 100vh;
  background: #f5f5f7;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  margin: 0 auto;
  position: relative;
}

@media (min-width: 415px) {
  .phone {
    border-radius: 26px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
    min-height: 896px;
  }
}

#main-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  overflow-y: auto;
  padding: 1.8rem 1.5rem;
  padding-bottom: calc(120px + env(safe-area-inset-bottom));
}

.page-header h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #3c3453;
  letter-spacing: 0.05em;
}

.page-header p {
  margin: 0.35rem 0 0;
  color: #777;
  font-size: 0.95rem;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #9F35FF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 排序區域 */
.sort-section {
  background: #fff;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.sort-label {
  font-size: 0.9rem;
  color: #2b2b3a;
  font-weight: 600;
  white-space: nowrap;
}

.sort-buttons {
  display: flex;
  gap: 8px;
  flex: 1;
}

.sort-btn {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1.5px solid #e6e6ee;
  background: #fff;
  color: #6b6b80;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 40px;
}

.sort-btn svg {
  stroke: currentColor;
}

.sort-btn:hover {
  border-color: #9F35FF;
  background: #faf5ff;
}

.sort-btn.active {
  border-color: #9F35FF;
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #fff;
  box-shadow: 0 2px 8px rgba(159, 53, 255, 0.3);
}

.doc-tabs {
  display: flex;
  gap: 8px;
  background: transparent;
  padding: 8px 0 12px;
  overflow-x: auto;
}

.doc-tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  min-height: 44px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.92rem;
  color: #6b6b80;
  background: #f5f6fb;
  border: 1px solid #ececf3;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  touch-action: manipulation;
}

.doc-tab.active {
  background: #9F35FF;
  color: #fff;
  box-shadow: 0 8px 18px rgba(159, 53, 255, 0.28);
}

.doc-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.doc-card {
  background: #fff;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
}

.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 12px;
}

.doc-title-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.doc-header h4 {
  margin: 0;
  font-size: 1.05rem;
  color: #2b2b3a;
}

.doc-category {
  font-size: 0.75rem;
  color: #9a9ab0;
  font-weight: 500;
}

.doc-status {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.doc-status.尚未上傳 {
  background: #fef3c7;
  color: #92400e;
}

.doc-status.已審核 {
  background: #d1fae5;
  color: #065f46;
}

.doc-status.待補件 {
  background: #fee2e2;
  color: #991b1b;
}

.doc-status.reviewing,
.doc-status.審核中 {
  background: #dbeafe;
  color: #1e40af;
}

.doc-note {
  font-size: 0.82rem;
  color: #6b6b80;
  line-height: 1.4;
  margin: 4px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.note-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.7;
}

.reject-reason {
  color: #dc2626;
  background: #fef2f2;
  padding: 8px;
  border-radius: 6px;
  margin-top: 8px;
}

.reject-reason .note-icon {
  opacity: 1;
}

.doc-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.view-doc,
.upload-btn {
  flex: 1;
  padding: 10px;
  min-height: 44px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #ececf3;
  color: #2b2b3a;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  touch-action: manipulation;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.view-doc:hover,
.upload-btn:hover {
  background: #f8f8fb;
  border-color: #9F35FF;
}

.reupload-doc {
  flex: 1;
  padding: 10px;
  min-height: 44px;
  border-radius: 10px;
  border: none;
  background: #9F35FF;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  touch-action: manipulation;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.reupload-doc:hover {
  background: #7a1fd9;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #9a9ab0;
}

.empty-state p {
  margin: 0;
  font-size: 0.95rem;
}

/* Grouped View Styles */
.doc-group {
  margin-bottom: 24px;
}

.group-title {
  font-size: 1.1rem;
  color: #3c3453;
  margin: 0 0 12px 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.group-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background: #9F35FF;
  margin-right: 8px;
  border-radius: 2px;
}
</style>
