<template>
  <div class="dashboard-overlay">
    <div class="dashboard-container">
      
      <!-- 1. 頂部導航欄 -->
      <header class="top-bar">
        <div class="brand">
          <div class="logo-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="titles">
            <h1>AnGo 數據指揮中心</h1>
            <span class="subtitle">殯葬自主流程監控與政策決策支援系統</span>
          </div>
        </div>
        <div class="controls">
          <span class="date-range flex-center">
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
            </svg>
            2023/10/01 - 2023/11/22
          </span>
          <button class="btn-export flex-center">
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            匯出政府公報
          </button>
        </div>
      </header>

      <main class="dashboard-content">
        
        <!-- 2. KPI 關鍵指標 -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-icon teal-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <div class="kpi-info"><span class="label">本月總案件數</span><span class="value">1,248</span><span class="trend positive">▲ 12% 較上月</span></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon orange-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
            </div>
            <div class="kpi-info"><span class="label">平均自辦率 (DIY)</span><span class="value">38.5%</span><span class="trend neutral">目標：40%</span></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon blue-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path></svg>
            </div>
            <div class="kpi-info"><span class="label">AI 法規諮詢數</span><span class="value">5,892</span><span class="trend positive">▲ 爆量成長</span></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon purple-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div class="kpi-info"><span class="label">估計節省社會成本</span><span class="value">$12.5M</span><span class="trend">台幣</span></div>
          </div>
        </div>

        <!-- 3. 核心圖表區：行為分析 -->
        <div class="grid-row-2">
          <!-- (左) 決策漏斗 -->
          <div class="chart-card">
            <div class="card-header">
              <div class="header-title">
                <svg class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                <h2>流程決策漏斗</h2>
              </div>
              <p>各步驟「自辦 vs 委託」比例，識別民眾自助能力邊界。</p>
            </div>
            <div class="chart-body small-h">
              <Bar :data="funnelData" :options="funnelOptions" />
            </div>
          </div>

          <!-- (右) 步驟停留時間 -->
          <div class="chart-card">
            <div class="card-header">
              <div class="header-title">
                <svg class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <h2>行政與決策滯留時間 (分鐘)</h2>
              </div>
              <p>平均操作時長，反映法規複雜度或決策困難度。</p>
            </div>
            <div class="chart-body small-h">
              <Line :data="timeSpentData" :options="timeSpentOptions" />
            </div>
          </div>
        </div>

        <!-- 4. 次級圖表區：宗教與意圖 -->
        <div class="grid-row-3">
          <!-- (左) 宗教儀式分佈 -->
          <div class="chart-card flex-col">
            <div class="card-header">
              <div class="header-title">
                <svg class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                <h2>宗教儀式需求分佈</h2>
              </div>
              <p>協助民政局配置不同宗教之公立設施資源。</p>
            </div>
            <div class="chart-body doughnut-container">
              <Doughnut :data="religionData" :options="religionOptions" />
            </div>
          </div>

          <!-- (右) AI 諮詢熱點 -->
          <div class="chart-card flex-grow">
            <div class="card-header interactive-header">
              <div>
                <div class="header-title">
                  <svg class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  <h2>AI 民眾諮詢熱點</h2>
                </div>
                <p>點擊長條圖可查看詳細民眾提問與法規疑慮。</p>
              </div>
              <span class="badge">👆 點擊互動</span>
            </div>
            <div class="chart-body">
              <Bar ref="aiChartRef" :data="aiData" :options="aiOptions" />
            </div>
          </div>
        </div>

        <!-- 詳情展開區 (Drill-down) -->
        <transition name="slide-up">
          <div v-if="selectedCategory" class="details-panel mb-6">
            <div class="panel-header">
              <div class="panel-title">
                <h3>🔍 深度法規分析：{{ selectedCategory }}</h3>
                <span class="count-badge">共 {{ categoryDetails[selectedCategory]?.length || 0 }} 筆相關提問</span>
              </div>
              <button @click="selectedCategory = null" class="close-btn">關閉 ✕</button>
            </div>
            
            <!-- 列表：只顯示前 4 筆，或全部 -->
            <div class="questions-grid">
              <div v-for="(item, index) in visibleQuestions" :key="index" class="q-card">
                <div class="q-header"><span class="tag">法規實務</span></div>
                <p class="question">"{{ item.question }}"</p>
                <div class="answer-box">
                  <span class="ai-label">
                     <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                     AI 法務參照：
                  </span>
                  <p class="answer">{{ item.answer }}</p>
                </div>
              </div>
            </div>

            <!-- 查看更多按鈕 -->
            <div v-if="categoryDetails[selectedCategory].length > 4" class="view-more-container">
              <button @click="showAllQuestions = !showAllQuestions" class="btn-view-more">
                {{ showAllQuestions ? '收起內容' : '查看更多相關案例' }}
                <svg :class="{'rotate-180': showAllQuestions}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
            </div>
          </div>
        </transition>

        <!-- 5. 綜合洞察與反饋區 -->
        <div class="insight-section">
          
          <!-- 左側：AI 政策建議 (Government Insight) -->
          <div class="insight-box">
            <div class="card-header">
              <div class="header-title">
                <svg class="icon-md text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                <h2 class="text-blue-900">AI 綜合政策決策建議</h2>
              </div>
              <p class="text-blue-700">基於數據關聯分析，提供政府施政參考。</p>
            </div>
            <div class="insight-list">
              <!-- 建議 1: 數位治理 -->
              <div class="insight-item success">
                <div class="insight-icon">🏛️</div>
                <div class="insight-text">
                  <h4>數位治理成效：許可申請 (Step 5) 效率提升</h4>
                  <p><strong>數據佐證：</strong>該環節自辦率達 85%，且電子表單使用率高，平均停留時間下降至 35 分鐘。</p>
                  <p><strong>政策建議：</strong>建議戶政司開放 API 對接，讓民眾可從 App 直接拋轉死亡證明資料，達成「臨櫃零等待」。</p>
                </div>
              </div>
              
              <!-- 建議 2: 公衛風險 -->
              <div class="insight-item warning">
                <div class="insight-icon">🚑</div>
                <div class="insight-text">
                  <h4>公衛風險預警：遺體接運 (Step 2) 違規潛勢</h4>
                  <p><strong>數據佐證：</strong>民眾對「私家車運送」的 AI 提問量高居不下，且該步驟自辦率極低 (10%)，顯示合法運能資訊不透明。</p>
                  <p><strong>政策建議：</strong>建議衛生局釋出「合規遺體運送車」Open Data，整合至平台供民眾即時查詢，降低非法運送導致的防疫破口。</p>
                </div>
              </div>

              <!-- 建議 3: 消費保護 -->
              <div class="insight-item info">
                <div class="insight-icon">⚖️</div>
                <div class="insight-text">
                  <h4>消費權益保護：禮儀安排 (Step 4) 價格透明化</h4>
                  <p><strong>數據佐證：</strong>使用者在此步驟停留最久 (45分) 且反饋多集中於「報價看不懂」，顯示市場資訊不對稱。</p>
                  <p><strong>政策建議：</strong>建議消保官推動「定型化契約 2.0」，強制業者上傳標準收費細項至本平台，以建立市場價格基準線。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 右側：使用者反饋 -->
          <div class="feedback-box">
            <div class="card-header">
              <div class="header-title">
                <svg class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                <h2>市民真實反饋彙整</h2>
              </div>
              <p>來自 App Store 與 1999 信箱的彙整。</p>
            </div>
            <div class="feedback-list">
              <div v-for="(fb, i) in feedbacks" :key="i" class="feedback-item">
                <div class="fb-header">
                  <span class="fb-user">{{ fb.user }}</span>
                  <span class="fb-step-tag">{{ fb.step }}</span>
                </div>
                <div class="fb-rating">
                  <svg v-for="n in 5" :key="n" :class="{'text-yellow-400': n <= fb.rating, 'text-gray-300': n > fb.rating}" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <p class="fb-comment">{{ fb.comment }}</p>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend, BarElement, LineElement, PointElement, ArcElement,
  CategoryScale, LinearScale
} from 'chart.js'
import { Bar, Line, Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend)

