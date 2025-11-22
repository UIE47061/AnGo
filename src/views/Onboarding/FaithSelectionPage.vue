<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedFaith = ref('')

const faithOptions = [
  { 
    id: 'buddhism', 
    name: '佛教', 
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' 
  },
  { 
    id: 'taoism', 
    name: '道教', 
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z' 
  },
  { 
    id: 'christianity', 
    name: '基督教', 
    iconPath: 'M12 2L10 8H14L12 2M12 22L10 16H14L12 22M4 12L10 10V14L4 12M20 12L14 10V14L20 12M12 8V16' 
  },
  { 
    id: 'catholicism', 
    name: '天主教', 
    iconPath: 'M12 2L10 7H14L12 2M12 22L10 17H14L12 22M4 12L9 10V14L4 12M20 12L15 10V14L20 12M10 7H14V17H10V7' 
  },
  { 
    id: 'islam', 
    name: '伊斯蘭教', 
    iconPath: 'M12 2C9.5 2 7.5 4 7.5 6.5C7.5 8 8.5 9 9.5 9.5C10 10 10.5 10.5 11 11.5V22H13V11.5C13.5 10.5 14 10 14.5 9.5C15.5 9 16.5 8 16.5 6.5C16.5 4 14.5 2 12 2M18 8L16 10L18 12L20 10L18 8Z' 
  },
  { 
    id: 'other', 
    name: '其他', 
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' 
  }
]

const selectFaith = (faith) => {
  selectedFaith.value = faith
}

const nextStep = () => {
  if (!selectedFaith.value) {
    alert('請選擇信仰方式')
    return
  }
  
  // 儲存選擇
  localStorage.setItem('selectedFaith', selectedFaith.value)
  
  // 前往下一步
  router.push({ name: 'OnboardingRelationship' })
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
      <div class="progress-step active">2</div>
      <div class="progress-line"></div>
      <div class="progress-step">3</div>
      <div class="progress-line"></div>
      <div class="progress-step">4</div>
    </div>

    <div class="content">
      <div class="icon-wrapper">
        <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#9F35FF" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      </div>

      <h2>信仰方式</h2>
      <p class="description">想了解您希望以哪一種信仰方式進行儀式？</p>

      <div class="faith-options">
        <button
          v-for="faith in faithOptions"
          :key="faith.id"
          class="faith-card"
          :class="{ selected: selectedFaith === faith.id }"
          @click="selectFaith(faith.id)"
        >
          <span class="faith-icon">{{ faith.icon }}</span>
          <span class="faith-name">{{ faith.name }}</span>
          <div v-if="selectedFaith === faith.id" class="check-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </button>
      </div>

      <div class="actions">
        <button class="back-btn" @click="goBack">返回</button>
        <button class="next-btn" @click="nextStep">下一步</button>
      </div>
    </div>
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

.faith-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  margin-bottom: 3rem;
}

.faith-card {
  background: #ffffff;
  border: 2px solid #e6e6ee;
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.faith-card:hover {
  border-color: #9F35FF;
  transform: translateY(-2px);
}

.faith-card.selected {
  border-color: #9F35FF;
  background: linear-gradient(135deg, rgba(159, 53, 255, 0.1), rgba(159, 53, 255, 0.05));
  box-shadow: 0 4px 16px rgba(159, 53, 255, 0.2);
}

.faith-icon {
  font-size: 2.5rem;
}

.faith-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2b2b3a;
}

.check-icon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  display: flex;
  align-items: center;
  justify-content: center;
}

.actions {
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: auto;
}

.back-btn,
.next-btn {
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

.next-btn {
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  border: none;
  color: #ffffff;
}

.next-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(159, 53, 255, 0.3);
}
</style>
