# AnGo Vue 專案 - 快速參考

## 🚀 啟動專案

```bash
npm run dev
```

訪問: **http://localhost:5173/AnGo/**

## 📋 專案結構速查

### 組件位置
```
src/
├── components/
│   ├── BottomNav.vue         # 底部導航（含聊天按鈕）
│   └── ProgressCircle.vue    # 水晶球動畫
│
└── views/
    ├── WelcomeView.vue       # 首頁（家屬端/業者端選擇）
    ├── FamilyDashboard.vue   # 家屬端儀表板 ⭐
    ├── ChatPage.vue          # 對話頁面
    ├── DocumentPage.vue      # 文件管理
    ├── QuotePage.vue         # 報價列表
    └── PaymentPage.vue       # 金流追蹤
```

## 🔗 路由映射

| 路徑 | 組件 | 功能 |
|------|------|------|
| `/` | WelcomeView | 選擇入口 |
| `/family` | FamilyDashboard | 儀表板主頁 ⭐ |
| `/chat` | ChatPage | 即時對話 |
| `/documents` | DocumentPage | 文件管理 |
| `/quote` | QuotePage | 報價與委託 |
| `/payment` | PaymentPage | 金流追蹤 |

## 🎯 導航流程

```
首頁 (/)
  └─ 點擊「家屬端入口」
      └─ 家屬儀表板 (/family)
          ├─ 點擊聊天按鈕 → 對話頁 (/chat)
          ├─ 點擊底部「文件」→ 文件頁 (/documents)
          ├─ 點擊「報價與委託」→ 報價頁 (/quote)
          └─ 點擊「金流追蹤」→ 金流頁 (/payment)
```

## 💡 常用命令

```bash
# 開發
npm run dev          # 啟動開發服務器

# 建置
npm run build        # 生產建置

# 預覽
npm run preview      # 預覽建置結果

# 檢查
npm run lint         # 代碼檢查（如果有配置）
```

## 🔧 修改建議

### 修改首頁文字
📁 `src/views/WelcomeView.vue`
```vue
<h1 class="title-en">AnGo</h1>
<h1 class="title-zh">安行</h1>
<p class="subtitle">新竹市政府</p>
```

### 修改進度百分比
📁 `src/views/FamilyDashboard.vue`
```vue
<ProgressCircle :percentage="68" />  <!-- 改這裡 -->
```

### 修改公司列表
📁 `src/views/QuotePage.vue`
```javascript
const companies = ref([
  { id: 1, name: '永恆禮儀', rating: 4.8, ... },
  // 在這裡新增更多公司
])
```

### 修改文件分類
📁 `src/views/DocumentPage.vue`
```javascript
const tabs = ['待上傳', '審核中', '已通過', '需補件']
```

### 修改金流階段
📁 `src/views/PaymentPage.vue`
```javascript
const stages = [
  { name: '委託成立', status: 'completed' },
  // 在這裡修改階段
]
```

## 🎨 主題顏色

```css
主色調: #4f3ddf (紫色)
次色調: #3b2bb8 (深紫)
背景色: #f5f5f7 (淺灰)
卡片白: #ffffff
文字主: #2b2b3a
文字次: #6b6b80
```

## 📱 設計規格

- **畫布尺寸**: 414px × 896px
- **圓角**: 8px - 26px
- **間距**: 0.4rem - 1.8rem
- **陰影**: 0 8px 18px rgba(...)
- **字體**: PingFang TC, Microsoft JhengHei

## ⚠️ 注意事項

1. **路由基礎路徑**: 已設定為 `/AnGo/`（用於 GitHub Pages）
2. **組件導入**: 使用 `@/` 別名代表 `src/` 目錄
3. **樣式作用域**: 所有組件使用 `scoped` 避免衝突
4. **懶加載**: 路由組件使用動態導入優化性能

## 🔍 常見問題

### Q: 如何新增頁面？
1. 在 `src/views/` 創建新組件
2. 在 `src/router/index.js` 添加路由
3. 在需要的地方使用 `router.push()` 導航

### Q: 如何修改底部導航？
編輯 `src/components/BottomNav.vue`

### Q: 水晶球動畫不流暢？
檢查 `ProgressCircle.vue` 的 `ANIMATION_SPEED` 設定

### Q: 部署到 GitHub Pages？
```bash
npm run build
# 將 dist/ 推送到 gh-pages 分支
```

## 📚 更多資訊

- 詳細結構: `VUE_STRUCTURE.md`
- 轉換總結: `CONVERSION_SUMMARY.md`
- Vue 文檔: https://vuejs.org/
- Vue Router: https://router.vuejs.org/

---

**需要幫助？** 檢查控制台錯誤訊息或查看組件內的註釋