// --- 狀態管理 ---
const selectedCategory = ref(null)
const selectedCount = ref(0)
const showAllQuestions = ref(false) // 控制「查看更多」的開關

// --- 1. 台灣真實法規與實務資料庫 (每類 4 筆以上) ---
const categoryDetails = {
  '法規與罰則': [
    { question: "我們家有休旅車，可以自己把遺體載去殯儀館嗎？", answer: "不建議。依《殯葬管理條例》第19條，遺體運送應使用符合衛生主管機關標準之車輛。私家車未經檢驗核准運送遺體，可能違反衛生法規且難以進行消毒。" },
    { question: "死亡證明書如果不見了，要去哪裡補辦？有期限嗎？", answer: "請持申請人身分證向原開立單位（醫院或地檢署）申請補發。依《戶籍法》第48條，死亡登記應於30日內辦理，逾期可能處新臺幣300元以上900元以下罰鍰。" },
    { question: "想把骨灰灑在自家後院的樹下當肥料，這樣違法嗎？", answer: "違法。依《殯葬管理條例》第22條，埋葬骨灰應於公墓或經核准之設施內進行。私自於非墓地拋灑骨灰，最高可處新臺幣15萬元罰鍰。" },
    { question: "長輩過世留下的財產，多久以內要申報遺產稅？", answer: "依《遺產及贈與稅法》第23條，被繼承人死亡之日起 6 個月內，應向戶籍所在地國稅局申報。若有正當理由可申請延期 3 個月。" }
  ],
  '費用與補助': [
    { question: "勞保的喪葬補助可以領多少錢？", answer: "若遺屬有勞保，可請領「家屬死亡給付」（3個月投保薪資）；若亡者本人有勞保，則由支出殯葬費者請領「喪葬津貼」（5個月）。" },
    { question: "聽說聯合公祭不用錢，是真的嗎？", answer: "是的。台北市、新北市等政府為推廣簡葬，提供「聯合奠祭」，包含禮堂、火化、棺木、骨灰罐等21項服務均免費，僅需負擔部分行政規費。" },
    { question: "我是中低收入戶，辦喪事政府有補助嗎？", answer: "有的。依《社會救助法》，各縣市社會局皆有「急難救助金」可申請，通常補助金額在 1~3 萬元不等，需檢附清寒證明。" },
    { question: "跨縣市火化費用會比較貴嗎？", answer: "會。依各縣市殯儀館收費標準，非設籍該縣市之亡者，使用火化爐或禮廳之規費通常會加倍（約市民價的 2~3 倍）。" }
  ],
  '習俗與禁忌': [
    { question: "過世還沒對年，家裡可以包粽子或貼春聯嗎？", answer: "傳統習俗認為喪家一年內（對年）不宜慶祝，通常不包粽（象徵這一年不吉利會成串）也不貼紅春聯。" },
    { question: "懷孕的孫女可以參加阿公的葬禮嗎？", answer: "習俗上不強制禁止，但建議在腹部綁上一條紅布或紅線擋煞（保護胎兒），並避免參與瞻仰遺容或封釘等儀式。" },
    { question: "手尾錢要什麼時候發？有什麼意義？", answer: "通常在入殮前，由長輩將硬幣或紙鈔放入死者手中再分給子孫，象徵亡者留下的福氣與財富。" },
    { question: "腳尾飯上面的鴨蛋要煮熟嗎？", answer: "要煮熟。傳統習俗會在腳尾飯插上一雙筷子並放上一顆熟鴨蛋，象徵亡者吃飽後好上路，且「鴨蛋孵出小鴨（不可能）」才回來，意指人死不能復生。" }
  ],
  '流程操作': [
    { question: "我要怎麼在 App 裡面預約禮廳？", answer: "請點選首頁的「禮儀安排」，選擇「公立設施預約」，系統會串接各縣市殯葬處的空廳查詢系統。" },
    { question: "電子輓聯要怎麼申請？需要去現場嗎？", answer: "不需要。目前各縣市均推廣電子輓聯，您只需在 App 的「許可申請」區塊填寫亡者資料與告別式場次，即可線上送出申請。" },
    { question: "火化許可證跟死亡證明書是一樣的東西嗎？", answer: "不一樣。死亡證明書由醫生開立；火化許可證則需憑死亡證明書向衛生所或區公所申請，拿到許可證後，火化場才會執行火化。" },
    { question: "如果在醫院過世，要怎麼叫接體車？", answer: "您可直接點擊 App 首頁的「遺體接運」按鈕，系統會列出衛生局核准的合約接體車業者，並顯示預估抵達時間。" }
  ],
  '悲傷輔導': [
    { question: "一直夢到過世的親人，我很害怕也很想他", answer: "這是喪親後常見的反應。若夢境造成嚴重失眠或焦慮，建議使用本平台的「心理諮詢資源」尋求專業協助。" },
    { question: "哪裡有免費的心理諮商？", answer: "衛福部提供 24 小時安心專線 1925（依舊愛我），各縣市社區心理衛生中心也提供免費或優惠的心理諮商時段。" },
    { question: "小朋友一直問爺爺去哪了，要跟他說實話嗎？", answer: "心理學建議用具體、誠實但溫和的方式說明（如：爺爺身體壞掉了，不會再回來），避免使用「睡著了」，以免孩子產生睡眠恐懼。" },
    { question: "我覺得自己好像得了憂鬱症，怎麼辦？", answer: "請利用 App 內的「憂鬱量表自我檢測」，若分數過高，系統會自動協助您轉介至附近的身心科診所。" }
  ]
}

