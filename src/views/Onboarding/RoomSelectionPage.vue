<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { roomsApi } from '@/api/rooms'
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const { displayToast } = useToast()
const showJoinDialog = ref(false)
const showCreateDialog = ref(false)
const roomCode = ref('')
const roomName = ref('')
const isLoading = ref(false)

const createNewRoom = () => {
  showCreateDialog.value = true
}

const joinExistingRoom = () => {
  showJoinDialog.value = true
}

const closeDialog = () => {
  showJoinDialog.value = false
  showCreateDialog.value = false
  roomCode.value = ''
  roomName.value = ''
}

const submitCreateRoom = async () => {
  if (!roomName.value.trim()) {
    displayToast('請輸入協作名稱')
    return
  }

  isLoading.value = true
  try {
    const res = await roomsApi.createRoom({ displayName: roomName.value })
    
    // Update user info in localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    user.roomId = res.id
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('roomId', res.id)
    localStorage.setItem('isRoomOwner', 'true')

    // Go to next step
    router.push({ name: 'OnboardingFaith' })
  } catch (error) {
    console.error(error)
    displayToast(error.response?.data?.message || '建立協作失敗')
  } finally {
    isLoading.value = false
  }
}

const submitRoomCode = async () => {
  if (roomCode.value.trim()) {
    isLoading.value = true
    try {
      const res = await roomsApi.joinRoom({ roomCode: roomCode.value })
      
      // Update user info in localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      user.roomId = res.id
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('roomId', res.id)
      localStorage.setItem('isRoomOwner', 'false')
      
      // Go to dashboard
      router.push({ name: 'FamilyDashboard' })
    } catch (error) {
      console.error(error)
      displayToast(error.response?.data?.message || '加入協作失敗')
    } finally {
      isLoading.value = false
    }
  } else {
    displayToast('請輸入協作代碼')
  }
}
</script>

<template>
  <div class="onboarding-container">
    <div class="progress-bar">
      <div class="progress-step active">1</div>
      <div class="progress-line"></div>
      <div class="progress-step">2</div>
      <div class="progress-line"></div>
      <div class="progress-step">3</div>
      <div class="progress-line"></div>
      <div class="progress-step">4</div>
    </div>

    <div class="content">
      <div class="icon-wrapper">
        <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#9F35FF" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>

      <h2>選擇您的使用方式</h2>
      <p class="description">您可以創建新的規劃，或加入家人的共同規劃</p>

      <div class="options">
        <button class="option-card" @click="createNewRoom">
          <div class="option-icon">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <h3>創建新協作</h3>
          <p>開始規劃新的儀式流程</p>
        </button>

        <button class="option-card" @click="joinExistingRoom">
          <div class="option-icon">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </div>
          <h3>加入現有協作</h3>
          <p>加入家人已建立的規劃</p>
        </button>
      </div>
    </div>

    <!-- 創建協作對話框 -->
    <transition name="dialog-fade">
      <div v-if="showCreateDialog" class="dialog-overlay" @click.self="closeDialog">
        <div class="dialog-content">
          <button class="close-btn" @click="closeDialog">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <h3>創建新協作</h3>
          <p>請為您的協作命名（例如：王大明家屬）</p>

          <input
            v-model="roomName"
            type="text"
            placeholder="輸入協作名稱"
            class="code-input"
            style="letter-spacing: normal; text-align: left;"
            @keyup.enter="submitCreateRoom"
          />

          <button class="submit-btn" @click="submitCreateRoom" :disabled="isLoading">
            {{ isLoading ? '建立中...' : '確認建立' }}
          </button>
        </div>
      </div>
    </transition>

    <!-- 加入協作對話框 -->
    <transition name="dialog-fade">
      <div v-if="showJoinDialog" class="dialog-overlay" @click.self="closeDialog">
        <div class="dialog-content">
          <button class="close-btn" @click="closeDialog">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <h3>加入協作</h3>
          <p>請輸入由家人提供的共編代碼</p>

          <input
            v-model="roomCode"
            type="text"
            placeholder="輸入 6 位數代碼"
            maxlength="6"
            class="code-input"
            @keyup.enter="submitRoomCode"
          />

          <button class="submit-btn" @click="submitRoomCode">
            確認加入
          </button>
        </div>
      </div>
    </transition>

    <Toast />
  </div>
</template>

<style scoped>
.onboarding-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f7 0%, #fafbff 100%);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
}

.progress-step {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e6e6ee;
  color: #6b6b80;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
}

.progress-step.active {
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(159, 53, 255, 0.3);
}

.progress-line {
  width: 40px;
  height: 2px;
  background: #e6e6ee;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.icon-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(159, 53, 255, 0.1), rgba(159, 53, 255, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.8rem;
  color: #2b2b3a;
  margin-bottom: 0.5rem;
  text-align: center;
}

.description {
  color: #6b6b80;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 3rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.option-card {
  background: #ffffff;
  border: 2px solid #e6e6ee;
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.option-card:hover {
  border-color: #9F35FF;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(159, 53, 255, 0.15);
}

.option-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(159, 53, 255, 0.1), rgba(159, 53, 255, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.option-icon svg {
  stroke: #9F35FF;
}

.option-card h3 {
  font-size: 1.3rem;
  color: #2b2b3a;
  margin-bottom: 0.5rem;
}

.option-card p {
  color: #6b6b80;
  font-size: 0.95rem;
  margin: 0;
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
  padding: 20px;
}

.dialog-content {
  background: #ffffff;
  border-radius: 24px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #f5f5f7;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #e6e6ee;
}

.dialog-content h3 {
  font-size: 1.5rem;
  color: #2b2b3a;
  margin-bottom: 0.5rem;
}

.dialog-content p {
  color: #6b6b80;
  margin-bottom: 2rem;
}

.code-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e6e6ee;
  border-radius: 12px;
  font-size: 1.5rem;
  text-align: center;
  letter-spacing: 0.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  outline: none;
  transition: all 0.2s ease;
}

.code-input:focus {
  border-color: #9F35FF;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(159, 53, 255, 0.3);
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
