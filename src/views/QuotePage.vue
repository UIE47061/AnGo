<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const { displayToast } = useToast()

// 流程項目定義
const processItems = [
  { id: 1, name: '驗屍' },
  { id: 2, name: '屍體接運' },
  { id: 3, name: '入館' },
  { id: 4, name: '禮儀安排' },
  { id: 5, name: '許可證申請' },
  { id: 6, name: '安葬' },
  { id: 7, name: '後續處理' }
]

const companies = ref([
  {
    id: 1,
    name: '永恆禮儀',
    rating: 4.8,
    price: 28500,
    religion: '佛教',
    features: ['24h支援', '接送服務'],
    details: '永恆禮儀提供24小時客服，專業法事協調，含接送及場地佈置。',
    providedServices: [2, 3, 4, 6, 7] // 提供：屍體接運、入館、禮儀安排、安葬、後續處理
  },
  {
    id: 2,
    name: '安和殯葬',
    rating: 4.5,
    price: 22000,
    religion: '道教',
    features: ['代辦文件', '佛事協調'],
    details: '安和殯葬擅長代辦公家機關文件，並提供道教法事協調服務。',
    providedServices: [4, 5, 7] // 提供：禮儀安排、許可證申請、後續處理
  },
  {
    id: 3,
    name: '善念禮儀',
    rating: 4.2,
    price: 19800,
    religion: '無宗教/通用',
    features: ['簡約方案', '線上諮詢'],
    details: '善念以簡約方案著稱，並有線上諮詢與彈性方案可選。',
    providedServices: [4, 6] // 提供：禮儀安排、安葬
  },
  {
    id: 4,
    name: '慈恩禮儀',
    rating: 4.6,
    price: 25000,
    religion: '佛教',
    features: ['環保葬', '客製化'],
    details: '慈恩禮儀專注於環保自然葬，提供客製化服務方案。',
    providedServices: [2, 3, 4, 6] // 提供：屍體接運、入館、禮儀安排、安葬
  },
  {
    id: 5,
    name: '福安殯儀',
    rating: 4.3,
    price: 32000,
    religion: '道教',
    features: ['傳統儀式', '場地租借'],
    details: '福安殯儀擅長傳統道教儀式，提供完整場地租借服務。',
    providedServices: [2, 3, 4, 5, 6, 7] // 提供：屍體接運、入館、禮儀安排、許可證申請、安葬、後續處理
  },
  {
    id: 6,
    name: '龍岩禮儀公司',
    rating: 4.9,
    price: 35000,
    religion: '佛教',
    features: ['全套服務', '高品質'],
    details: '龍岩禮儀提供完整一條龍服務，品質優良，服務專業。',
    providedServices: [2, 3, 4, 5, 6, 7] // 提供：屍體接運、入館、禮儀安排、許可證申請、安葬、後續處理
  }
])

// 服務選擇狀態 (購物車)
const selectedServices = ref(new Map()) // Map<companyId, Set<serviceId>>
const isCartExpanded = ref(false) // 購物車展開狀態

const compareSet = ref(new Set())
const showDetail = ref(null)
const showCompareView = ref(false)

// 篩選條件
const filterReligion = ref('全部')
const filterPriceRange = ref('全部')
const filterRating = ref('全部')
const filterProcess = ref('全部')

const religionOptions = ['全部', '佛教', '道教', '無宗教/通用']
const priceRangeOptions = ['全部', '2萬以下', '2-3萬', '3萬以上']
const ratingOptions = ['全部', '4.5分以上', '4.0分以上']
const processOptions = ['全部', ...processItems.map(item => `${item.id}. ${item.name}`)]

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
    
    // 流程篩選
    if (filterProcess.value !== '全部') {
      const processId = parseInt(filterProcess.value.split('.')[0])
      if (!company.providedServices.includes(processId)) {
        return false
      }
    }
    
    return true
  })
})

