<script setup>
import { ref, computed } from 'vue'
import BottomNav from '@/components/BottomNav.vue'

const activeTab = ref('全部')
const tabs = ['全部', '已審核', '待補件', '尚未上傳']

// 所有文件的完整列表
const allDocuments = ref([
  { id: 1, name: '死亡證明書', status: '尚未上傳', deadline: '2025/11/25', category: '必要文件' },
  { id: 2, name: '除戶謄本', status: '尚未上傳', deadline: '2025/11/30', category: '必要文件' },
  { id: 3, name: '戶籍謄本', status: '已審核', approveDate: '2025/11/14', uploadDate: '2025/11/10', category: '必要文件' },
  { id: 4, name: '身分證影本（亡者）', status: '已審核', approveDate: '2025/11/15', uploadDate: '2025/11/12', category: '身份證明' },
  { id: 5, name: '身分證影本（申請人）', status: '已審核', approveDate: '2025/11/16', uploadDate: '2025/11/13', category: '身份證明' },
  { id: 6, name: '火化許可證', status: '待補件', uploadDate: '2025/11/10', rejectReason: '文件模糊，請重新上傳清晰版本', category: '火化相關' },
  { id: 7, name: '安葬許可證', status: '待補件', uploadDate: '2025/11/11', rejectReason: '缺少簽章', category: '安葬相關' },
  { id: 8, name: '醫院診斷證明', status: '已審核', approveDate: '2025/11/13', uploadDate: '2025/11/09', category: '醫療文件' },
  { id: 9, name: '健保卡（亡者）', status: '尚未上傳', deadline: '2025/11/28', category: '健保相關' },
  { id: 10, name: '土地使用同意書', status: '已審核', approveDate: '2025/11/12', uploadDate: '2025/11/08', category: '安葬相關' }
])

// 根據選中的標籤過濾文件
const documents = computed(() => {
  if (activeTab.value === '全部') {
    return allDocuments.value
  } else if (activeTab.value === '已審核') {
    return allDocuments.value.filter(doc => doc.status === '已審核')
  } else if (activeTab.value === '待補件') {
    return allDocuments.value.filter(doc => doc.status === '待補件')
  } else if (activeTab.value === '尚未上傳') {
    return allDocuments.value.filter(doc => doc.status === '尚未上傳')
  }
  return []
})

const handleUpload = (doc) => {
  alert(`上傳文件：${doc.name}`)
}

const handleView = (doc) => {
  alert(`查看文件：${doc.name}`)
}
</script>

<template>
  <div class="phone">
    <main id="main-content">
      <header class="page-header">
        <h2>文件管理</h2>
        <p>追蹤所有文件的上傳與審核狀態</p>
      </header>

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
            <span class="doc-status" :class="doc.status">{{ doc.status }}</span>
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
            <button v-else class="view-doc" @click="handleView(doc)">
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
    </main>

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
  background: #c77ddb;
  color: #fff;
  box-shadow: 0 8px 18px rgba(199, 125, 219, 0.28);
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
  border-color: #c77ddb;
}

.reupload-doc {
  flex: 1;
  padding: 10px;
  min-height: 44px;
  border-radius: 10px;
  border: none;
  background: #c77ddb;
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
  background: #9b59b6;
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
</style>
