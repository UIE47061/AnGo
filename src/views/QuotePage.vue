<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const companies = ref([
  {
    id: 1,
    name: '永恆禮儀',
    rating: 4.8,
    price: 'NT$28,500',
    religion: '佛教',
    features: ['24h支援', '接送服務'],
    details: '永恆禮儀提供24小時客服，專業法事協調，含接送及場地佈置。'
  },
  {
    id: 2,
    name: '安和殯葬',
    rating: 4.5,
    price: 'NT$22,000',
    religion: '道教',
    features: ['代辦文件', '佛事協調'],
    details: '安和殯葬擅長代辦公家機關文件，並提供道教法事協調服務。'
  },
  {
    id: 3,
    name: '善念禮儀',
    rating: 4.2,
    price: 'NT$19,800',
    religion: '無宗教/通用',
    features: ['簡約方案', '線上諮詢'],
    details: '善念以簡約方案著稱，並有線上諮詢與彈性方案可選。'
  }
])

const compareSet = ref(new Set())
const showDetail = ref(null)
const showCompareView = ref(false)

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
      <header>
        <button @click="goBack" class="back-btn">&lt;</button>
        <h3>報價列表</h3>
      </header>

      <div class="company-list">
        <div
          v-for="company in companies"
          :key="company.id"
          class="company-card"
        >
          <div class="card-top">
            <div class="company-info">
              <div class="company-name">{{ company.name }}</div>
              <div class="company-meta">
                <span>評價 {{ company.rating }}</span>
                <span>•</span>
                <span>{{ company.price }}</span>
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
          <div>價格：{{ showDetail.price }}</div>
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

header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
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
  font-size: 1.1rem;
  color: #2b2b3a;
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
