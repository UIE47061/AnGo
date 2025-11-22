<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedRelationship = ref('')

const relationshipOptions = [
  { 
    id: 'family', 
    name: '家人或親人', 
    iconPath: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    description: '配偶、父母、子女等直系親屬' 
  },
  { 
    id: 'friend', 
    name: '朋友或長輩', 
    iconPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    description: '友人、同事、師長等' 
  },
  { 
    id: 'other', 
    name: '其他', 
    iconPath: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z',
    description: '其他關係' 
  }
]

const selectRelationship = (relationship) => {
  selectedRelationship.value = relationship
}

const nextStep = () => {
  if (!selectedRelationship.value) {
    alert('請選擇關係')
    return
  }
  
  // 儲存選擇
  localStorage.setItem('relationship', selectedRelationship.value)
  
  // 前往下一步
  router.push({ name: 'OnboardingBasicInfo' })
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
      <div class="progress-step active">3</div>
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

      <h2>規劃對象</h2>
      <p class="description">我們想先了解，這份規劃是為了誰準備的呢？</p>

      <div class="relationship-options">
        <button
          v-for="option in relationshipOptions"
          :key="option.id"
          class="relationship-card"
          :class="{ selected: selectedRelationship === option.id }"
          @click="selectRelationship(option.id)"
        >
          <div class="card-content">
            <div class="relationship-icon">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                <path :d="option.iconPath"/>
              </svg>
            </div>
            <div class="relationship-text">
              <h3>{{ option.name }}</h3>
              <p>{{ option.description }}</p>
            </div>
          </div>
          <div v-if="selectedRelationship === option.id" class="check-icon">
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

.relationship-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-bottom: 3rem;
}

.relationship-card {
  background: #ffffff;
  border: 2px solid #e6e6ee;
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  text-align: left;
}

.relationship-card:hover {
  border-color: #9F35FF;
  transform: translateX(4px);
}

.relationship-card.selected {
  border-color: #9F35FF;
  background: linear-gradient(135deg, rgba(159, 53, 255, 0.1), rgba(159, 53, 255, 0.05));
  box-shadow: 0 4px 16px rgba(159, 53, 255, 0.2);
}

.card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.relationship-icon {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9F35FF;
  transition: all 0.2s ease;
}

.relationship-card.selected .relationship-icon {
  color: #9F35FF;
}

.relationship-text {
  flex: 1;
}

.relationship-text h3 {
  font-size: 1.1rem;
  color: #2b2b3a;
  margin: 0 0 0.25rem 0;
}

.relationship-text p {
  font-size: 0.85rem;
  color: #6b6b80;
  margin: 0;
}

.check-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
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
