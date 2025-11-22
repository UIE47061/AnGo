<script setup>
import { ref } from 'vue'
import Calendar from '@/components/Calendar.vue'
import BottomNav from '@/components/BottomNav.vue'

// 日曆事件資料（後端 API 格式）
const calendarEvents = ref([
  {
    id: 1,
    date: '2025-11-20',
    time: '14:00',
    title: '誦經法事',
    category: '禮儀'
  },
  {
    id: 2,
    date: '2025-11-25',
    time: '09:00',
    title: '文件補件截止',
    category: '行政'
  },
  {
    id: 3,
    date: '2025-11-27',
    time: '10:30',
    title: '家屬會議',
    category: '行政'
  },
  {
    id: 4,
    date: '2025-11-20',
    time: '16:00',
    title: '場地佈置確認',
    category: '禮儀'
  },
  {
    id: 5,
    date: '2025-11-30',
    time: '11:00',
    title: '最終審核',
    category: '行政'
  }
])
</script>

<template>
  <div class="phone">
    <main id="main-content">
      <header class="page-header">
        <h2>行事曆</h2>
        <p>管理您的所有預定事項</p>
      </header>

      <Calendar :events="calendarEvents" />
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
</style>
