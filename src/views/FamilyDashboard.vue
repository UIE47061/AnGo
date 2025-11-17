<script setup>
import { useRouter } from 'vue-router'
import ProgressCircle from '@/components/ProgressCircle.vue'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()

const navigateToQuote = () => {
  router.push({ name: 'Quote' })
}

const navigateToPayment = () => {
  router.push({ name: 'Payment' })
}
</script>

<template>
  <div class="phone">
    <main id="main-content">
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
        <div class="bubble-label">確認誦經與法事日期</div>

        <div class="progress-main">
          <!-- 左側內框 -->
          <div class="progress-left">
            <div class="progress-panel">
              <div class="tag">目前進度</div>
              <h3>法事準備</h3>
              <button class="link-btn">查看詳細任務 →</button>
              <p class="hint hint-panel">再完成 2 項任務即可結案</p>
            </div>
          </div>

          <!-- 右側水晶球 -->
          <div class="progress-right">
            <ProgressCircle :percentage="68" />
          </div>
        </div>

        <div class="progress-bottom">
          <button class="small-card" @click="navigateToQuote">
            <span class="icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="#2b2b3a"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
            </span>
            <span>報價與委託</span>
          </button>
          <button class="small-card" @click="navigateToPayment">
            <span class="icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="#2b2b3a"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="1" y="3" width="15" height="13" />
                <path d="M16 8h5v8" />
                <circle cx="5.5" cy="18.5" r="1.5" />
                <circle cx="18.5" cy="18.5" r="1.5" />
              </svg>
            </span>
            <span>金流追蹤</span>
          </button>
        </div>
      </section>

      <!-- 文件上傳 -->
      <section class="upload-card">
        <div class="upload-inner">
          <div class="upload-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="#6b6b80"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M12 11v6" />
              <path d="M9 14h6" />
            </svg>
          </div>
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
              <span></span><span>1</span><span>2</span><span>3</span><span>4</span>
              <span>5</span><span>6</span>
            </div>
            <div class="week-row">
              <span>7</span><span>8</span><span>9</span><span>10</span>
              <span>11</span><span>12</span><span>13</span>
            </div>
            <div class="week-row">
              <span>14</span><span>15</span><span>16</span><span>17</span>
              <span>18</span><span>19</span><span>20</span>
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
              <span>1</span><span>2</span><span>3</span><span>4</span>
              <span>5</span><span></span><span></span>
            </div>
          </div>
        </div>
      </section>
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
  gap: 1.6rem;
  overflow-y: auto;
  padding: 1.8rem 1.5rem;
  padding-bottom: calc(120px + env(safe-area-inset-bottom));
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

.progress-card {
  position: relative;
  border-radius: 1rem;
  padding: 1.1rem 1rem 0.9rem;
  background: linear-gradient(90deg, #e8c4f0 10%, #c77ddb 60%);
  color: #fff;
  box-shadow: 0 18px 36px rgba(199, 125, 219, 0.32);
  overflow: visible;
}

.progress-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 0.6rem;
}

.progress-left {
  flex: 2;
}

.progress-panel {
  border-radius: 1.6rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.48),
    rgba(255, 255, 255, 0.12)
  );
  padding: 0.9rem 1.2rem 0.85rem;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
}

.tag {
  display: inline-block;
  padding: 0.28rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.35);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 500;
}

.progress-panel h3 {
  margin: 0.35rem 0 0.2rem;
  font-size: 1.18rem;
}

.link-btn {
  margin-top: 0.12rem;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.78rem;
  text-align: left;
  cursor: pointer;
}

.progress-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.25rem;
}

.bubble-label {
  position: absolute;
  top: -2.6rem;
  right: 2.1rem;
  background: linear-gradient(180deg, #d4a3dd, #9b59b6);
  padding: 0.5rem 1.6rem;
  border-radius: 999px;
  font-size: 0.88rem;
  box-shadow: 0 10px 20px rgba(199, 125, 219, 0.38);
  white-space: nowrap;
  line-height: 1;
  transform: translateZ(0);
}

.bubble-label::after {
  content: '';
  position: absolute;
  left: var(--arrow-left, 50%);
  transform: none;
  bottom: -7px;
  width: 16px;
  height: 9px;
  background: linear-gradient(180deg, #9b59b6, #7d3c8f);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.18));
}

.hint {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.95);
  opacity: 0.95;
}

.hint-panel {
  margin-top: 0.6rem;
  font-size: 0.74rem;
  color: rgba(27, 16, 48, 0.75);
  text-align: left;
  opacity: 0.95;
}

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
  transition: all 0.2s ease;
}

.small-card:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
}

.small-card:active {
  transform: translateY(0);
}

.small-card:active {
  transform: translateY(0);
}

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

.small-card .icon svg {
  width: 16px;
  height: 16px;
  display: block;
}

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
  display: flex;
  justify-content: center;
}

.upload-icon svg {
  display: block;
  width: 28px;
  height: 28px;
}

.upload-inner h4 {
  margin: 0.4rem 0;
  color: #2b2b3a;
}

.upload-inner p {
  margin: 0.4rem 0 0;
  color: #6b6b80;
  font-size: 0.9rem;
}

.calendar-section {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.reminder-bar {
  border-radius: 999px;
  padding: 0.7rem 1.1rem;
  background: linear-gradient(90deg, #b084bb, #e8c4f0);
  color: #fff;
  font-size: 0.85rem;
  box-shadow: 0 8px 14px rgba(199, 125, 219, 0.32);
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
  color: #2b2b3a;
}

.calendar-header .nav {
  display: flex;
  gap: 0.5rem;
}

.calendar-header .nav button {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.1rem 0.4rem;
  font-size: 1rem;
  color: #2b2b3a;
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
</style>
