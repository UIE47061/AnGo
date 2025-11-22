<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['date-click'])

const activeFilter = ref('全部')
const filters = ['全部', '行政', '禮儀']

// 取得今天的日期
const today = new Date()
const currentDay = today.getDate()
const currentMonth = today.getMonth() + 1
const currentYear = today.getFullYear()

// 處理點擊日期
const handleDayClick = (day) => {
  if (!day) return
  
  // 格式化日期為 YYYY-MM-DD
  const month = String(currentMonth).padStart(2, '0')
  const dayStr = String(day).padStart(2, '0')
  const dateStr = `${currentYear}-${month}-${dayStr}`
  
  emit('date-click', dateStr)
}

// 根據篩選條件過濾事件
const filteredEvents = computed(() => {
  if (activeFilter.value === '全部') {
    return props.events
  }
  return props.events.filter(event => event.category === activeFilter.value)
})

// 按日期排序的事件列表（用於顯示即將到來的事件）
const sortedEvents = computed(() => {
  return [...filteredEvents.value].sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.time)
    const dateB = new Date(b.date + ' ' + b.time)
    return dateA - dateB
  })
})

// 即將到來的事件（今天及之後）
const upcomingEvents = computed(() => {
  const todayStart = new Date(currentYear, currentMonth - 1, currentDay, 0, 0, 0)
  return sortedEvents.value.filter(event => {
    const eventDate = new Date(event.date + ' ' + event.time)
    return eventDate >= todayStart
  })
})

// 過去的事件
const pastEvents = computed(() => {
  const todayStart = new Date(currentYear, currentMonth - 1, currentDay, 0, 0, 0)
  return sortedEvents.value.filter(event => {
    const eventDate = new Date(event.date + ' ' + event.time)
    return eventDate < todayStart
  }).reverse() // 最近的過去事件在前
})

// 生成日曆格子
const generateCalendarDays = () => {
  const days = []
  const daysInMonth = 30
  const startDay = 5 // 11月1日是星期五

  // 填充空白天數
  for (let i = 0; i < startDay; i++) {
    days.push({ day: null, events: [] })
  }

  // 填充實際日期
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = filteredEvents.value.filter(event => {
      const eventDay = parseInt(event.date.split('-')[2])
      return eventDay === day
    })
    days.push({ day, events: dayEvents })
  }

  return days
}

const calendarDays = computed(() => generateCalendarDays())

// 取得事件類型的顏色
const getCategoryColor = (category) => {
  switch (category) {
    case '行政':
      return '#3b82f6' // 藍色
    case '禮儀':
      return '#f59e0b' // 橘色
    default:
      return '#9F35FF' // 紫色
  }
}

// 取得事件類型的背景色
const getCategoryBgColor = (category) => {
  switch (category) {
    case '行政':
      return '#dbeafe'
    case '禮儀':
      return '#fef3c7'
    default:
      return '#f3e8ff'
  }
}
</script>

