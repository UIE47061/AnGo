<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const companies = ref([
  {
    id: 1,
    name: '永恆禮儀',
    rating: 4.8,
    price: 28500,
    religion: '佛教',
    features: ['24h支援', '接送服務'],
    details: '永恆禮儀提供24小時客服，專業法事協調，含接送及場地佈置。'
  },
  {
    id: 2,
    name: '安和殯葬',
    rating: 4.5,
    price: 22000,
    religion: '道教',
    features: ['代辦文件', '佛事協調'],
    details: '安和殯葬擅長代辦公家機關文件，並提供道教法事協調服務。'
  },
  {
    id: 3,
    name: '善念禮儀',
    rating: 4.2,
    price: 19800,
    religion: '無宗教/通用',
    features: ['簡約方案', '線上諮詢'],
    details: '善念以簡約方案著稱，並有線上諮詢與彈性方案可選。'
  },
  {
    id: 4,
    name: '慈恩禮儀',
    rating: 4.6,
    price: 25000,
    religion: '佛教',
    features: ['環保葬', '客製化'],
    details: '慈恩禮儀專注於環保自然葬，提供客製化服務方案。'
  },
  {
    id: 5,
    name: '福安殯儀',
    rating: 4.3,
    price: 32000,
    religion: '道教',
    features: ['傳統儀式', '場地租借'],
    details: '福安殯儀擅長傳統道教儀式，提供完整場地租借服務。'
  }
])

const compareSet = ref(new Set())
const showDetail = ref(null)
const showCompareView = ref(false)

// 篩選條件
const filterReligion = ref('全部')
const filterPriceRange = ref('全部')
const filterRating = ref('全部')

const religionOptions = ['全部', '佛教', '道教', '無宗教/通用']
const priceRangeOptions = ['全部', '2萬以下', '2-3萬', '3萬以上']
const ratingOptions = ['全部', '4.5分以上', '4.0分以上']

// 篩選後的公司列表
const filteredCompanies = computed(() => {
  return companies.value.filter(company => {
    // 宗教篩選
    if (filterReligion.value !== '全部' && company.religion !== filterReligion.value) {
      return false
    }
    
    // 價格篩選
    if (filterPriceRange.value !== '全部') {
      if (filterPriceRange.value === '2萬以下' && company.price >= 20000) return false
      if (filterPriceRange.value === '2-3萬' && (company.price < 20000 || company.price >= 30000)) return false
      if (filterPriceRange.value === '3萬以上' && company.price < 30000) return false
    }
    
    // 評分篩選
    if (filterRating.value !== '全部') {
      if (filterRating.value === '4.5分以上' && company.rating < 4.5) return false
      if (filterRating.value === '4.0分以上' && company.rating < 4.0) return false
    }
    
    return true
  })
})

// 格式化價格顯示
const formatPrice = (price) => {
  return `NT$${price.toLocaleString()}`
}

const goBack = () => {
  router.back()
}

const toggleCompare = (companyId) => {
  if (compareSet.value.has(companyId)) {
    compareSet.value.delete(companyId)
  } else {
    compareSet.value.add(companyId)
  }
  compareSet.value = new Set(compareSet.value)
}

const viewDetail = (company) => {
  showDetail.value = company
}

const closeDetail = () => {
  showDetail.value = null
}

const openCompareView = () => {
  if (compareSet.value.size === 0) return
  showCompareView.value = true
}

const closeCompareView = () => {
  showCompareView.value = false
}

const contactCompany = (company) => {
  alert(`聯絡廠商：${company.name}`)
}

const selectedCompanies = () => {
  return companies.value.filter((c) => compareSet.value.has(c.id))
}
</script>