// 格式化價格顯示
const formatPrice = (price) => {
  return `NT$${price.toLocaleString()}`
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
  displayToast(`聯絡廠商：${company.name}`)
}

const selectedCompanies = () => {
  return companies.value.filter((c) => compareSet.value.has(c.id))
}

// 獲取流程項目名稱
const getProcessName = (id) => {
  return processItems.find(item => item.id === id)?.name || ''
}

// 選取服務
const selectService = (company) => {
  if (!selectedServices.value.has(company.id)) {
    selectedServices.value.set(company.id, new Set(company.providedServices))
  } else {
    selectedServices.value.delete(company.id)
  }
  selectedServices.value = new Map(selectedServices.value)
}

// 切換單個服務項目
const toggleServiceItem = (companyId, serviceId) => {
  if (!selectedServices.value.has(companyId)) {
    const newSet = new Set([serviceId])
    selectedServices.value.set(companyId, newSet)
  } else {
    const serviceSet = selectedServices.value.get(companyId)
    if (serviceSet.has(serviceId)) {
      serviceSet.delete(serviceId)
      if (serviceSet.size === 0) {
        selectedServices.value.delete(companyId)
      }
    } else {
      serviceSet.add(serviceId)
    }
  }
  selectedServices.value = new Map(selectedServices.value)
}

// 計算已選擇的總服務數
const totalSelectedServices = computed(() => {
  let total = 0
  selectedServices.value.forEach(serviceSet => {
    total += serviceSet.size
  })
  return total
})

// 獲取已選擇的服務詳情
const getSelectedServiceDetails = computed(() => {
  const details = []
  selectedServices.value.forEach((serviceSet, companyId) => {
    const company = companies.value.find(c => c.id === companyId)
    if (company) {
      serviceSet.forEach(serviceId => {
        details.push({
          companyId,
          companyName: company.name,
          serviceId,
          serviceName: getProcessName(serviceId)
        })
      })
    }
  })
  return details
})

// 按業者分組的服務
const getServicesByCompany = computed(() => {
  const grouped = []
  selectedServices.value.forEach((serviceSet, companyId) => {
    const company = companies.value.find(c => c.id === companyId)
    if (company) {
      const services = Array.from(serviceSet).map(serviceId => ({
        id: serviceId,
        name: getProcessName(serviceId)
      }))
      grouped.push({
        companyId,
        companyName: company.name,
        services,
        count: services.length
      })
    }
  })
  return grouped
})

// 切換購物車展開/收合
const toggleCart = () => {
  isCartExpanded.value = !isCartExpanded.value
}

// 確認服務
const confirmServices = () => {
  if (totalSelectedServices.value === 0) {
    displayToast('請先選擇服務項目')
    return
  }
  
  // 儲存到 localStorage 以便流程頁面讀取
  const servicesData = []
  selectedServices.value.forEach((serviceSet, companyId) => {
    const company = companies.value.find(c => c.id === companyId)
    serviceSet.forEach(serviceId => {
      servicesData.push({
        processId: serviceId,
        companyName: company.name
      })
    })
  })
  
  localStorage.setItem('assignedServices', JSON.stringify(servicesData))
  
  displayToast(`已確認 ${totalSelectedServices.value} 項服務，即將返回流程頁面`)
  setTimeout(() => {
    router.push({ name: 'Process' })
  }, 1500)
}
</script>

