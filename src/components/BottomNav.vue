<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeTab = computed(() => route.name)

const navigateTo = (name) => {
  router.push({ name })
}
</script>

<template>
  <footer class="bottom-area">
    <div class="bottom-nav">
      <div class="nav-bar">
        <button
          class="nav-item"
          :class="{ active: activeTab === 'Quote' }"
          @click="navigateTo('Quote')"
        >
          <span class="nav-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </span>
          <span>業務</span>
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'Process' }"
          @click="navigateTo('Process')"
        >
          <span class="nav-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
          <span>流程</span>
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'FamilyDashboard' }"
          @click="navigateTo('FamilyDashboard')"
        >
          <span class="nav-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 9.5L12 3l9 6.5" />
              <path d="M9 22V12h6v10" />
            </svg>
          </span>
          <span>首頁</span>
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'Documents' }"
          @click="navigateTo('Documents')"
        >
          <span class="nav-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
          </span>
          <span>文件</span>
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'Chat' }"
          @click="navigateTo('Chat')"
        >
          <span class="nav-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <span>安行助理</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.bottom-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 414px;
  margin: 0 auto;
  padding: 0.7rem 1rem;
  padding-bottom: max(1.8rem, env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  background: #f5f5f7;
  z-index: 100;
}

.bottom-nav {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.nav-bar {
  flex: 1;
  background: #e3e3ea;
  border-radius: 1.4rem;
  padding: 0.35rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.2rem;
}

.nav-item {
  flex: 1;
  border-radius: 1rem;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  padding: 0.4rem 0;
  cursor: pointer;
  font-size: 0.7rem;
  color: #6b6b80;
  transition: all 0.2s ease;
  min-width: 0;
}

.nav-item span:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.nav-item.active {
  background: linear-gradient(180deg, #9F35FF, #7a1fd9);
  color: #fff;
  box-shadow: 0 8px 18px rgba(159, 53, 255, 0.35);
  transform: translateY(-2px);
}

.nav-item.active .nav-icon svg,
.nav-item.active .nav-icon {
  color: #fff;
  stroke: #fff;
  fill: none;
}
</style>