// 計算屬性：控制顯示的數量
const visibleQuestions = computed(() => {
  if (!selectedCategory.value) return []
  const all = categoryDetails[selectedCategory.value] || []
  return showAllQuestions.value ? all : all.slice(0, 4)
})

// 監聽點擊圖表，重置查看更多狀態
const handleChartClick = (category) => {
  selectedCategory.value = category
  showAllQuestions.value = false // 重置為收起狀態
  // 捲動邏輯...
}

// --- 圖表數據 (Mock Data) ---
const funnelData = {
  labels: ['1.遺體', '2.接運', '3.入館', '4.禮儀', '5.許可', '6.安葬', '7.後續'],
  datasets: [
    { label: '民眾自辦', backgroundColor: '#2ca02c', data: [15, 10, 20, 45, 85, 30, 70], borderRadius: 0, barPercentage: 0.6 },
    { label: '委託業者', backgroundColor: '#ff7f0e', data: [85, 90, 80, 55, 15, 70, 30], borderRadius: 0, barPercentage: 0.6 }
  ]
}
const funnelOptions = { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, max: 100, ticks: { callback: v => v + '%' } } }, plugins: { legend: { position: 'bottom' } } }

const timeSpentData = {
  labels: ['遺體', '接運', '入館', '禮儀', '許可', '安葬', '後續'],
  datasets: [{
    label: '平均停留時間 (分鐘)',
    borderColor: '#3B82F6', backgroundColor: 'rgba(59, 130, 246, 0.1)',
    data: [10, 15, 25, 45, 35, 20, 30], fill: true, tension: 0.4
  }]
}
const timeSpentOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }

