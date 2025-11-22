<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  name: '',
  birthDate: '',
  deathDate: ''
})

const toastMessage = ref('')
const showToast = ref(false)

const displayToast = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 1000)
}

const formatDate = (event, field) => {
  // 自動格式化日期輸入
  const input = event.target
  let value = input.value.replace(/\D/g, '')
  
  if (value.length >= 4) {
    value = value.slice(0, 4) + '-' + value.slice(4)
  }
  if (value.length >= 7) {
    value = value.slice(0, 7) + '-' + value.slice(7, 9)
  }
  
  formData.value[field] = value.slice(0, 10)
}

const validateForm = () => {
  if (!formData.value.name.trim()) {
    displayToast('請輸入姓名')
    return false
  }
  
  if (!formData.value.birthDate) {
    displayToast('請選擇出生日期')
    return false
  }
  
  if (!formData.value.deathDate) {
    displayToast('請選擇離世日期')
    return false
  }
  
  // 檢查日期邏輯
  const birthDate = new Date(formData.value.birthDate)
  const deathDate = new Date(formData.value.deathDate)
  
  if (deathDate <= birthDate) {
    displayToast('離世日期必須晚於出生日期')
    return false
  }
  
  return true
}

const completeOnboarding = () => {
  if (!validateForm()) return
  
  // 儲存基本資料
  localStorage.setItem('deceasedInfo', JSON.stringify({
    name: formData.value.name,
    birthDate: formData.value.birthDate,
    deathDate: formData.value.deathDate
  }))
  
  // 標記引導流程完成
  localStorage.setItem('onboardingCompleted', 'true')
  
  // 前往主頁
  router.push({ name: 'FamilyDashboard' })
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="onboarding-container">
    <div class="progress-bar">
      <div class="progress-step completed">1</div>
      <div class="progress-line completed"></div>
      <div class="progress-step completed">2</div>
      <div class="progress-line completed"></div>
      <div class="progress-step completed">3</div>
      <div class="progress-line completed"></div>
      <div class="progress-step active">4</div>
    </div>

    <div class="content">
      <div class="icon-wrapper">
        <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#9F35FF" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="12" y1="18" x2="12" y2="12"/>
          <line x1="9" y1="15" x2="15" y2="15"/>
        </svg>
      </div>

      <h2>基本資訊</h2>
      <p class="description">請填寫以下資訊，以便我們為您提供更合適的服務</p>

      <div class="form-section">
        <div class="form-group">
          <label for="name">姓名</label>
          <div class="input-wrapper">
            <input
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="請輸入姓名"
              maxlength="50"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="birthDate">出生年月日</label>
          <div class="input-wrapper">
            <input
              id="birthDate"
              v-model="formData.birthDate"
              type="date"
              placeholder="YYYY-MM-DD"
            />
            <div class="input-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#9F35FF" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="deathDate">離世年月日</label>
          <div class="input-wrapper">
            <input
              id="deathDate"
              v-model="formData.deathDate"
              type="date"
              placeholder="YYYY-MM-DD"
            />
            <div class="input-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#9F35FF" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="info-note">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6b6b80" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <span>這些資訊將用於文件準備和流程安排</span>
        </div>
      </div>

      <div class="actions">
        <button class="back-btn" @click="goBack">返回</button>
        <button class="complete-btn" @click="completeOnboarding">完成設定</button>
      </div>
    </div>

    <!-- Toast 提示框 -->
    <transition name="toast-fade">
      <div v-if="showToast" class="toast">
        {{ toastMessage }}
      </div>
    </transition>
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
  transition: all 0.3s ease;
}

.progress-step.completed {
  background: #9F35FF;
  color: #ffffff;
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
  transition: all 0.3s ease;
}

.progress-line.completed {
  background: #9F35FF;
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

.form-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #2b2b3a;
  font-weight: 600;
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e6e6ee;
  border-radius: 12px;
  font-size: 1rem;
  color: #2b2b3a;
  background: #ffffff;
  transition: all 0.2s ease;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #9F35FF;
  background: #faf5ff;
}

.input-wrapper input::placeholder {
  color: #b8b8c8;
}

.input-icon {
  position: absolute;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.info-note {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(159, 53, 255, 0.05);
  border-radius: 12px;
  margin-top: 0.5rem;
}

.info-note span {
  font-size: 0.85rem;
  color: #6b6b80;
}

.actions {
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: auto;
}

.back-btn,
.complete-btn {
  flex: 1;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn {
  background: #ffffff;
  border: 2px solid #e6e6ee;
  color: #2b2b3a;
}

.back-btn:hover {
  border-color: #9F35FF;
  background: #faf5ff;
}

.complete-btn {
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  border: none;
  color: #ffffff;
}

.complete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(159, 53, 255, 0.3);
}

/* 日期輸入樣式優化 */
input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

input[type="date"] {
  padding-right: 3rem;
}

/* Toast 提示框樣式 */
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(159, 53, 255, 0.4);
  z-index: 2000;
  white-space: nowrap;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}

.toast-fade-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}

.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}
</style>