<template>
  <div class="phone">
    <div class="list-page">
      <!-- 頂部 Bar：標題 + 篩選 -->
      <header class="top-bar">
        <div class="header-row">
          <h3>報價列表</h3>
        </div>
        
        <!-- 篩選區 -->
        <div class="filter-section">
          <div class="filter-group">
            <label>流程項目</label>
            <select v-model="filterProcess" class="filter-select">
              <option v-for="option in processOptions" :key="option" :value="option">
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
              
              <!-- 提供的流程項目 -->
              <div class="provided-services">
                <span class="service-label">提供項目：</span>
                <div class="service-tags">
                  <span 
                    v-for="serviceId in company.providedServices" 
                    :key="serviceId"
                    class="service-tag"
                    :class="{ 
                      selected: selectedServices.has(company.id) && selectedServices.get(company.id).has(serviceId) 
                    }"
                    @click.stop="toggleServiceItem(company.id, serviceId)"
                  >
                    {{ serviceId }}. {{ getProcessName(serviceId) }}
                  </span>
                </div>
              </div>
              
              <div class="company-features">
                {{ company.features.join(' · ') }}
              </div>
            </div>
            <div class="religion-tag">宗教：{{ company.religion }}</div>
          </div>

          <div class="card-actions">
            <button
              class="btn-select-service"
              :class="{ active: selectedServices.has(company.id) }"
              @click="selectService(company)"
            >
              {{ selectedServices.has(company.id) ? '已選取' : '選取服務' }}
            </button>
            <button class="btn-detail" @click="viewDetail(company)">
              查看明細
            </button>
          </div>
        </div>
      </div>

      <!-- 服務購物列 -->
      <div v-if="totalSelectedServices > 0" class="service-cart" :class="{ expanded: isCartExpanded }">
        <!-- 收合狀態：購物列 -->
        <div class="cart-bar" @click="toggleCart">
          <div class="cart-bar-left">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
            <span class="cart-bar-text">已選取 <strong>{{ totalSelectedServices }}</strong> 項服務</span>
          </div>
          <div class="cart-bar-right">
            <span class="expand-text">{{ isCartExpanded ? '收起' : '查看' }}</span>
            <svg 
              viewBox="0 0 24 24" 
              width="18" 
              height="18" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2.5"
              class="expand-icon"
              :class="{ rotated: isCartExpanded }"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
        
        <!-- 展開狀態：詳細內容 -->
        <transition name="cart-expand">
          <div v-if="isCartExpanded" class="cart-expanded-content">
            <div class="cart-content">
              <div 
                v-for="group in getServicesByCompany" 
                :key="group.companyId"
                class="company-group"
              >
                <div class="company-group-header">
                  <span class="company-icon">🏢</span>
                  <span class="company-group-name">{{ group.companyName }}</span>
                  <span class="service-count">{{ group.count }} 項</span>
                </div>
                <div class="service-chips">
                  <div 
                    v-for="service in group.services" 
                    :key="service.id"
                    class="service-chip"
                  >
                    <span class="chip-number">{{ service.id }}</span>
                    <span class="chip-name">{{ service.name }}</span>
                    <button 
                      class="chip-remove" 
                      @click="toggleServiceItem(group.companyId, service.id)"
                      aria-label="移除"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <button class="confirm-services-btn" @click="confirmServices">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              確認所選服務
            </button>
          </div>
        </transition>
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
            class="overlay-select-service"
            @click="() => { selectService(showDetail); closeDetail(); }"
          >
            {{ selectedServices.has(showDetail.id) ? '已選取服務' : '選擇服務' }}
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

    <Toast />
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

/* 提供的流程項目 */
.provided-services {
  margin-top: 8px;
  margin-bottom: 4px;
}

