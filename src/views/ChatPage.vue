<script setup>
import { ref } from 'vue'
import BottomNav from '@/components/BottomNav.vue'

const messageInput = ref('')
const chatMessages = ref([
  {
    id: 1,
    type: 'bot',
    text: '您好！我是安行助理'
  }
])

const sendMessage = () => {
  const text = messageInput.value.trim()
  if (!text) return

  // Add user message
  chatMessages.value.push({
    id: Date.now(),
    type: 'user',
    text
  })

  messageInput.value = ''

  // Simulate bot response
  setTimeout(() => {
    chatMessages.value.push({
      id: Date.now() + 1,
      type: 'bot',
      text: '稍等，我正在為您查詢...'
    })
  }, 450)
}

const quickSend = (text) => {
  messageInput.value = text
  sendMessage()
}
</script>

<template>
  <div class="phone">
    <div class="chat-page">
      <header>
        <h3>AI對話</h3>
      </header>

      <div class="chat-scroll" id="chat-scroll">
        <div
          v-for="msg in chatMessages"
          :key="msg.id"
          :class="['message-wrapper', msg.type === 'user' ? 'user' : 'bot']"
        >
          <div class="message-bubble">{{ msg.text }}</div>
        </div>
      </div>

      <div class="quick-actions">
        <button class="quick-send" @click="quickSend('查看文件進度')">
          查看文件進度
        </button>
        <button class="quick-send" @click="quickSend('查看金流')">查看金流</button>
      </div>

      <div class="chat-input">
        <input
          v-model="messageInput"
          type="text"
          placeholder="輸入訊息..."
          @keyup.enter="sendMessage"
          aria-label="輸入訊息"
        />
        <button @click="sendMessage" id="send-btn">送出</button>
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

.chat-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3.6rem);
  gap: 12px;
  position: relative;
  padding-bottom: 200px;
}

header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 4px;
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
  font-size: 1.05rem;
  color: #2b2b3a;
}

.chat-scroll {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding: 6px 2px;
  margin-bottom: auto;
}

.message-wrapper {
  display: flex;
}

.message-wrapper.bot {
  justify-content: flex-start;
}

.message-wrapper.user {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 78%;
  padding: 10px 12px;
  border-radius: 12px;
}

.message-wrapper.bot .message-bubble {
  background: #f1f2fb;
  color: #1b1030;
  border-top-left-radius: 4px;
}

.message-wrapper.user .message-bubble {
  background: #ab4db5;
  color: #fff;
  border-top-right-radius: 4px;
}

.quick-actions {
  display: flex;
  gap: 8px;
  padding: 8px 2px;
  background: #f5f5f7;
  position: fixed;
  bottom: 155px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 3rem);
  max-width: 354px;
  z-index: 15;
}

.quick-send {
  flex: 1;
  padding: 10px;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid #e6e6ee;
  background: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  touch-action: manipulation;
}

.quick-send:hover {
  background: #f8f8fb;
  border-color: #ab4db5;
}

.chat-input {
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 3rem);
  max-width: 354px;
  background: #fff;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 12px;
  border-top: 1px solid #e6e6ee;
  border-radius: 12px;
  margin-bottom: 0;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  z-index: 15;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #e6e6ee;
  outline: none;
  font-size: 0.95rem;
}

.chat-input input:focus {
  border-color: #9F35FF;
}

#send-btn {
  padding: 0.6rem 1.2rem;
  min-height: 44px;
  border-radius: 999px;
  border: none;
  background: #9F35FF;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  touch-action: manipulation;
}

#send-btn:hover {
  background: #7a1fd9;
}
</style>
