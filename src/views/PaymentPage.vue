<script setup>
import BottomNav from '@/components/BottomNav.vue'

const stages = [
  { name: '委託成立', status: 'completed' },
  { name: '款項託管中', status: 'completed' },
  { name: '業者已接單', status: 'completed' },
  { name: '服務進行中', status: 'current' },
  { name: '服務驗收完成', status: 'pending' },
  { name: '撥款完成', status: 'pending' }
]

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return '#22c55e'
    case 'current':
      return '#f59e0b'
    default:
      return '#d1d5db'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return '已完成'
    case 'current':
      return '進行中'
    default:
      return '待開始'
  }
}
</script>

<template>
  <div class="phone">
    <div class="flow-page">
      <header>
        <h3>金流進度</h3>
      </header>

      <div class="stages-list">
        <div
          v-for="(stage, index) in stages"
          :key="index"
          class="stage-card"
        >
          <div
            class="stage-indicator"
            :style="{ background: getStatusColor(stage.status) }"
          ></div>
          <div class="stage-info">
            <div class="stage-name">{{ stage.name }}</div>
            <div class="stage-status">{{ getStatusText(stage.status) }}</div>
          </div>
          <div class="stage-check">
            {{ stage.status === 'completed' ? '✓' : '' }}
          </div>
        </div>
      </div>
    </div>

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
  padding: 1.8rem 1.5rem;
  margin: 0 auto;
}

@media (min-width: 415px) {
  .phone {
    border-radius: 26px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
    min-height: 896px;
  }
}

.flow-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.back-btn {
  border: none;
  background: #fff;
  padding: 8px 14px;
  min-height: 44px;
  min-width: 44px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  font-size: 1.2rem;
  touch-action: manipulation;
}

header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2b2b3a;
}

.stages-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stage-card {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 10px;
}

.stage-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.stage-info {
  flex: 1;
}

.stage-name {
  font-weight: 700;
  color: #2b2b3a;
  font-size: 0.95rem;
}

.stage-status {
  font-size: 0.82rem;
  color: #6b6b80;
  margin-top: 2px;
}

.stage-check {
  color: #9aa0b4;
  font-size: 0.8rem;
  font-weight: 700;
  width: 20px;
  text-align: center;
}
</style>