.service-label {
  font-size: 0.8rem;
  color: #6b6b80;
  font-weight: 500;
  display: block;
  margin-bottom: 6px;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.service-tag {
  padding: 4px 10px;
  background: #f0f0f6;
  color: #6b6b80;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  user-select: none;
}

.service-tag:hover {
  background: #e8e8f0;
  border-color: #9F35FF;
}

.service-tag.selected {
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #ffffff;
  border-color: #9F35FF;
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

.btn-select-service {
  flex: 1;
  padding: 10px;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid #9F35FF;
  background: #fff;
  color: #9F35FF;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  touch-action: manipulation;
}

.btn-select-service.active {
  background: #9F35FF;
  color: #fff;
  border-color: #9F35FF;
}

.btn-select-service:hover {
  background: rgba(159, 53, 255, 0.1);
}

.btn-select-service.active:hover {
  background: #8e2ee6;
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

/* 服務購物列 */
.service-cart {
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 374px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 -8px 32px rgba(159, 53, 255, 0.2), 0 4px 16px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 90;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(159, 53, 255, 0.2);
}

.service-cart.expanded {
  border-radius: 20px;
  box-shadow: 0 -12px 48px rgba(159, 53, 255, 0.3), 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* 購物列（收合狀態） */
.cart-bar {
  padding: 14px 18px;
  background: linear-gradient(135deg, #9F35FF 0%, #b35aff 50%, #c77aff 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.cart-bar:hover {
  background: linear-gradient(135deg, #8e2ee6 0%, #a347e6 50%, #b56ae6 100%);
}

.cart-bar:active {
  transform: scale(0.98);
}

.cart-bar-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.cart-bar-text {
  font-size: 0.95rem;
  font-weight: 500;
}

.cart-bar-text strong {
  font-weight: 800;
  font-size: 1.05rem;
}

.cart-bar-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.expand-text {
  font-size: 0.9rem;
  font-weight: 600;
}

.expand-icon {
  transition: transform 0.3s ease;
}

.expand-icon.rotated {
  transform: rotate(180deg);
}

/* 展開內容 */
.cart-expanded-content {
  background: linear-gradient(to bottom, #fafbff, #ffffff);
}

/* 展開/收合動畫 */
.cart-expand-enter-active,
.cart-expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
  overflow: hidden;
}

.cart-expand-enter-from,
.cart-expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.cart-content {
  overflow-y: auto;
  padding: 16px 16px 12px;
  max-height: 320px;
}

.company-group {
  margin-bottom: 16px;
  background: #ffffff;
  border-radius: 16px;
  padding: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f6;
}

.company-group:last-child {
  margin-bottom: 0;
}

.company-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f5f5f7;
}

.company-icon {
  font-size: 1.1rem;
}

.company-group-name {
  flex: 1;
  font-size: 0.95rem;
  font-weight: 700;
  color: #2b2b3a;
}

.service-count {
  font-size: 0.75rem;
  color: #9F35FF;
  background: rgba(159, 53, 255, 0.1);
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 600;
}

.service-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.service-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #f8f0ff, #faf5ff);
  border: 1.5px solid rgba(159, 53, 255, 0.25);
  border-radius: 20px;
  padding: 6px 10px 6px 8px;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.service-chip:hover {
  border-color: #9F35FF;
  background: linear-gradient(135deg, #f0e5ff, #f5ebff);
  box-shadow: 0 2px 8px rgba(159, 53, 255, 0.15);
}

.chip-number {
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #ffffff;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.chip-name {
  color: #2b2b3a;
  font-weight: 600;
  white-space: nowrap;
}

.chip-remove {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.chip-remove:hover {
  background: #ef4444;
  color: #ffffff;
  transform: scale(1.1);
}

.chip-remove:active {
  transform: scale(0.9);
}

.confirm-services-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #ffffff;
  border: none;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 -4px 12px rgba(159, 53, 255, 0.15);
}

.confirm-services-btn:hover {
  background: linear-gradient(135deg, #8e2ee6, #a347e6);
  box-shadow: 0 -6px 16px rgba(159, 53, 255, 0.3);
}

.confirm-services-btn:active {
  transform: scale(0.98);
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

.overlay-select-service {
  width: 100%;
  padding: 14px;
  min-height: 48px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.2s ease;
  touch-action: manipulation;
  letter-spacing: 0.3px;
}

.overlay-select-service:hover {
  background: linear-gradient(135deg, #8e2ee6, #a347e6);
  box-shadow: 0 4px 12px rgba(159, 53, 255, 0.4);
}

.overlay-select-service:active {
  transform: scale(0.98);
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
