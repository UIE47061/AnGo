<script setup>
const handleFamilyEntry = () => {
  console.log('家屬端入口')
  // TODO: 導航到家屬端頁面
}

const handleProviderEntry = () => {
  console.log('業者端入口')
  // TODO: 導航到業者端頁面
}
</script>

<template>
  <div class="home-container">
    <div class="progress-dots">
      <div class="dot active"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    
    <div class="content">
      <div class="header">
        <h1 class="title-en">AnGo</h1>
        <h1 class="title-zh">安行</h1>
        <p class="subtitle">新竹市政府</p>
      </div>

      <div class="buttons">
        <button class="entry-button" @click="handleFamilyEntry">
          家屬端入口
        </button>
        <button class="entry-button" @click="handleProviderEntry">
          業者端入口
        </button>
      </div>

      <p class="footer-text">為人生最後一段路，帶來安心與妥序</p>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #b88bb8 0%, #7a5a9e 50%, #4a3668 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang TC', 'Microsoft JhengHei', sans-serif;
}

.progress-dots {
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6rem;
  z-index: 10;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  position: relative;
}

.dot.active {
  background-color: white;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.dot.active::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-radius: 50%;
}

.content {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 2.5rem;
  padding: 4rem 2.5rem;
  width: 100%;
  max-width: 420px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.header {
  text-align: center;
  color: white;
}

.title-en {
  font-size: 3rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title-zh {
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  opacity: 0.9;
}

.buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1rem;
}

.entry-button {
  width: 100%;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 3rem;
  color: white;
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.entry-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.entry-button:active {
  transform: translateY(0);
}

.footer-text {
  color: white;
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  text-align: center;
  opacity: 0.8;
  line-height: 1.6;
  margin-top: 1rem;
}

@media (max-width: 480px) {
  .content {
    padding: 3rem 2rem;
  }
  
  .title-en,
  .title-zh {
    font-size: 2.5rem;
  }
  
  .progress-dots {
    gap: 4rem;
    top: 2rem;
  }
}
</style>
