<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ProgressCircle from '@/components/ProgressCircle.vue'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()
const showUserMenu = ref(false)

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

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleLogin = () => {
  showUserMenu.value = false
  // TODO: 導向登入頁面或顯示登入對話框
  alert('登入功能開發中...')
}

const handleProfile = () => {
  showUserMenu.value = false
  // TODO: 導向個人資料頁面
  alert('個人資料功能開發中...')
}

const handleLogout = () => {
  showUserMenu.value = false
  // TODO: 登出邏輯
  alert('登出功能開發中...')
}
</script>

<template>
  <div class="phone">
    <main id="main-content">
      <!-- 上方問候 -->
      <header class="greeting">
        <div>
          <h2>馬阿姨 您好！</h2>
          <p>這是您今日的流程進度</p>
        </div>
        
        <!-- 使用者頭像 -->
        <div class="user-avatar-wrapper">
          <button class="user-avatar" @click="toggleUserMenu" aria-label="使用者選單">
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
          
          <!-- 下拉選單 -->
          <transition name="menu-fade">
            <div v-if="showUserMenu" class="user-menu">
              <button class="menu-item" @click="handleProfile">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>個人資料</span>
              </button>
              <!-- <button class="menu-item" @click="handleLogin">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                <span>登入</span>
              </button> -->
              <div class="menu-divider"></div>
              <button class="menu-item menu-item-danger" @click="handleLogout">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>登出</span>
              </button>
            </div>
          </transition>
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

.user-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  padding: 0.5rem;
  min-width: 180px;
  z-index: 100;
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 1rem;
  background: none;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all 0.15s ease;
  color: #3c3453;
  font-size: 0.95rem;
  text-align: left;
}

.menu-item:hover {
  background: rgba(159, 53, 255, 0.08);
}

.menu-item svg {
  flex-shrink: 0;
  color: #9F35FF;
}

.menu-item-danger {
  color: #ff4444;
}

.menu-item-danger svg {
  color: #ff4444;
}

.menu-item-danger:hover {
  background: rgba(255, 68, 68, 0.08);
}

.menu-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 0.4rem 0;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.2s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
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