<template>
  <div class="phone">
    <div class="list-page">
      <!-- 頂部 Bar：標題 + 篩選 -->
      <header class="top-bar">
        <div class="header-row">
          <button @click="goBack" class="back-btn">&lt;</button>
          <h3>報價列表</h3>
        </div>
        
        <!-- 篩選區 -->
        <div class="filter-section">
          <div class="filter-group">
            <label>宗教</label>
            <select v-model="filterReligion" class="filter-select">
              <option v-for="option in religionOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>價格</label>
            <select v-model="filterPriceRange" class="filter-select">
              <option v-for="option in priceRangeOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>評分</label>
            <select v-model="filterRating" class="filter-select">
              <option v-for="option in ratingOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </header>

      <!-- 結果數量 -->
      <div class="result-count">
        找到 {{ filteredCompanies.length }} 家廠商
      </div>

      <div class="company-list">
        <div
          v-for="company in filteredCompanies"
          :key="company.id"
          class="company-card"
        >
          <div class="card-top">
            <div class="company-info">
              <div class="company-name">{{ company.name }}</div>
              <div class="company-meta">
                <span>評價 {{ company.rating }}</span>
                <span>•</span>
                <span>{{ formatPrice(company.price) }}</span>
              </div>
              <div class="company-features">
                {{ company.features.join(' · ') }}
              </div>
            </div>
            <div class="religion-tag">宗教：{{ company.religion }}</div>
          </div>

          <div class="card-actions">
            <button
              class="btn-compare"
              :class="{ active: compareSet.has(company.id) }"
              @click="toggleCompare(company.id)"
            >
              {{ compareSet.has(company.id) ? '已加入' : '加入比較' }}
            </button>
            <button class="btn-detail" @click="viewDetail(company)">
              查看明細
            </button>
          </div>
        </div>
      </div>

      <div v-if="compareSet.size > 0" class="compare-bar">
        <div class="compare-count">已選 {{ compareSet.size }} 筆</div>
        <button @click="openCompareView" class="compare-view-btn">
          前往比較
        </button>
      </div>
    </div>

    <!-- Detail Overlay -->
    <div v-if="showDetail" class="detail-overlay" @click.self="closeDetail">
      <div class="detail-content">
        <div class="detail-header">
          <strong>{{ showDetail.name }}</strong>
          <button @click="closeDetail" class="close-btn">✕</button>
        </div>
        <div class="detail-meta">
          <div>評價：{{ showDetail.rating }}</div>
          <div>｜</div>
          <div>價格：{{ formatPrice(showDetail.price) }}</div>
          <div>｜</div>
          <div>宗教：{{ showDetail.religion }}</div>
        </div>
        <div class="detail-description">{{ showDetail.details }}</div>
        <div class="detail-actions">
          <button
            class="overlay-compare"
            @click="() => { toggleCompare(showDetail.id); closeDetail(); }"
          >
            {{ compareSet.has(showDetail.id) ? '移除比較' : '加入比較' }}
          </button>
          <button
            class="overlay-contact"
            @click="contactCompany(showDetail)"
          >
            選擇廠商
          </button>
        </div>
      </div>
    </div>

    <!-- Compare Overlay -->
    <div
      v-if="showCompareView"
      class="compare-overlay"
      @click.self="closeCompareView"
    >
      <div class="compare-content">
        <div class="compare-header">
          <strong>比較 {{ selectedCompanies().length }} 筆</strong>
          <button @click="closeCompareView" class="close-btn">✕</button>
        </div>
        <div class="compare-list">
          <div
            v-for="company in selectedCompanies()"
            :key="company.id"
            class="compare-item"
          >
            <div class="compare-item-name">{{ company.name }}</div>
            <div class="compare-item-meta">
              評價：{{ company.rating }} ｜ 價格：{{ company.price }} ｜ 宗教：{{
                company.religion
              }}
            </div>
            <div class="compare-item-features">
              {{ company.features.join(' · ') }}
            </div>
          </div>
        </div>
      </div>
    </div>
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

.list-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 12px;
  position: relative;
}

/* 頂部 Bar */
.top-bar {
  background: #fff;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 10;
  margin: -1.8rem -1.5rem 0;
  padding: 1rem 1.5rem 1.2rem;
}