<template>
  <div class="calendar-card">
    <div class="calendar-header">
      <div class="calendar-title">11月 行事曆</div>
      <div class="calendar-nav">
        <button>&lt;</button>
        <button>&gt;</button>
      </div>
    </div>

    <!-- 分類篩選 -->
    <div class="calendar-filters">
      <button
        v-for="filter in filters"
        :key="filter"
        class="filter-btn"
        :class="{ active: activeFilter === filter }"
        @click="activeFilter = filter"
      >
        {{ filter }}
      </button>
    </div>

    <!-- 星期標題 -->
    <div class="calendar-weekdays">
      <div>日</div>
      <div>一</div>
      <div>二</div>
      <div>三</div>
      <div>四</div>
      <div>五</div>
      <div>六</div>
    </div>

    <!-- 日曆格子 -->
    <div class="calendar-grid">
      <div
        v-for="(item, index) in calendarDays"
        :key="index"
        class="calendar-day"
        :class="{ 
          empty: !item.day,
          'has-events': item.events.length > 0,
          'is-today': item.day === currentDay,
          'clickable': item.day
        }"
        @click="handleDayClick(item.day)"
      >
        <span v-if="item.day" class="day-number">{{ item.day }}</span>
        <div v-if="item.events.length > 0" class="event-dots">
          <span
            v-for="(event, idx) in item.events.slice(0, 3)"
            :key="idx"
            class="event-dot"
            :style="{ 
              backgroundColor: getCategoryColor(event.category),
              borderColor: getCategoryColor(event.category)
            }"
            :title="`${event.title} (${event.category})`"
          ></span>
        </div>
      </div>
    </div>

    <!-- 事件列表 -->
    <div v-if="upcomingEvents.length > 0" class="event-list">
      <div class="event-list-title">即將到來的事件</div>
      <div
        v-for="event in upcomingEvents"
        :key="event.id"
        class="event-item"
      >
        <div 
          class="event-category-tag"
          :style="{ 
            backgroundColor: getCategoryBgColor(event.category),
            color: getCategoryColor(event.category)
          }"
        >
          {{ event.category }}
        </div>
        <div class="event-info">
          <div class="event-title">{{ event.title }}</div>
          <div class="event-date">{{ event.date }} {{ event.time }}</div>
        </div>
      </div>
    </div>

    <!-- 過去的事件 -->
    <div v-if="pastEvents.length > 0" class="event-list past-events">
      <div class="event-list-title">已完成的事件</div>
      <div
        v-for="event in pastEvents"
        :key="event.id"
        class="event-item past-event"
      >
        <div 
          class="event-category-tag"
          :style="{ 
            backgroundColor: getCategoryBgColor(event.category),
            color: getCategoryColor(event.category)
          }"
        >
          {{ event.category }}
        </div>
        <div class="event-info">
          <div class="event-title">{{ event.title }}</div>
          <div class="event-date">{{ event.date }} {{ event.time }}</div>
        </div>
        <div class="completed-check">✓</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-card {
  border-radius: 1.5rem;
  background: #ffffff;
  padding: 1.2rem 1.3rem 1.4rem;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-title {
  font-weight: 600;
  color: #2b2b3a;
  font-size: 1rem;
}

.calendar-nav {
  display: flex;
  gap: 0.5rem;
}

.calendar-nav button {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  font-size: 0.85rem;
  color: #6b6b80;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.calendar-nav button:hover {
  background: #f9fafb;
  border-color: #9F35FF;
  color: #9F35FF;
}

/* 分類篩選 */
.calendar-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f5;
}

.filter-btn {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #6b6b80;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: #f9fafb;
  border-color: #9F35FF;
}

.filter-btn.active {
  background: #9F35FF;
  color: #fff;
  border-color: #9F35FF;
  box-shadow: 0 4px 12px rgba(159, 53, 255, 0.25);
}

/* 星期標題 */
.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  color: #9a9ab0;
  font-weight: 500;
}

/* 日曆格子 */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  position: relative;
  background: #f9fafb;
  transition: all 0.2s ease;
}

.calendar-day.empty {
  background: transparent;
}

.calendar-day.has-events {
  background: #fff;
  border: 1px solid #e5e7eb;
}

.calendar-day:not(.empty):hover {
  background: #f3e8ff;
  border-color: #9F35FF;
  transform: scale(1.05);
  cursor: pointer;
}

.calendar-day.is-today {
  background: #9F35FF;
  border: 2px solid #9F35FF;
  box-shadow: 0 4px 12px rgba(159, 53, 255, 0.4);
}

.calendar-day.is-today .day-number {
  color: #fff;
  font-weight: 700;
}

.calendar-day.is-today:hover {
  background: #7a1fd9;
  border-color: #7a1fd9;
}

.day-number {
  font-size: 0.85rem;
  color: #2b2b3a;
  font-weight: 500;
  margin-bottom: 2px;
}

.event-dots {
  display: flex;
  gap: 2px;
  margin-top: auto;
  margin-bottom: 2px;
}

.event-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 1px solid;
}

/* 事件列表 */
.event-list {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f5;
}

.event-list-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2b2b3a;
  margin-bottom: 0.75rem;
}

.event-item {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}

.event-item:hover {
  background: #f3f4f6;
  transform: translateX(4px);
}

.event-category-tag {
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.event-info {
  flex: 1;
  min-width: 0;
}

.event-title {
  font-size: 0.85rem;
  font-weight: 500;
  color: #2b2b3a;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.event-date {
  font-size: 0.75rem;
  color: #9a9ab0;
}

/* 過去事件樣式 */
.past-events {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f5;
}

.event-item.past-event {
  opacity: 0.6;
  background: #fafafa;
}

.event-item.past-event:hover {
  opacity: 0.8;
}

.event-item.past-event .event-title {
  text-decoration: line-through;
  color: #9a9ab0;
}

.completed-check {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #22c55e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: bold;
  flex-shrink: 0;
}

/* 響應式調整 */
@media (max-width: 380px) {
  .calendar-day {
    font-size: 0.75rem;
  }
  
  .day-number {
    font-size: 0.75rem;
  }
  
  .event-dot {
    width: 4px;
    height: 4px;
  }
}
</style>