const religionData = {
  labels: ['道教/民間信仰', '佛教', '基督教/天主教', '無宗教/其他'],
  datasets: [{ backgroundColor: ['#EAB308', '#F97316', '#3B82F6', '#9CA3AF'], data: [55, 25, 10, 10], borderWidth: 0 }]
}
const religionOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { usePointStyle: true } } } }

const aiData = {
  labels: ['法規與罰則', '費用與補助', '習俗與禁忌', '流程操作', '悲傷輔導'],
  datasets: [{ label: '提問熱度', backgroundColor: ['#e53935', '#1e88e5', '#8e24aa', '#757575', '#d81b60'], data: [350, 420, 150, 280, 50], borderRadius: 4 }]
}
const aiOptions = { 
  indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, 
  onClick: (e, els) => { 
    if(els.length) { 
      const label = aiData.labels[els[0].index]
      handleChartClick(label)
      setTimeout(()=>document.querySelector('.details-panel')?.scrollIntoView({behavior:'smooth'}),100) 
    } 
  } 
}

const feedbacks = [
  { user: 'User_9527', step: '4.禮儀安排', rating: 3, comment: '報價單有點太複雜了，很難比較不同禮儀社的細項，希望能有懶人包。' },
  { user: 'Lin_Mama', step: '2.遺體接運', rating: 2, comment: '找不到合法的接運車電話，App 裡面的資訊如果不更新會很困擾。' },
  { user: 'Chen_Sir', step: '5.許可申請', rating: 5, comment: '直接生成電子表單真的太方便了！省去跑戶政事務所的時間，大推。' }
]
</script>

