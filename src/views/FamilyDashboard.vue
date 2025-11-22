<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProgressCircle from '@/components/ProgressCircle.vue'
import BottomNav from '@/components/BottomNav.vue'
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/useToast'
import { dashboardApi } from '@/api/dashboard'

const router = useRouter()
const { displayToast } = useToast()
const showUserMenu = ref(false)
const showUserOverlay = ref(false)
const isLoggedIn = ref(false)
const userName = ref('')
const roomId = ref('')

onMounted(async () => {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  
  if (token && userStr) {
    const user = JSON.parse(userStr)
    isLoggedIn.value = true
    userName.value = user.name
    roomId.value = user.roomId || localStorage.getItem('roomId')
    
    // Fetch dashboard data
    try {
      const data = await dashboardApi.getDashboardData(roomId.value)
      // Update dashboard state here (omitted for brevity, but ready to use)
      console.log('Dashboard data:', data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    }
  } else {
    // Redirect to login if not logged in
    router.push('/login')
  }
})

const navigateToQuote = () => {
  router.push({ name: 'Quote' })
}

const navigateToPayment = () => {
  router.push({ name: 'Payment' })
}

const navigateToCalendar = () => {
  router.push({ name: 'Calendar' })
}

const navigateToDocuments = () => {
  router.push({ name: 'Documents' })
}

const toggleUserOverlay = () => {
  showUserOverlay.value = !showUserOverlay.value
}

const closeOverlay = () => {
  showUserOverlay.value = false
}

const handleGoogleLogin = () => {
  // TODO: Google 登入邏輯
  displayToast('正在連接 Google 登入...')
  // 登入成功後：
  // isLoggedIn.value = true
  // userName.value = 'Google 使用者名稱'
  closeOverlay()
}

const handleLogout = () => {
  if (confirm('確定要登出嗎？')) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('roomId')
    isLoggedIn.value = false
    userName.value = ''
    closeOverlay()
    router.push('/login')
  }
}
</script>

<template>
  <div class="phone">
    <main id="main-content">
      <!-- 上方問候 -->
      <header class="greeting">
        <div>
          <h2>{{ userName }} 您好！</h2>
          <p>這是您今日的流程進度</p>
        </div>
        
        <!-- 使用者頭像 -->
        <div class="user-avatar-wrapper">
          <button class="user-avatar" @click="toggleUserOverlay" aria-label="使用者選單">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="#9F35FF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </header>

      <!-- 進度卡片 -->
      <section class="progress-card">
        <!-- 氣泡提示按鈕
        <div class="bubble-label">確認誦經與法事日期</div> -->

        <div class="progress-main">
          <!-- 左側內框 -->
          <div class="progress-left">
            <div class="progress-panel">
              <div class="tag">目前進度</div>
              <h3>法事準備</h3>
              <button class="link-btn">查看詳細任務 →</button>
              <p class="hint hint-panel">再完成 2 項任務即可結案</p>
            </div>
          </div>

          <!-- 右側水晶球 -->
          <div class="progress-right">
            <ProgressCircle :percentage="68" />
          </div>
        </div>

        <div class="progress-bottom">
          <button class="small-card" @click="navigateToQuote">
            <span class="icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="#2b2b3a"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
            </span>
            <span>報價與委託</span>
          </button>
          <button class="small-card" @click="navigateToPayment">
            <span class="icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="#2b2b3a"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="1" y="3" width="15" height="13" />
                <path d="M16 8h5v8" />
                <circle cx="5.5" cy="18.5" r="1.5" />
                <circle cx="18.5" cy="18.5" r="1.5" />
              </svg>
            </span>
            <span>金流追蹤</span>
          </button>
        </div>
      </section>

      <!-- 文件上傳 -->
      <section class="upload-card" @click="navigateToDocuments">
        <div class="upload-inner">
          <div class="upload-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="#6b6b80"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M12 11v6" />
              <path d="M9 14h6" />
            </svg>
          </div>
          <h4>文件上傳</h4>
          <p>讓我們協助您完成最後的文件步驟</p>
        </div>
      </section>

      <!-- 快速連結卡片 -->
      <section class="quick-links">
        <button class="quick-link-card" @click="navigateToCalendar">
          <div class="quick-icon">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="#9F35FF"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div class="quick-text">
            <h4>查看行事曆</h4>
            <p>管理您的所有預定事項</p>
          </div>
          <div class="quick-arrow">›</div>
        </button>

        <div class="reminder-bar">
          <span>💡 11/25 為補件截止日，記得完成文件上傳</span>
        </div>
      </section>
    </main>
    
    <!-- 使用者 Overlay -->
    <transition name="overlay-fade">
      <div v-if="showUserOverlay" class="user-overlay" @click.self="closeOverlay">
        <div class="overlay-content">
          <!-- 未登入狀態 -->
          <div v-if="!isLoggedIn" class="login-section">
            <div class="overlay-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#9F35FF" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3>歡迎使用安行</h3>
            <p>請登入以繼續使用完整功能</p>
            
            <button class="google-login-btn" @click="handleGoogleLogin">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>使用 Google 登入</span>
            </button>
          </div>
          
          <!-- 已登入狀態 -->
          <div v-else class="profile-section">
            <div class="profile-avatar">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ffffff" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3>{{ userName }}</h3>
            <p class="user-email">user@example.com</p>
            
            <div class="profile-actions">
              <button class="profile-btn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>個人資料</span>
              </button>
              
              <button class="logout-btn" @click="handleLogout">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>登出</span>
              </button>
            </div>
          </div>
          
          <button class="close-overlay-btn" @click="closeOverlay" aria-label="關閉">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
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
  gap: 1.6rem;
  overflow-y: auto;
  padding: 1.8rem 1.5rem;
  padding-bottom: calc(120px + env(safe-area-inset-bottom));
}

