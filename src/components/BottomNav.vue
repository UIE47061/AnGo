<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  showChatButton: {
    type: Boolean,
    default: true
  }
})

const activeTab = computed(() => route.name)

const navigateTo = (name) => {
  router.push({ name })
}

const openChat = () => {
  router.push({ name: 'Chat' })
}
</script>

<template>
  <footer class="bottom-area">
    <div class="bottom-nav">
      <button v-if="showChatButton" class="chat-btn" @click="openChat" aria-label="開啟聊天">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="#c77ddb"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      <div class="nav-bar">
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
  padding: 0.7rem 1.5rem;
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

.chat-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: #ffffff;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.chat-btn svg {
  display: block;
  width: 22px;
  height: 22px;
  margin: 0;
  transform: none;
}

.chat-btn:active {
  transform: scale(0.95);
}

.nav-bar {
  flex: 1;
  background: #e3e3ea;
  border-radius: 1.4rem;
  padding: 0.35rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  font-size: 0.8rem;
  color: #6b6b80;
  transition: all 0.2s ease;
}

.nav-item.active {
  background: linear-gradient(180deg, #c77ddb, #9b59b6);
  color: #fff;
  box-shadow: 0 8px 18px rgba(199, 125, 219, 0.35);
  transform: translateY(-2px);
}

.nav-item.active .nav-icon svg,
.nav-item.active .nav-icon {
  color: #fff;
  stroke: #fff;
  fill: none;
}
</style>
