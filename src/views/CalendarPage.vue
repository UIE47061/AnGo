<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Calendar from '@/components/Calendar.vue'
import BottomNav from '@/components/BottomNav.vue'
import { calendarApi } from '@/api/calendar'
import { roomsApi } from '@/api/rooms'

const router = useRouter()
const roomId = ref(localStorage.getItem('roomId'))

// 共編相關狀態
const showShareDialog = ref(false)
const shareMode = ref('generate') // 'generate' 或 'input'
const shareCode = ref('')
const inputCode = ref('')

// 新增活動相關狀態
const showEventDialog = ref(false)
const selectedDate = ref('')
const newEvent = ref({
  title: '',
  time: '',
  category: '行政',
  participants: []
})

// 共編成員列表
const collaborators = ref([])

// 日曆事件資料
const calendarEvents = ref([])

onMounted(async () => {
  if (!roomId.value) {
    alert('請先登入或加入房間')
    router.push('/login')
    return
  }
  
  await fetchEvents()
  await fetchCollaborators()
})

const fetchEvents = async () => {
  try {
    const events = await calendarApi.getEvents(roomId.value)
    calendarEvents.value = events
  } catch (error) {
    console.error('Failed to fetch events:', error)
  }
}

const fetchCollaborators = async () => {
  try {
    const members = await calendarApi.getCollaborators(roomId.value)
    collaborators.value = members
  } catch (error) {
    console.error('Failed to fetch collaborators:', error)
  }
}

const openShareDialog = () => {
  showShareDialog.value = true
  shareMode.value = 'generate'
  inputCode.value = ''
}

const closeShareDialog = () => {
  showShareDialog.value = false
  shareCode.value = ''
  inputCode.value = ''
}

const generateShareCode = async () => {
  try {
    const res = await calendarApi.getShareCode(roomId.value)
    shareCode.value = res.code
  } catch (error) {
    console.error(error)
    alert('無法取得共編代碼')
  }
}

const copyShareCode = () => {
  if (shareCode.value) {
    navigator.clipboard.writeText(shareCode.value)
    alert('代碼已複製到剪貼簿！')
  }
}

const joinWithCode = async () => {
  if (inputCode.value.trim()) {
    try {
      await roomsApi.joinRoom({ roomCode: inputCode.value })
      alert('成功加入房間！')
      // Refresh data or reload page
      window.location.reload()
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || '加入失敗，請檢查代碼')
    }
    closeShareDialog()
  } else {
    alert('請輸入共編代碼')
  }
}

const switchMode = (mode) => {
  shareMode.value = mode
  shareCode.value = ''
  inputCode.value = ''
}

// 處理點擊日期
const handleDateClick = (date) => {
  selectedDate.value = date
  newEvent.value = {
    title: '',
    time: '09:00',
    category: '行政',
    participants: []
  }
  showEventDialog.value = true
}

// 關閉活動對話框
const closeEventDialog = () => {
  showEventDialog.value = false
  selectedDate.value = ''
  newEvent.value = {
    title: '',
    time: '',
    category: '行政',
    participants: []
  }
}

// 切換參與人員選擇
const toggleParticipant = (userId) => {
  const index = newEvent.value.participants.indexOf(userId)
  if (index > -1) {
    newEvent.value.participants.splice(index, 1)
  } else {
    newEvent.value.participants.push(userId)
  }
}

// 儲存新活動
const saveNewEvent = async () => {
  if (!newEvent.value.title.trim()) {
    alert('請輸入活動標題')
    return
  }
  
  try {
    const eventData = {
      title: newEvent.value.title,
      date: selectedDate.value,
      time: newEvent.value.time,
      category: newEvent.value.category,
      participants: newEvent.value.participants
    }
    
    await calendarApi.createEvent(roomId.value, eventData)
    await fetchEvents() // Refresh list
    
    closeEventDialog()
    alert('活動已新增！')
  } catch (error) {
    console.error(error)
    alert('新增活動失敗')
  }
}
</script>

