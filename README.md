# AnGo 安行 - Vue 3 項目結構說明

## 📁 項目結構

```
src/
├── components/          # 共用組件
│   ├── BottomNav.vue   # 底部導航欄組件
│   └── ProgressCircle.vue  # 進度水晶球組件
│
├── views/              # 頁面組件
│   ├── WelcomeView.vue        # 歡迎頁（首頁）
│   ├── FamilyDashboard.vue    # 家屬端儀表板
│   ├── ChatPage.vue           # 對話頁面
│   ├── DocumentPage.vue       # 文件管理頁面
│   ├── QuotePage.vue          # 報價列表頁面
│   ├── PaymentPage.vue        # 金流追蹤頁面
│   └── ProviderPlaceholder.vue # 業者端佔位頁面
│
├── router/
│   └── index.js        # 路由配置
│
├── App.vue             # 根組件
└── main.js             # 入口文件
```

## 🛣️ 路由說明

| 路徑 | 名稱 | 組件 | 說明 |
|------|------|------|------|
| `/` | Welcome | WelcomeView.vue | 歡迎頁面，提供家屬端/業者端入口 |
| `/family` | FamilyDashboard | FamilyDashboard.vue | 家屬端主頁面 |
| `/chat` | Chat | ChatPage.vue | 即時對話頁面 |
| `/documents` | Documents | DocumentPage.vue | 文件管理頁面 |
| `/quote` | Quote | QuotePage.vue | 報價與委託列表 |
| `/payment` | Payment | PaymentPage.vue | 金流追蹤頁面 |
| `/provider` | ProviderDashboard | ProviderPlaceholder.vue | 業者端頁面 |

## 🧩 組件說明

### BottomNav.vue
底部導航欄組件，包含：
- 聊天按鈕（浮動按鈕）
- 導航欄（首頁、文件）
- 自動高亮當前頁面

使用方式：
```vue
<BottomNav />
```

### ProgressCircle.vue
進度水晶球組件，包含動態液體動畫效果

使用方式：
```vue
<ProgressCircle :percentage="68" />
```

Props:
- `percentage` (Number): 進度百分比 (0-100)

## 🎨 功能特色

### 1. 家屬端儀表板 (FamilyDashboard.vue)
- ✅ 進度卡片（含水晶球動畫）
- ✅ 氣泡提示
- ✅ 報價與委託按鈕
- ✅ 金流追蹤按鈕
- ✅ 文件上傳區域
- ✅ 行事曆組件

### 2. 對話頁面 (ChatPage.vue)
- ✅ 即時訊息顯示
- ✅ 用戶/助理訊息區分
- ✅ 快速操作按鈕
- ✅ 訊息輸入框

### 3. 文件管理 (DocumentPage.vue)
- ✅ 多標籤分類（待上傳、審核中、已通過、需補件）
- ✅ 文件狀態顯示
- ✅ 上傳/查看功能
- ✅ 底部導航整合

### 4. 報價列表 (QuotePage.vue)
- ✅ 公司卡片展示
- ✅ 加入比較功能
- ✅ 查看明細彈窗
- ✅ 比較列表彈窗
- ✅ 聯絡廠商功能

### 5. 金流追蹤 (PaymentPage.vue)
- ✅ 階段式進度顯示
- ✅ 狀態指示器（已完成/進行中/待開始）
- ✅ 清晰的視覺回饋

## 🚀 開發指令

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 建置生產版本
npm run build

# 預覽生產建置
npm run preview
```

## 📱 響應式設計

所有頁面都採用 414x896px 的手機尺寸設計，並使用：
- 圓角設計 (border-radius)
- 陰影效果 (box-shadow)
- 漸層背景 (gradient)
- 平滑過渡動畫 (transition)

## 🎯 下一步開發建議

1. **API 整合**: 將靜態數據替換為 API 調用
2. **狀態管理**: 考慮加入 Pinia 進行全局狀態管理
3. **表單驗證**: 在上傳和輸入表單中加入驗證
4. **通知系統**: 加入 toast 通知組件
5. **載入狀態**: 加入 loading 和 skeleton 效果
6. **錯誤處理**: 完善錯誤處理機制
7. **單元測試**: 為關鍵組件編寫測試
8. **無障礙優化**: 加強 ARIA 標籤和鍵盤導航

## 📝 原始檔案對應

| 原始檔案 | 轉換後的 Vue 組件 |
|---------|------------------|
| index.html | FamilyDashboard.vue |
| styles.css | 分散到各組件的 scoped style |
| app.js | 轉換為 Vue 響應式邏輯和方法 |

所有原始的 JavaScript 邏輯都已轉換為 Vue 3 Composition API（script setup）的響應式寫法。
