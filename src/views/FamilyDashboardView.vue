<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="dashboard">
    <!-- 上方問候 -->
    <header class="greeting">
      <div>
        <h2>馬阿姨 您好！</h2>
        <p>這是您今日的流程進度</p>
      </div>
    </header>

    <!-- 進度卡片 -->
    <section class="progress-card">
      <!-- 氣泡提示按鈕 -->
      <div class="bubble-label">
        確認誦經與法事日期
      </div>

      <div class="progress-main">
        <!-- 左側內框 -->
        <div class="progress-left">
          <div class="progress-panel">
            <div class="tag">目前進度</div>
            <h3>法事準備</h3>
            <button class="link-btn">查看詳細任務 →</button>
          </div>
        </div>

        <!-- 右側水晶球 -->
        <div class="progress-right">
          <div class="circle">
            <div class="liquid"></div>
            <span class="percent">68%</span>
          </div>
        </div>
      </div>

      <p class="hint">再完成 2 項任務即可結案</p>

      <div class="progress-bottom">
        <button class="small-card">
          <span class="icon">💬</span>
          <span>報價與委託</span>
        </button>
        <button class="small-card">
          <span class="icon">🚚</span>
          <span>金流追蹤</span>
        </button>
      </div>
    </section>

    <!-- 文件上傳 -->
    <section class="upload-card">
      <div class="upload-inner">
        <div class="upload-icon">📄＋</div>
        <h4>文件上傳</h4>
        <p>讓我們協助您完成最後的文件步驟</p>
      </div>
    </section>

    <!-- 提醒 + 行事曆 -->
    <section class="calendar-section">
      <div class="reminder-bar">
        <span>2/25 為補件截止日，是否幫您設提醒？</span>
      </div>

      <div class="calendar-card">
        <div class="calendar-header">
          <span>February 2021</span>
          <div class="nav">
            <button>&lt;</button>
            <button>&gt;</button>
          </div>
        </div>

        <div class="calendar-grid">
          <div class="week-row header">
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
            <span>Su</span>
          </div>

          <div class="week-row">
            <span></span><span>1</span><span>2</span><span>3</span><span>4</span
            ><span>5</span><span>6</span>
          </div>
          <div class="week-row">
            <span>7</span><span>8</span><span>9</span><span>10</span
            ><span>11</span><span>12</span><span>13</span>
          </div>
          <div class="week-row">
            <span>14</span><span>15</span><span>16</span><span>17</span
            ><span>18</span><span>19</span><span>20</span>
          </div>
          <div class="week-row">
            <span>21</span>
            <span class="pill active">23</span>
            <span>24</span>
            <span class="pill range">25</span>
            <span class="pill range">26</span>
            <span class="pill active">27</span>
            <span>28</span>
          </div>
          <div class="week-row fade">
            <span>1</span><span>2</span><span>3</span><span>4</span
            ><span>5</span><span></span><span></span>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部聊天 + 導覽列 -->
    <footer class="bottom-area">
      <div class="helper">
        我是安行小幫手，有問題都可以問我
      </div>

      <div class="bottom-nav">
        <button class="chat-btn">
          💬
        </button>

        <div class="nav-bar">
          <button class="nav-item active" @click="goHome">
            <span class="nav-icon">🏠</span>
            <span>首頁</span>
          </button>
          <button class="nav-item">
            <span class="nav-icon">📄</span>
            <span>文件</span>
          </button>
          <button class="nav-item">
            <span class="nav-icon">⋯</span>
            <span>更多</span>
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f5f5f7;
  padding: 1.8rem 1.5rem 5.5rem;
  max-width: 430px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.greeting h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #3c3453;
  letter-spacing: 0.05em;
}

.greeting p {
  margin: 0.35rem 0 0;
  color: #777;
  font-size: 0.95rem;
}

/* 進度卡片 */
.progress-card {
  position: relative;
  border-radius: 1.8rem;
  background: linear-gradient(90deg, #c373dd, #8158e5);
  color: #fff;
  padding: 1.8rem 1.6rem 1.4rem;
  box-shadow: 0 22px 40px rgba(93, 64, 155, 0.35);
}

.progress-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.1rem;
}

.progress-left {
  flex: 1.5;
}

