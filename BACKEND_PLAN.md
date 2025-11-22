# Express + TypeScript + Supabase 後端藍圖

## 前端需求分析
- 家屬儀表板需要取用流程進度、任務提示與金流/報價捷徑（`src/views/FamilyDashboard.vue:17` 起），代表後端至少要提供「流程階段」「任務清單」「提醒事件」等資料。
- 文件管理頁面目前使用靜態陣列（`src/views/DocumentPage.vue:5-124`），需改為依家屬案件查詢文件、上傳紀錄、審核狀態、退件原因，並提供重新上傳 API。
- 報價列表頁面顯示業者資訊、評價與比較功能（`src/views/QuotePage.vue:7-193`），後端應能依宗教/價格等條件篩選、送出委託以及紀錄比較清單。
- 金流追蹤頁面的流程節點（`src/views/PaymentPage.vue:6-69`）需由後端維護，並允許業者或系統更新階段。
- 聊天頁面（`src/views/ChatPage.vue:1-78`）預期會與客服或 Bot 互動，可透過 Supabase Realtime 儲存訊息並推播。

## 系統與資料流架構
1. **Express + TypeScript**：採分層結構（`src/server.ts` 啟動 -> `modules/*` 包含 controller/service/repository）。使用 `ts-node-dev` 或 `tsx` 執行，`zod` 驗證請求。
2. **Supabase Postgres**：資料表與認證同時托管，Row Level Security 以 `family_id`、`provider_id` 控制存取。使用 Supabase JS client（Server Key）在 repository 層呼叫 RPC 或 SQL。
3. **檔案儲存**：文件上傳透過 Supabase Storage bucket（`documents/{familyId}/{uuid}.pdf`），表格只存 metadata 與檔案 URL。
4. **Realtime / Webhook**：聊天訊息與金流階段可透過 Supabase Realtime Channel 或 Edge Functions 觸發通知；Express 只需提供 REST fallback。

## 資料模型（建議資料表）
| Table | 主要欄位 | 用途 |
| --- | --- | --- |
| `families` | `id`, `display_name`, `case_status`, `progress_percent` | 儀表板基本資料 |
| `tasks` | `id`, `family_id`, `title`, `due_date`, `status` | 儀表板任務與提醒 |
| `documents` | `id`, `family_id`, `category`, `name`, `status`, `deadline`, `upload_url`, `reviewed_at`, `reject_reason` | 文件管理清單與審核狀態 |
| `quotes` | `id`, `provider_id`, `religion`, `base_price`, `features`, `rating` | 報價列表資料 |
| `quote_requests` | `id`, `family_id`, `quote_id`, `status`, `notes` | 家屬加入比較或送出委託 |
| `payment_stages` | `id`, `family_id`, `stage_key`, `stage_label`, `status`, `position` | 金流流程節點 |
| `messages` | `id`, `family_id`, `sender_type`, `content`, `created_at` | 聊天紀錄 |

## API 設計重點
- `GET /api/families/:id/dashboard`：聚合儀表板資料（progress、tasks、next_deadline、payment_stage）。
- `GET /api/families/:id/documents` / `POST /api/families/:id/documents`：查詢與上傳文件；上傳流程為先向 Supabase Storage 取得 `signedUrl`，再將 metadata 存入 `documents` 表。
- `PATCH /api/documents/:id/review`：業者/公務員更新審核狀態、退件原因。
- `GET /api/quotes?religion=&priceRange=`：支援前端篩選；`POST /api/quote-requests` 用於加入比較或建立委託。
- `GET /api/families/:id/payment-stages` / `PATCH /api/payment-stages/:id`：供金流頁面與管理者更新階段。
- `GET /api/families/:id/messages`、`POST /api/families/:id/messages`：拉取歷史訊息與送出新訊息；搭配 Supabase Channel 推送。

## 開發與部署流程
1. 建立 `packages/server`（或根目錄 `server/`）並初始化 `tsconfig.json`、`esbuild`/`tsup` 打包設定。
2. 建立共用 `env.ts` 讀取 `SUPABASE_URL`、`SUPABASE_SERVICE_ROLE_KEY`、`JWT_SECRET` 等變數，並在 Express middleware 實作身份驗證（可先使用 Supabase Auth JWT）。
3. 每個模組撰寫 `router` + `controller` + `service` + `repository`，service 負責業務邏輯，repository 專注 Supabase 查詢，並用 `zod` 或 `class-validator` 保護輸入輸出。
4. 透過 Supabase CLI 管理 migration（`supabase/migrations/*.sql`），將 schema 與種子（來自目前前端假資料）同步。
5. 在本地以 `npm run dev:server` 執行（`tsx src/server.ts`），透過 Vite proxy (`/api -> http://localhost:4000`) 讓前端直接調用。
6. 部署時可使用 Supabase 自帶 Edge Functions 處理高時效事件（如聊天通知），Express 服務則部署到 Fly.io 或 Render，並以 Supabase 服務帳戶存取資料。
