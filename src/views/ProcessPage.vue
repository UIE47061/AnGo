<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/useToast'
import { dashboardApi } from '@/api/dashboard'
import { servicesApi } from '@/api/services'
import { roomsApi } from '@/api/rooms'

const router = useRouter()
const { displayToast } = useToast()

// 共編相關狀態
const showShareDialog = ref(false)
const shareCode = ref('')

onMounted(async () => {
  try {
    const roomId = localStorage.getItem('roomId')
    if (roomId) {
      // 1. Get Room Info
      const res = await dashboardApi.getDashboardData(roomId)
      shareCode.value = res.room.roomCode

      // 2. Get Room Members
      const members = await roomsApi.getMembers(roomId)
      familyMembers.value = members.map(m => ({
        id: m.id,
        name: m.name,
        role: m.role === 'family_member' ? '家屬' : m.role,
        isOwner: false // TODO: Determine owner
      }))

      // 3. Get Assigned Services
      const services = await servicesApi.getServices(roomId)
      
      // Update process steps with assigned services
      services.forEach(service => {
        const step = processSteps.value.find(s => s.id === service.processId)
        if (step) {
          step.assignedTo = service.providerName
          // Map backend 'family' to frontend 'self' for styling, or update styling
          step.assignType = service.assignType === 'family' ? 'self' : 'vendor'
          step.assignedUserId = service.assignedUserId
          if (service.status) {
            step.status = service.status
          }
          if (service.serviceDate) {
            step.date = service.serviceDate
          }
        }
      })
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
})

// 日期編輯相關狀態
const showDateDialog = ref(false)
const editingDateStep = ref(null)
const tempDate = ref('')

const openDateDialog = (step) => {
  editingDateStep.value = step
  tempDate.value = step.date || new Date().toISOString().split('T')[0]
  showDateDialog.value = true
}

const closeDateDialog = () => {
  showDateDialog.value = false
  editingDateStep.value = null
  tempDate.value = ''
}

const saveDate = async () => {
  if (editingDateStep.value && tempDate.value) {
    try {
      const roomId = localStorage.getItem('roomId')
      await servicesApi.updateStatus(
        roomId, 
        editingDateStep.value.id, 
        editingDateStep.value.status,
        tempDate.value
      )
      
      editingDateStep.value.date = tempDate.value
      displayToast('日期已更新')
      closeDateDialog()
    } catch (error) {
      console.error('Failed to update date:', error)
      displayToast('更新日期失敗')
    }
  }
}

// 分配相關狀態
const showAssignDialog = ref(false)
const assigningStep = ref(null)
const assignType = ref('vendor') // 'vendor' 或 'family'

// 共編成員列表（從共編代碼加入的親戚）
const familyMembers = ref([
  { id: 1, name: '馬阿姨', role: '主要聯絡人', isOwner: true },
  { id: 2, name: '趙叔', role: '家屬', isOwner: false },
  { id: 3, name: '王先生', role: '家屬', isOwner: false },
  { id: 4, name: '李小姐', role: '家屬', isOwner: false }
])

// 流程步驟資料
const processSteps = ref([
  {
    id: 1,
    title: '驗屍檢驗',
    status: 'completed',
    date: '2025-11-02',
    assignedTo: '趙叔',
    assignType: 'self', // 'self' 自辦, 'vendor' 業者, 'unassigned' 未分配
    description: '完成死因確認與相關醫療文件取得',
    details: [
      '確認死亡原因',
      '取得死亡證明書',
      '完成相驗程序'
    ]
  },
  {
    id: 2,
    title: '遺體接運',
    status: 'completed',
    date: '2025-11-03',
    assignedTo: '龍岩禮儀公司',
    assignType: 'vendor',
    description: '將往生者遺體安全送至殯儀館',
    details: [
      '遺體接運服務',
      '專業冷藏保存',
      '運送至指定殯儀館'
    ]
  },
  {
    id: 3,
    title: '入館安置',
    status: 'completed',
    date: '2025-11-04',
    assignedTo: '龍岩禮儀公司',
    assignType: 'vendor',
    description: '完成殯儀館入館手續與安置',
    details: [
      '辦理入館登記',
      '安置於冷藏室',
      '確認靈堂位置'
    ]
  },
  {
    id: 4,
    title: '禮儀安排',
    status: 'in-progress',
    date: '2025-11-22',
    assignedTo: '龍岩禮儀公司',
    assignType: 'vendor',
    description: '規劃告別式與相關儀式流程',
    details: [
      '確認告別式日期',
      '安排宗教儀式',
      '訃聞設計印製',
      '會場佈置規劃',
      '音樂影片製作'
    ],
    deadline: '2025-11-25'
  },
  {
    id: 5,
    title: '許可申請',
    status: 'pending',
    date: null,
    assignedTo: null,
    assignType: 'unassigned',
    description: '申請火化或安葬相關許可文件',
    details: [
      '火化許可證申請',
      '安葬許可證申請',
      '相關文件準備',
      '政府機關送件'
    ],
    needAssign: true
  },
  {
    id: 6,
    title: '安葬作業',
    status: 'pending',
    date: null,
    assignedTo: null,
    assignType: 'unassigned',
    description: '完成火化或土葬等安葬事宜',
    details: [
      '火化儀式執行',
      '骨灰處理',
      '塔位或墓地安置',
      '後續祭祀安排'
    ],
    needAssign: true
  },
  {
    id: 7,
    title: '後續處理',
    status: 'pending',
    date: null,
    assignedTo: null,
    assignType: 'unassigned',
    description: '處理善後事宜與關懷服務',
    details: [
      '結清所有費用',
      '取得相關證明',
      '除戶登記',
      '遺產相關諮詢',
      '後續關懷服務'
    ],
    needAssign: true
  }
])

const getStatusText = (status) => {
  const statusMap = {
    'completed': '已完成',
    'in-progress': '進行中',
    'pending': '待處理'
  }
  return statusMap[status] || '待處理'
}

const getStatusColor = (status) => {
  const colorMap = {
    'completed': '#10b981',
    'in-progress': '#9F35FF',
    'pending': '#94a3b8'
  }
  return colorMap[status] || '#94a3b8'
}

const getAssignBadgeStyle = (assignType) => {
  switch (assignType) {
    case 'self':
      return { background: '#dbeafe', color: '#2563eb' } // 藍色 - 自辦
    case 'vendor':
      return { background: '#fef3c7', color: '#f59e0b' } // 橘色 - 業者
    case 'unassigned':
      return { background: '#fee2e2', color: '#ef4444' } // 紅色 - 未分配
    default:
      return { background: '#f3f4f6', color: '#6b7280' }
  }
}

const navigateToVendors = () => {
  // TODO: 導向業務頁面尋找相關業者
  router.push({ name: 'Quote' })
}

// 共編功能
const openShareDialog = () => {
  showShareDialog.value = true
}

const closeShareDialog = () => {
  showShareDialog.value = false
}

const copyShareCode = () => {
  if (shareCode.value) {
    navigator.clipboard.writeText(shareCode.value)
    displayToast('代碼已複製到剪貼簿！')
  }
}

// 分配功能
const openAssignDialog = (step) => {
  assigningStep.value = step
  assignType.value = 'vendor'
  showAssignDialog.value = true
}

const closeAssignDialog = () => {
  showAssignDialog.value = false
  assigningStep.value = null
}

const assignToVendor = () => {
  closeAssignDialog()
  router.push({ name: 'Quote' })
}

const assignToFamily = async (member) => {
  if (assigningStep.value) {
    // Store reference before closing dialog
    const stepToUpdate = assigningStep.value
    
    try {
      const roomId = localStorage.getItem('roomId')
      await servicesApi.assignService(roomId, {
        processId: stepToUpdate.id,
        providerName: member.name,
        assignType: 'family',
        assignedUserId: member.id
      })

      // Update UI
      stepToUpdate.assignedTo = member.name
      stepToUpdate.assignType = 'self'
      stepToUpdate.assignedUserId = member.id
      
      closeAssignDialog()
      displayToast(`已分配給 ${member.name}`)
    } catch (error) {
      console.error('Assign failed:', error)
      displayToast('分配失敗')
    }
  }
}

const expandedStep = ref(null)

const toggleStep = (stepId) => {
  expandedStep.value = expandedStep.value === stepId ? null : stepId
}

const updateStepStatus = async (step, newStatus) => {
  try {
    const roomId = localStorage.getItem('roomId')
    await servicesApi.updateStatus(roomId, step.id, newStatus)
    step.status = newStatus
    displayToast('狀態已更新')
  } catch (error) {
    console.error('Failed to update status:', error)
    displayToast('更新失敗')
  }
}
</script>

<template>
  <div class="phone">
    <main id="main-content">
      <header class="page-header">
        <div>
          <h2>辦理流程</h2>
          <p>追蹤您的辦理進度</p>
        </div>
        
        <!-- 共編按鈕 -->
        <button class="share-btn" @click="openShareDialog" aria-label="共編流程">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span>共編</span>
        </button>
      </header>

      <!-- 進度總覽 -->
      <section class="progress-overview">
        <div class="progress-stats">
          <div class="stat-item">
            <div class="stat-number">{{ processSteps.filter(s => s.status === 'completed').length }}</div>
            <div class="stat-label">已完成</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">{{ processSteps.filter(s => s.status === 'in-progress').length }}</div>
            <div class="stat-label">進行中</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">{{ processSteps.filter(s => s.status === 'pending').length }}</div>
            <div class="stat-label">待處理</div>
          </div>
        </div>
        <div class="progress-bar-container">
          <div 
            class="progress-bar-fill" 
            :style="{ width: `${(processSteps.filter(s => s.status === 'completed').length / processSteps.length) * 100}%` }"
          ></div>
        </div>
      </section>

      <!-- 流程步驟列表 -->
      <section class="process-list">
        <div
          v-for="(step, index) in processSteps"
          :key="step.id"
          class="process-step"
          :class="{ 
            expanded: expandedStep === step.id,
            completed: step.status === 'completed',
            active: step.status === 'in-progress'
          }"
        >
          <div class="step-header" @click="toggleStep(step.id)">
            <div class="step-indicator">
              <div class="step-number" :style="{ background: getStatusColor(step.status) }">
                <svg v-if="step.status === 'completed'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ffffff" stroke-width="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div v-if="index < processSteps.length - 1" class="step-line"></div>
            </div>

            <div class="step-content">
              <div class="step-title-row">
                <h3 class="step-title">{{ step.title }}</h3>
                <span class="step-status" :style="{ color: getStatusColor(step.status) }">
                  {{ getStatusText(step.status) }}
                </span>
              </div>
              
              <!-- 負責人資訊 -->
              <div class="assign-info">
                <div 
                  v-if="step.assignedTo" 
                  class="assign-badge clickable" 
                  :style="getAssignBadgeStyle(step.assignType)"
                  @click.stop="openAssignDialog(step)"
                >
                  <svg v-if="step.assignType === 'vendor'" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                  </svg>
                  <span>{{ step.assignType === 'vendor' ? '業者' : '自辦' }}：{{ step.assignedTo }}</span>
                  <svg class="edit-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <button v-else class="unassigned-badge" @click.stop="openAssignDialog(step)">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  <span>尚未分配 - 點此分配</span>
                </button>
              </div>
              
              <p class="step-description">{{ step.description }}</p>
              <div 
                class="step-date clickable" 
                @click.stop="openDateDialog(step)"
                :class="{ 'placeholder': !step.date }"
              >
                📅 {{ step.date || '設定日期' }}
                <svg class="edit-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <div v-if="step.deadline && step.status === 'in-progress'" class="step-deadline">
                ⚠️ 截止日期：{{ step.deadline }}
              </div>
            </div>

            <div class="expand-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <transition name="expand">
            <div v-if="expandedStep === step.id" class="step-details">
              <div class="status-control">
                <label>變更狀態：</label>
                <select :value="step.status" @change="updateStepStatus(step, $event.target.value)" class="status-select">
                  <option value="pending">待處理</option>
                  <option value="in-progress">進行中</option>
                  <option value="completed">已完成</option>
                </select>
              </div>

              <h4>詳細項目：</h4>
              <ul class="details-list">
                <li v-for="(detail, idx) in step.details" :key="idx">
                  {{ detail }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </section>
    </main>

    <!-- 日期編輯對話框 -->
    <transition name="dialog-fade">
      <div v-if="showDateDialog" class="dialog-overlay" @click="closeDateDialog">
        <div class="dialog-content" @click.stop>
          <div class="dialog-header">
            <h3>設定日期</h3>
            <button class="close-btn" @click="closeDateDialog" aria-label="關閉">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div class="dialog-body">
            <div class="form-group">
              <label>選擇日期</label>
              <input type="date" v-model="tempDate" class="date-input" />
            </div>
            <button class="primary-btn" @click="saveDate">確認儲存</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 共編對話框 -->
    <transition name="dialog-fade">
      <div v-if="showShareDialog" class="dialog-overlay" @click="closeShareDialog">
        <div class="dialog-content" @click.stop>
          <div class="dialog-header">
            <h3>流程共編</h3>
            <button class="close-btn" @click="closeShareDialog" aria-label="關閉">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div class="dialog-body">
            <p class="instruction">分享此代碼給親戚，一起查看流程進度</p>
            
            <div class="code-display">
              <div class="code-box">
                <span class="code-text">{{ shareCode || '載入中...' }}</span>
              </div>
              <button class="copy-btn" @click="copyShareCode" :disabled="!shareCode">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                複製代碼
              </button>
              <p class="hint-text">分享此代碼即可邀請親戚加入共編</p>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 分配對話框 -->
    <transition name="dialog-fade">
      <div v-if="showAssignDialog" class="dialog-overlay" @click="closeAssignDialog">
        <div class="dialog-content" @click.stop>
          <div class="dialog-header">
            <h3>分配負責人</h3>
            <button class="close-btn" @click="closeAssignDialog" aria-label="關閉">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <!-- 分配類型切換 -->
          <div class="mode-tabs">
            <button 
              class="mode-tab"
              :class="{ active: assignType === 'vendor' }"
              @click="assignType = 'vendor'"
            >
              尋找業者
            </button>
            <button 
              class="mode-tab"
              :class="{ active: assignType === 'family' }"
              @click="assignType = 'family'"
            >
              分配親戚
            </button>
          </div>

          <div class="dialog-body">
            <!-- 尋找業者 -->
            <div v-if="assignType === 'vendor'">
              <p class="instruction">前往業務頁面尋找合適的禮儀業者</p>
              <button class="primary-btn" @click="assignToVendor">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                前往業務頁面
              </button>
            </div>

            <!-- 分配親戚 -->
            <div v-else>
              <p class="instruction">選擇負責的親戚成員</p>
              <div class="family-list">
                <button
                  v-for="member in familyMembers"
                  :key="member.id"
                  class="family-item"
                  @click="assignToFamily(member)"
                >
                  <div class="family-avatar">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div class="family-info">
                    <div class="family-name">
                      {{ member.name }}
                      <span v-if="member.isOwner" class="owner-badge">擁有者</span>
                    </div>
                    <div class="family-role">{{ member.role }}</div>
                  </div>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

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

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
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

.share-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1rem;
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #ffffff;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(159, 53, 255, 0.3);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(159, 53, 255, 0.4);
}

.share-btn:active {
  transform: translateY(0);
}

/* 進度總覽 */
.progress-overview {
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  border-radius: 1.2rem;
  padding: 1.5rem;
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(159, 53, 255, 0.3);
}

.progress-stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1.2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.85rem;
  opacity: 0.9;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

.progress-bar-container {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: #ffffff;
  border-radius: 999px;
  transition: width 0.3s ease;
}

/* 流程步驟列表 */
.process-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.process-step {
  background: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.process-step.active {
  box-shadow: 0 4px 16px rgba(159, 53, 255, 0.2);
}

.step-header {
  display: flex;
  gap: 1rem;
  padding: 1.2rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.step-header:hover {
  background: rgba(159, 53, 255, 0.02);
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.step-line {
  width: 2px;
  flex: 1;
  min-height: 30px;
  background: #e5e7eb;
  margin-top: 0.5rem;
}

.step-content {
  flex: 1;
  min-width: 0;
}

.step-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.step-title {
  margin: 0;
  font-size: 1.1rem;
  color: #3c3453;
}

.step-status {
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
}

/* 負責人資訊 */
.assign-info {
  margin-bottom: 0.6rem;
}

.assign-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.assign-badge.clickable {
  cursor: pointer;
}

.assign-badge.clickable:hover {
  filter: brightness(0.95);
  transform: translateY(-1px);
}

.edit-icon {
  margin-left: 0.2rem;
  opacity: 0.6;
}

.unassigned-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  background: #fee2e2;
  color: #ef4444;
  border: 1px dashed #ef4444;
  cursor: pointer;
  transition: all 0.2s ease;
}

.unassigned-badge:hover {
  background: #fecaca;
  transform: translateY(-1px);
}

.unassigned-badge svg {
  flex-shrink: 0;
}

.step-description {
  margin: 0 0 0.5rem;
  color: #6b6b80;
  font-size: 0.9rem;
  line-height: 1.4;
}

.step-date {
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.step-date.clickable {
  cursor: pointer;
  transition: color 0.2s;
}

.step-date.clickable:hover {
  color: #9F35FF;
}

.step-date.placeholder {
  color: #999;
  font-style: italic;
}

.date-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-weight: 500;
}

.step-deadline {
  font-size: 0.85rem;
  color: #f59e0b;
  margin-top: 0.3rem;
  font-weight: 500;
}

.expand-icon {
  flex-shrink: 0;
  color: #94a3b8;
  transition: transform 0.2s ease;
}

.process-step.expanded .expand-icon {
  transform: rotate(180deg);
}

/* 步驟詳情 */
.step-details {
  padding: 0 1.2rem 1.2rem 1.2rem;
  border-top: 1px solid #f0f0f0;
  margin-top: 0.5rem;
  padding-top: 1rem;
}

.step-details h4 {
  margin: 0 0 0.8rem;
  color: #3c3453;
  font-size: 0.95rem;
}

.details-list {
  margin: 0;
  padding-left: 1.5rem;
  color: #6b6b80;
  font-size: 0.9rem;
  line-height: 1.8;
}

.details-list li {
  margin-bottom: 0.4rem;
}

/* 展開動畫 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 500px;
}

/* 對話框樣式 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.dialog-content {
  background: #ffffff;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.dialog-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #3c3453;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b6b80;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.mode-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem 0;
}

.mode-tab {
  flex: 1;
  padding: 0.7rem 1rem;
  background: transparent;
  border: 1px solid rgba(159, 53, 255, 0.2);
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #6b6b80;
  transition: all 0.2s ease;
}

.mode-tab.active {
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  border-color: #9F35FF;
  color: #ffffff;
}

.dialog-body {
  padding: 1.5rem;
}

.instruction {
  margin: 0 0 1.2rem;
  color: #6b6b80;
  font-size: 0.9rem;
  line-height: 1.5;
}

.generate-section,
.input-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.primary-btn {
  width: 100%;
  padding: 0.9rem 1.2rem;
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #ffffff;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(159, 53, 255, 0.3);
}

.primary-btn:active {
  transform: translateY(0);
}

.code-display {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.code-box {
  background: linear-gradient(135deg, rgba(159, 53, 255, 0.1), rgba(159, 53, 255, 0.05));
  border: 2px dashed #9F35FF;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  width: 100%;
  text-align: center;
}

.code-text {
  font-size: 2rem;
  font-weight: 700;
  color: #9F35FF;
  letter-spacing: 0.3em;
  font-family: 'Courier New', monospace;
}

.copy-btn {
  padding: 0.6rem 1.2rem;
  background: #ffffff;
  border: 1px solid #9F35FF;
  color: #9F35FF;
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: rgba(159, 53, 255, 0.05);
}

.hint-text {
  margin: 0;
  color: #999;
  font-size: 0.8rem;
}

.code-input {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 2px solid rgba(159, 53, 255, 0.2);
  border-radius: 0.8rem;
  font-size: 1.2rem;
  text-align: center;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  color: #3c3453;
  transition: all 0.2s ease;
}

.code-input:focus {
  outline: none;
  border-color: #9F35FF;
  box-shadow: 0 0 0 3px rgba(159, 53, 255, 0.1);
}

.code-input::placeholder {
  letter-spacing: normal;
  font-family: system-ui, -apple-system, sans-serif;
  text-transform: none;
}

/* 親戚列表 */
.family-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.family-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.family-item:hover {
  border-color: #9F35FF;
  background: rgba(159, 53, 255, 0.02);
  transform: translateY(-2px);
}

.family-avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(159, 53, 255, 0.1), rgba(159, 53, 255, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #9F35FF;
}

.family-info {
  flex: 1;
}

.family-name {
  font-weight: 500;
  color: #3c3453;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.2rem;
}

.owner-badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #ffffff;
  border-radius: 0.3rem;
  font-weight: 500;
}

.family-role {
  font-size: 0.8rem;
  color: #999;
}

.status-control {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-control label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.status-select {
  padding: 0.4rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #333;
  background-color: #fff;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}

.status-select:focus {
  border-color: #9F35FF;
}

/* 對話框動畫 */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: all 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

.dialog-fade-enter-from .dialog-content,
.dialog-fade-leave-to .dialog-content {
  transform: scale(0.9) translateY(20px);
}
</style>