/* 左側內框：加強霧玻璃感 */
.progress-panel {
  border-radius: 1.6rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.72),
    rgba(255, 255, 255, 0.18)
  );
  padding: 1.2rem 1.4rem 1.15rem;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
}

.tag {
  display: inline-block;
  padding: 0.28rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.35);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 500;
}

.progress-panel h3 {
  margin: 0.55rem 0 0.4rem;
  font-size: 1.5rem;
}

.link-btn {
  margin-top: 0.2rem;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  text-align: left;
  cursor: pointer;
}

.progress-right {
  flex: 1;
  display: flex;
  justify-content: center;
}

/* 上方氣泡 */
.bubble-label {
  position: absolute;
  top: -2.3rem;
  right: 1.9rem;
  background: #5b33d8;
  padding: 0.6rem 1.8rem;
  border-radius: 999px;
  font-size: 0.9rem;
  box-shadow: 0 12px 22px rgba(72, 35, 160, 0.6);
  white-space: nowrap;
}

.bubble-label::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -7px;
  width: 16px;
  height: 9px;
  background: #5b33d8;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

/* 水晶球：改為斜切面液體 */
.circle {
  position: relative;
  width: 132px;
  height: 132px;
  border-radius: 50%;
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px; /* leave white border */
  box-sizing: border-box;
}

.liquid {
  position: absolute;
  left: 6%;
  right: 6%;
  bottom: 6%;
  top: 58%;
  background: linear-gradient(135deg, #c2559f, #7a3ee4);
  clip-path: polygon(0 10%, 100% 0, 100% 100%, 0 100%);
  border-radius: 0 0 60% 60% / 0 0 45% 45%;
}

.percent {
  position: relative;
  font-weight: 800;
  font-size: 1.85rem;
  color: #ffffff;
}

.hint {
  font-size: 0.82rem;
  margin: 1rem 0 0.2rem;
  text-align: right;
  opacity: 0.96;
}

/* 報價 / 金流 */
.progress-bottom {
  margin-top: 1rem;
  display: flex;
  gap: 0.8rem;
}

.small-card {
  flex: 1;
  border-radius: 1.1rem;
  border: none;
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
  padding: 0.7rem 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  font-size: 0.9rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
}

/* icon 小圓底 */
.small-card .icon {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: #f5f6fb;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

/* 文件上傳 */
.upload-card {
  background: #ffffff;
  border-radius: 1.4rem;
  padding: 1.6rem 1.4rem;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
}

.upload-inner {
  border: 1px dashed #c8c8d3;
  border-radius: 1rem;
  padding: 1.6rem 1.2rem;
  text-align: center;
}

.upload-icon {
  font-size: 2rem;
  margin-bottom: 0.4rem;
}

.upload-inner h4 {
  margin: 0.2rem 0;
  color: #333;
}

.upload-inner p {
  margin: 0.1rem 0 0;
  color: #8a8a9b;
  font-size: 0.85rem;
}

/* 行事曆區 */
.calendar-section {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.reminder-bar {
  border-radius: 999px;
  padding: 0.7rem 1.1rem;
  background: linear-gradient(90deg, #7c4ee6, #b569ff);
  color: #fff;
  font-size: 0.85rem;
  box-shadow: 0 8px 18px rgba(85, 60, 160, 0.4);
}

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
  margin-bottom: 0.9rem;
  font-weight: 600;
}

.calendar-header .nav button {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.1rem 0.4rem;
  font-size: 1rem;
}

.calendar-grid {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.85rem;
}

.week-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 0.1rem;
}

.week-row.header {
  color: #9a9ab0;
  font-size: 0.75rem;
}

.week-row span {
  padding: 0.25rem 0;
}

.pill {
  border-radius: 999px;
  padding: 0.25rem 0;
}

.pill.active {
  background: #5c3fe1;
  color: #fff;
}

.pill.range {
  background: rgba(92, 63, 225, 0.13);
  color: #5c3fe1;
}

.week-row.fade span {
  color: #d0d0dd;
}

/* 底部 */
.bottom-area {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.helper {
  background: #4f3ddf;
  color: #fff;
  padding: 0.6rem 1rem;
  border-radius: 0.8rem;
  font-size: 0.85rem;
  align-self: flex-start;
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
}

.nav-item.active {
  background: #ffffff;
  color: #4f3ddf;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.nav-icon {
  font-size: 1.1rem;
}
</style>