.greeting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.greeting h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #3c3453;
  letter-spacing: 0.05em;
}

.greeting p {
  margin: 0.35rem 0 0;
  color: #777;
  font-size: 0.95rem;
}

.user-avatar-wrapper {
  position: relative;
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(159, 53, 255, 0.1), rgba(159, 53, 255, 0.05));
  border: 2px solid rgba(159, 53, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.user-avatar:hover {
  background: linear-gradient(135deg, rgba(159, 53, 255, 0.15), rgba(159, 53, 255, 0.08));
  border-color: rgba(159, 53, 255, 0.3);
  transform: scale(1.05);
}

.user-avatar:active {
  transform: scale(0.98);
}

/* 使用者 Overlay */
.user-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
}

.overlay-content {
  background: #ffffff;
  border-radius: 24px;
  padding: 40px 32px 32px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  text-align: center;
}

.close-overlay-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #f5f5f7;
  color: #6b6b80;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-overlay-btn:hover {
  background: #e6e6ee;
  color: #2b2b3a;
}

/* 未登入狀態 */
.login-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.overlay-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(159, 53, 255, 0.1), rgba(159, 53, 255, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.login-section h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #2b2b3a;
}

.login-section p {
  margin: 0;
  color: #6b6b80;
  font-size: 0.95rem;
}

.google-login-btn {
  width: 100%;
  padding: 14px 24px;
  border-radius: 12px;
  border: 2px solid #e6e6ee;
  background: #ffffff;
  color: #2b2b3a;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.2s ease;
  margin-top: 16px;
}

.google-login-btn:hover {
  border-color: #9F35FF;
  background: #faf5ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(159, 53, 255, 0.2);
}

.google-login-btn:active {
  transform: translateY(0);
}

/* 已登入狀態 */
.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0 8px 24px rgba(159, 53, 255, 0.3);
}

.profile-section h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #2b2b3a;
}

.user-email {
  margin: 0;
  color: #6b6b80;
  font-size: 0.9rem;
}

.profile-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.profile-btn,
.logout-btn {
  width: 100%;
  padding: 14px 24px;
  border-radius: 12px;
  border: 2px solid #e6e6ee;
  background: #ffffff;
  color: #2b2b3a;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease;
}

.profile-btn:hover {
  border-color: #9F35FF;
  background: #faf5ff;
}

.logout-btn {
  border-color: #fee2e2;
  color: #ef4444;
}

.logout-btn:hover {
  border-color: #ef4444;
  background: #fef2f2;
}

.logout-btn svg {
  stroke: #ef4444;
}

/* Overlay 動畫 */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.3s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.overlay-fade-enter-active .overlay-content {
  animation: slideUp 0.3s ease;
}

.overlay-fade-leave-active .overlay-content {
  animation: slideDown 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}