.header-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.back-btn {
  border: none;
  background: transparent;
  padding: 8px;
  min-height: 44px;
  min-width: 44px;
  cursor: pointer;
  font-size: 1.2rem;
  color: #2b2b3a;
  touch-action: manipulation;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn:active {
  opacity: 0.6;
}

.top-bar h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2b2b3a;
  flex: 1;
}

/* 篩選區 */
.filter-section {
  display: flex;
  gap: 8px;
}

.filter-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-group label {
  font-size: 0.75rem;
  color: #9a9ab0;
  font-weight: 500;
}

.filter-select {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #2b2b3a;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 36px;
}

.filter-select:focus {
  outline: none;
  border-color: #9F35FF;
  box-shadow: 0 0 0 3px rgba(159, 53, 255, 0.1);
}

/* 結果數量 */
.result-count {
  font-size: 0.85rem;
  color: #6b6b80;
  padding: 12px 4px 8px;
}

.company-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px;
}

.company-card {
  background: #fff;
  border-radius: 14px;
  padding: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.company-info {
  flex: 1;
  min-width: 0;
}

.company-name {
  font-weight: 700;
  color: #2b2b3a;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.company-meta {
  margin-top: 6px;
  font-size: 0.88rem;
  color: #7b7890;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.company-features {
  margin-top: 6px;
  font-size: 0.82rem;
  color: #6b6b80;
}

.religion-tag {
  background: #fae8fc;
  color: #ab4db5;
  padding: 6px 8px;
  border-radius: 10px;
  font-size: 0.78rem;
  white-space: nowrap;
  margin-left: 12px;
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.btn-compare {
  flex: 1;
  padding: 10px;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid #e5e5ee;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  touch-action: manipulation;
}

.btn-compare.active {
  background: #9F35FF;
  color: #fff;
  border-color: #9F35FF;
}

.btn-detail {
  flex: 1;
  padding: 10px;
  min-height: 44px;
  border-radius: 10px;
  border: none;
  background: #9F35FF;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  touch-action: manipulation;
}

.btn-detail:hover {
  background: #7a1fd9;
}

.compare-bar {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 60px);
  max-width: 354px;
  display: flex;
  gap: 8px;
  align-items: center;
  background: linear-gradient(90deg, #fff, #fbfbff);
  padding: 10px 16px;
  border-radius: 12px;
  box-shadow: 0 -6px 18px rgba(0, 0, 0, 0.12);
}

.compare-count {
  font-weight: 700;
  color: #2b2b3a;
}

.compare-view-btn {
  margin-left: auto;
  padding: 8px 12px;
  border-radius: 10px;
  background: #ab4db5;
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.compare-view-btn:hover {
  background: #8e3d96;
}

.detail-overlay,
.compare-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.36);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 120;
}

.detail-content,
.compare-content {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.compare-content {
  max-height: 80vh;
  overflow: auto;
}

.detail-header,
.compare-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.detail-header strong,
.compare-header strong {
  font-size: 1.05rem;
  color: #2b2b3a;
}

.close-btn {
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  color: #6b6b80;
}

.detail-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: #666;
}

.detail-description {
  font-size: 0.92rem;
  color: #444;
  margin-bottom: 10px;
  line-height: 1.5;
}

.detail-actions {
  display: flex;
  gap: 8px;
}

.overlay-compare {
  flex: 1;
  padding: 10px;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid #e5e5ee;
  background: #fff;
  cursor: pointer;
  font-weight: 600;
  touch-action: manipulation;
}

.overlay-contact {
  flex: 1;
  padding: 12px;
  min-height: 44px;
  border-radius: 10px;
  border: none;
  background: #9F35FF;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  touch-action: manipulation;
}

.overlay-contact:hover {
  background: #7a1fd9;
}

.compare-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.compare-item {
  padding: 10px;
  border-radius: 10px;
  background: #fbfbff;
  border: 1px solid #f0f0f6;
}

.compare-item-name {
  font-weight: 700;
  color: #2b2b3a;
  margin-bottom: 6px;
}

.compare-item-meta {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 6px;
}

.compare-item-features {
  color: #555;
  font-size: 0.9rem;
}
</style>