<style scoped>
/* 基礎設定 */
.dashboard-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #F3F4F6; z-index: 9999; overflow-y: auto; font-family: 'Inter', sans-serif; }
.dashboard-container { max-width: 1440px; margin: 0 auto; padding: 0 20px 40px 20px; }
.flex-center { display: flex; align-items: center; gap: 8px; }
.icon-sm { width: 16px; height: 16px; } .icon-md { width: 20px; height: 20px; } .icon-xs { width: 14px; height: 14px; vertical-align: text-bottom; }

/* Header & KPI */
.top-bar { display: flex; justify-content: space-between; align-items: center; background: white; padding: 16px 32px; margin: 0 -20px 30px -20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
.logo-box { width: 40px; height: 40px; background: #00897B; color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.brand { display: flex; align-items: center; gap: 12px; }
.titles h1 { font-size: 20px; margin: 0; color: #111827; font-weight: 700; }
.titles .subtitle { font-size: 12px; color: #6B7280; }
.controls { display: flex; gap: 12px; }
.date-range { background: #F9FAFB; padding: 8px 16px; border-radius: 6px; font-size: 14px; color: #374151; border: 1px solid #E5E7EB; }
.btn-export { background: #00897B; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; transition: background 0.2s; }
.btn-export:hover { background: #00695c; }

.kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 24px; }
.kpi-card { background: white; padding: 24px; border-radius: 12px; border: 1px solid #E5E7EB; display: flex; align-items: flex-start; gap: 16px; }
.kpi-icon { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.teal-bg { background: #E0F2F1; color: #00695C; } .orange-bg { background: #FFF3E0; color: #E65100; } .blue-bg { background: #E3F2FD; color: #1565C0; } .purple-bg { background: #F3E5F5; color: #7B1FA2; }
.kpi-info { display: flex; flex-direction: column; } .label { font-size: 13px; color: #6B7280; } .value { font-size: 28px; font-weight: 700; color: #111827; } .trend { font-size: 12px; font-weight: 500; } .trend.positive { color: #059669; } .trend.neutral { color: #6B7280; }

/* Grid Layouts */
.grid-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
.grid-row-3 { display: grid; grid-template-columns: 4fr 8fr; gap: 24px; margin-bottom: 24px; }
@media (max-width: 1024px) { .grid-row-2, .grid-row-3 { grid-template-columns: 1fr; } }

.chart-card { background: white; border-radius: 12px; padding: 24px; border: 1px solid #E5E7EB; display: flex; flex-direction: column; }
.card-header { margin-bottom: 20px; }
.header-title { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.card-header h2 { font-size: 18px; font-weight: 600; margin: 0; color: #111827; }
.card-header p { font-size: 13px; color: #6B7280; margin: 0; }
.interactive-header { display: flex; justify-content: space-between; align-items: flex-start; }
.badge { background: #EFF6FF; color: #2563EB; padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 600; }
.chart-body { width: 100%; }
.small-h { height: 250px; }
.doughnut-container { height: 250px; position: relative; }

/* Insight Section */
.insight-section { display: grid; grid-template-columns: 7fr 5fr; gap: 24px; }
.insight-box { background: #EFF6FF; border: 1px solid #DBEAFE; border-radius: 12px; padding: 24px; }
.feedback-box { background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 24px; }

.insight-list { display: flex; flex-direction: column; gap: 16px; }
.insight-item { display: flex; gap: 16px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #ccc; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
.insight-item.success { border-left-color: #10B981; }
.insight-item.warning { border-left-color: #F59E0B; }
.insight-item.info { border-left-color: #3B82F6; }
.insight-icon { font-size: 22px; margin-top: 2px; }
.insight-text h4 { margin: 0 0 6px 0; font-size: 15px; font-weight: 600; color: #111827; }
.insight-text p { margin: 4px 0 0 0; font-size: 13px; color: #4B5563; line-height: 1.5; }

.feedback-list { display: flex; flex-direction: column; gap: 12px; max-height: 350px; overflow-y: auto; }
.feedback-item { background: #F9FAFB; padding: 12px; border-radius: 8px; border: 1px solid #F3F4F6; }
.fb-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
.fb-user { font-size: 13px; font-weight: 600; color: #374151; }
.fb-step-tag { font-size: 11px; background: #E5E7EB; color: #6B7280; padding: 2px 6px; border-radius: 4px; }
.fb-rating { color: #FBBF24; display: flex; gap: 2px; margin-bottom: 6px; }
.fb-comment { font-size: 13px; color: #4B5563; margin: 0; line-height: 1.4; }

/* Detail Panel & View More */
.details-panel { background: white; border-radius: 12px; padding: 24px; border: 1px solid #E5E7EB; border-left: 5px solid #1565C0; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
.panel-header { display: flex; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px solid #eee; padding-bottom: 12px; }
.panel-title h3 { font-size: 18px; margin: 0; display: inline-block; }
.count-badge { background: #1565C0; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-left: 8px; }
.close-btn { background: none; border: none; color: #6B7280; cursor: pointer; }
.questions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
.q-card { background: #F9FAFB; padding: 16px; border-radius: 8px; border: 1px solid #E5E7EB; }
.tag { background: #FEF2F2; color: #DC2626; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: bold; }
.question { font-weight: 600; font-size: 14px; margin: 8px 0; color: #111827; }
.answer-box { background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #059669; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
.ai-label { font-size: 12px; color: #059669; display: flex; align-items: center; gap: 6px; margin-bottom: 4px; font-weight: 600; }
.answer { font-size: 13px; color: #374151; margin: 0; line-height: 1.5; }
.text-yellow-400 { color: #FBBF24; } .text-gray-300 { color: #D1D5DB; }

/* View More Button */
.view-more-container { margin-top: 20px; display: flex; justify-content: center; }
.btn-view-more {
  display: flex; align-items: center; gap: 6px;
  background: white; border: 1px solid #D1D5DB; color: #4B5563;
  padding: 8px 24px; border-radius: 20px; font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.2s;
}
.btn-view-more:hover { background: #F3F4F6; border-color: #9CA3AF; color: #111827; }
.rotate-180 { transform: rotate(180deg); }
</style>