<template>
  <div class="phone">
    <main id="main-content">
      <header class="page-header">
        <div>
          <h2>行事曆</h2>
          <p>管理您的所有預定事項</p>
        </div>
        
        <!-- 共編按鈕 -->
        <button class="share-btn" @click="openShareDialog" aria-label="共編行事曆">
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

      <Calendar :events="calendarEvents" @date-click="handleDateClick" />
    </main>

    <!-- 新增活動對話框 -->
    <transition name="dialog-fade">
      <div v-if="showEventDialog" class="dialog-overlay" @click="closeEventDialog">
        <div class="dialog-content" @click.stop>
          <div class="dialog-header">
            <h3>新增活動</h3>
            <button class="close-btn" @click="closeEventDialog" aria-label="關閉">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div class="dialog-body">
            <div class="form-group">
              <label class="form-label">日期</label>
              <div class="form-value">{{ selectedDate }}</div>
            </div>

            <div class="form-group">
              <label class="form-label">活動標題</label>
              <input 
                v-model="newEvent.title"
                type="text"
                placeholder="請輸入活動名稱"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label class="form-label">時間</label>
              <input 
                v-model="newEvent.time"
                type="time"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label class="form-label">類別</label>
              <div class="category-selector">
                <button 
                  class="category-option"
                  :class="{ active: newEvent.category === '行政' }"
                  @click="newEvent.category = '行政'"
                >
                  <span class="category-dot" style="background: #3b82f6;"></span>
                  行政
                </button>
                <button 
                  class="category-option"
                  :class="{ active: newEvent.category === '禮儀' }"
                  @click="newEvent.category = '禮儀'"
                >
                  <span class="category-dot" style="background: #f59e0b;"></span>
                  禮儀
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">參與人員</label>
              <div class="participants-list">
                <button
                  v-for="person in collaborators"
                  :key="person.id"
                  class="participant-item"
                  :class="{ selected: newEvent.participants.includes(person.id) }"
                  @click="toggleParticipant(person.id)"
                >
                  <div class="participant-checkbox">
                    <svg v-if="newEvent.participants.includes(person.id)" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div class="participant-info">
                    <div class="participant-name">
                      {{ person.name }}
                      <span v-if="person.isOwner" class="owner-badge">擁有者</span>
                    </div>
                    <div class="participant-role">{{ person.role }}</div>
                  </div>
                </button>
              </div>
            </div>

            <div class="form-actions">
              <button class="secondary-btn" @click="closeEventDialog">取消</button>
              <button class="primary-btn" @click="saveNewEvent">儲存活動</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 共編對話框 -->
    <transition name="dialog-fade">
      <div v-if="showShareDialog" class="dialog-overlay" @click="closeShareDialog">
        <div class="dialog-content" @click.stop>
          <div class="dialog-header">
            <h3>行事曆共編</h3>
            <button class="close-btn" @click="closeShareDialog" aria-label="關閉">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <!-- 模式切換 -->
          <div class="mode-tabs">
            <button 
              class="mode-tab"
              :class="{ active: shareMode === 'generate' }"
              @click="switchMode('generate')"
            >
              生成代碼
            </button>
            <button 
              class="mode-tab"
              :class="{ active: shareMode === 'input' }"
              @click="switchMode('input')"
            >
              輸入代碼
            </button>
          </div>

          <!-- 生成代碼模式 -->
          <div v-if="shareMode === 'generate'" class="dialog-body">
            <p class="instruction">生成共編代碼，分享給其他人加入此行事曆</p>
            
            <div v-if="!shareCode" class="generate-section">
              <button class="primary-btn" @click="generateShareCode">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                生成共編代碼
              </button>
            </div>

            <div v-else class="code-display">
              <div class="code-box">
                <span class="code-text">{{ shareCode }}</span>
              </div>
              <button class="copy-btn" @click="copyShareCode">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                複製代碼
              </button>
              <p class="hint-text">此代碼有效期限為 24 小時</p>
            </div>
          </div>

          <!-- 輸入代碼模式 -->
          <div v-else class="dialog-body">
            <p class="instruction">輸入共編代碼以加入他人的行事曆</p>
            
            <div class="input-section">
              <input 
                v-model="inputCode"
                type="text"
                placeholder="請輸入 6 位代碼"
                maxlength="6"
                class="code-input"
              />
              <button class="primary-btn" @click="joinWithCode">
                加入共編
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

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
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
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

/* 動畫 */
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

/* 表單樣式 */
.form-group {
  margin-bottom: 1.2rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #3c3453;
  font-size: 0.9rem;
  font-weight: 500;
}

.form-value {
  padding: 0.8rem 1rem;
  background: rgba(159, 53, 255, 0.05);
  border-radius: 0.6rem;
  color: #9F35FF;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.6rem;
  font-size: 1rem;
  color: #3c3453;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #9F35FF;
  box-shadow: 0 0 0 3px rgba(159, 53, 255, 0.1);
}

.category-selector {
  display: flex;
  gap: 0.8rem;
}

.category-option {
  flex: 1;
  padding: 0.8rem 1rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  transition: all 0.2s ease;
  color: #6b6b80;
}

.category-option.active {
  border-color: #9F35FF;
  background: rgba(159, 53, 255, 0.05);
  color: #3c3453;
}

.category-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  display: inline-block;
}

.participants-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-height: 200px;
  overflow-y: auto;
}

.participant-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.participant-item:hover {
  border-color: rgba(159, 53, 255, 0.3);
  background: rgba(159, 53, 255, 0.02);
}

.participant-item.selected {
  border-color: #9F35FF;
  background: rgba(159, 53, 255, 0.05);
}

.participant-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.participant-item.selected .participant-checkbox {
  background: #9F35FF;
  border-color: #9F35FF;
}

.participant-item.selected .participant-checkbox svg {
  stroke: #ffffff;
}

.participant-info {
  flex: 1;
}

.participant-name {
  font-weight: 500;
  color: #3c3453;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.owner-badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #ffffff;
  border-radius: 0.3rem;
  font-weight: 500;
}

.participant-role {
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.15rem;
}

.form-actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.secondary-btn {
  flex: 1;
  padding: 0.9rem 1.2rem;
  background: #ffffff;
  color: #6b6b80;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.secondary-btn:hover {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.2);
}

.form-actions .primary-btn {
  flex: 1;
}
</style>