.progress-card {
  position: relative;
  border-radius: 1rem;
  padding: 1.1rem 1rem 0.9rem;
  background: linear-gradient(90deg, #d4a3ff 10%, #9F35FF 60%);
  color: #fff;
  box-shadow: 0 18px 36px rgba(159, 53, 255, 0.32);
  overflow: visible;
}

.progress-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 0.6rem;
}

.progress-left {
  flex: 2;
}

.progress-panel {
  border-radius: 1.6rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.48),
    rgba(255, 255, 255, 0.12)
  );
  padding: 0.9rem 1.2rem 0.85rem;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
}

.tag {
  display: inline-block;
  padding: 0.28rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.35);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 500;
}

.progress-panel h3 {
  margin: 0.35rem 0 0.2rem;
  font-size: 1.18rem;
}

.link-btn {
  margin-top: 0.12rem;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.78rem;
  text-align: left;
  cursor: pointer;
}

.progress-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.25rem;
}

.bubble-label {
  position: absolute;
  top: -2.6rem;
  right: 2.1rem;
  background: linear-gradient(180deg, #b87dff, #9F35FF);
  padding: 0.5rem 1.6rem;
  border-radius: 999px;
  font-size: 0.88rem;
  box-shadow: 0 10px 20px rgba(159, 53, 255, 0.38);
  white-space: nowrap;
  line-height: 1;
  transform: translateZ(0);
}

.bubble-label::after {
  content: '';
  position: absolute;
  left: var(--arrow-left, 50%);
  transform: none;
  bottom: -7px;
  width: 16px;
  height: 9px;
  background: linear-gradient(180deg, #9F35FF, #7a1fd9);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.18));
}

.hint {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.95);
  opacity: 0.95;
}

.hint-panel {
  margin-top: 0.6rem;
  font-size: 0.74rem;
  color: rgba(27, 16, 48, 0.75);
  text-align: left;
  opacity: 0.95;
}

.progress-bottom {
  margin-top: 1rem;
  display: flex;
  gap: 0.8rem;
}

.small-card {
  flex: 1;
  border-radius: 1.1rem;
  border: none;
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
  padding: 0.7rem 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  font-size: 0.9rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
  transition: all 0.2s ease;
}

.small-card:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
}

.small-card:active {
  transform: translateY(0);
}

.small-card:active {
  transform: translateY(0);
}

.small-card .icon {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: #f5f6fb;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.small-card .icon svg {
  width: 16px;
  height: 16px;
  display: block;
}

.upload-card {
  background: #ffffff;
  border-radius: 1.4rem;
  padding: 1rem 1rem;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1);
}

.upload-card:active {
  transform: translateY(0);
}

.upload-inner {
  border: 1px dashed #c8c8d3;
  border-radius: 1rem;
  padding: 0.7rem 1rem;
  text-align: center;
}

.upload-icon {
  font-size: 2rem;
  margin-bottom: 0.4rem;
  display: flex;
  justify-content: center;
}

.upload-icon svg {
  display: block;
  width: 28px;
  height: 28px;
}

.upload-inner h4 {
  margin: 0.4rem 0;
  color: #2b2b3a;
}

.upload-inner p {
  margin: 0.4rem 0 0;
  color: #6b6b80;
  font-size: 0.9rem;
}

.quick-links {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.quick-link-card {
  background: #ffffff;
  border-radius: 1.2rem;
  padding: 1rem 1.2rem;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
}

.quick-link-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.quick-link-card:active {
  transform: translateY(0);
}

.quick-icon {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(159, 53, 255, 0.1), rgba(159, 53, 255, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.quick-icon svg {
  display: block;
}

.quick-text {
  flex: 1;
}

.quick-text h4 {
  margin: 0;
  color: #2b2b3a;
  font-size: 1rem;
}

.quick-text p {
  margin: 0.25rem 0 0;
  color: #6b6b80;
  font-size: 0.85rem;
}

.quick-arrow {
  font-size: 1.8rem;
  color: #9F35FF;
  font-weight: 300;
  flex-shrink: 0;
}

.reminder-bar {
  border-radius: 999px;
  padding: 0.7rem 1.1rem;
  background: linear-gradient(90deg, #9F35FF, #d4a3ff);
  color: #fff;
  font-size: 0.85rem;
  box-shadow: 0 8px 14px rgba(159, 53, 255, 0.32);
  text-align: center;
}
</style>

