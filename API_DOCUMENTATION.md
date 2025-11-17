# AnGo 安行 - API 接口文檔

## 目錄
- [1. 用戶與認證](#1-用戶與認證)
- [2. 首頁儀表板](#2-首頁儀表板)
- [3. 文件管理](#3-文件管理)
- [4. 報價管理](#4-報價管理)
- [5. 金流追蹤](#5-金流追蹤)
- [6. 聊天對話](#6-聊天對話)

---

## 基礎資訊

### Base URL
```
https://api.ango.com/v1
```

### 認證方式
所有 API 請求需在 Header 中帶上 JWT Token：
```
Authorization: Bearer {token}
```

### 通用錯誤響應
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "錯誤訊息"
  }
}
```

---

## 1. 用戶與認證

### 1.1 用戶登入
**POST** `/auth/login`

#### Request Body
```json
{
  "phone": "0912345678",
  "password": "user_password"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "馬阿姨",
      "phone": "0912345678",
      "email": "user@example.com"
    }
  }
}
```

### 1.2 獲取用戶資訊
**GET** `/auth/me`

#### Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "馬阿姨",
    "phone": "0912345678",
    "email": "user@example.com",
    "createdAt": "2025-01-15T08:30:00Z"
  }
}
```

---

## 2. 首頁儀表板

### 2.1 獲取儀表板資訊
**GET** `/dashboard`

#### Response
```json
{
  "success": true,
  "data": {
    "user": {
      "name": "馬阿姨"
    },
    "progress": {
      "percentage": 68,
      "currentStage": "法事準備",
      "currentTask": "確認誦經與法事日期",
      "remainingTasks": 2
    },
    "calendar": {
      "events": [
        {
          "id": 1,
          "date": "2025-11-20",
          "title": "誦經法事",
          "time": "14:00"
        }
      ]
    },
    "pendingDocuments": 3,
    "notifications": [
      {
        "id": 1,
        "type": "document",
        "message": "您有 2 份文件待補件",
        "createdAt": "2025-11-17T10:00:00Z"
      }
    ]
  }
}
```

### 2.2 獲取日曆事件
**GET** `/dashboard/calendar?year=2025&month=11`

#### Response
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": 1,
        "date": "2025-11-20",
        "title": "誦經法事",
        "time": "14:00",
        "location": "板橋靈糧堂",
        "type": "ceremony"
      },
      {
        "id": 2,
        "date": "2025-11-25",
        "title": "文件截止日",
        "time": "23:59",
        "type": "deadline"
      }
    ]
  }
}
```

---

## 3. 文件管理

### 3.1 獲取文件列表
**GET** `/documents?status={status}`

#### Query Parameters
- `status` (可選): `全部` | `已審核` | `待補件` | `尚未上傳`

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "死亡證明書",
      "status": "尚未上傳",
      "category": "必要文件",
      "deadline": "2025-11-25",
      "createdAt": "2025-11-10T08:00:00Z"
    },
    {
      "id": 3,
      "name": "戶籍謄本",
      "status": "已審核",
      "category": "必要文件",
      "uploadDate": "2025-11-10",
      "approveDate": "2025-11-14",
      "fileUrl": "https://storage.ango.com/docs/3.pdf"
    },
    {
      "id": 6,
      "name": "火化許可證",
      "status": "待補件",
      "category": "火化相關",
      "uploadDate": "2025-11-10",
      "rejectReason": "文件模糊，請重新上傳清晰版本",
      "fileUrl": "https://storage.ango.com/docs/6.pdf"
    }
  ]
}
```

### 3.2 上傳文件
**POST** `/documents/upload`

#### Request (multipart/form-data)
```
documentId: 1
file: <binary>
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "死亡證明書",
    "status": "審核中",
    "uploadDate": "2025-11-17",
    "fileUrl": "https://storage.ango.com/docs/1.pdf"
  }
}
```

### 3.3 查看文件詳情
**GET** `/documents/{id}`

#### Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "死亡證明書",
    "status": "已審核",
    "category": "必要文件",
    "uploadDate": "2025-11-10",
    "approveDate": "2025-11-14",
    "fileUrl": "https://storage.ango.com/docs/1.pdf",
    "history": [
      {
        "action": "upload",
        "timestamp": "2025-11-10T09:30:00Z",
        "message": "文件已上傳"
      },
      {
        "action": "approve",
        "timestamp": "2025-11-14T14:20:00Z",
        "message": "審核通過"
      }
    ]
  }
}
```

---

## 4. 報價管理

### 4.1 獲取報價列表
**GET** `/quotes?religion={religion}&sort={sort}`

#### Query Parameters
- `religion` (可選): `佛教` | `道教` | `無宗教/通用`
- `sort` (可選): `price_asc` | `price_desc` | `rating_desc`

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "companyName": "永恆禮儀",
      "rating": 4.8,
      "reviewCount": 156,
      "price": 28500,
      "religion": "佛教",
      "features": ["24h支援", "接送服務"],
      "description": "永恆禮儀提供24小時客服，專業法事協調，含接送及場地佈置。",
      "contactPhone": "02-1234-5678",
      "address": "台北市中正區某路123號"
    },
    {
      "id": 2,
      "companyName": "安和殯葬",
      "rating": 4.5,
      "reviewCount": 98,
      "price": 22000,
      "religion": "道教",
      "features": ["代辦文件", "佛事協調"],
      "description": "安和殯葬擅長代辦公家機關文件，並提供道教法事協調服務。",
      "contactPhone": "02-2345-6789",
      "address": "新北市板橋區某路456號"
    }
  ]
}
```

### 4.2 獲取單一報價詳情
**GET** `/quotes/{id}`

#### Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "companyName": "永恆禮儀",
    "rating": 4.8,
    "reviewCount": 156,
    "price": 28500,
    "religion": "佛教",
    "features": ["24h支援", "接送服務"],
    "description": "永恆禮儀提供24小時客服，專業法事協調，含接送及場地佈置。",
    "contactPhone": "02-1234-5678",
    "address": "台北市中正區某路123號",
    "services": [
      {
        "name": "場地租借",
        "description": "包含3日靈堂場地",
        "price": 8000
      },
      {
        "name": "法事協調",
        "description": "協調師父與誦經儀式",
        "price": 12000
      }
    ],
    "images": [
      "https://storage.ango.com/companies/1/img1.jpg",
      "https://storage.ango.com/companies/1/img2.jpg"
    ],
    "reviews": [
      {
        "id": 1,
        "userName": "王先生",
        "rating": 5,
        "comment": "服務很專業，態度親切",
        "createdAt": "2025-10-15T10:00:00Z"
      }
    ]
  }
}
```

### 4.3 委託廠商
**POST** `/quotes/{id}/commission`

#### Request Body
```json
{
  "serviceDate": "2025-11-25",
  "notes": "希望下午時段",
  "contactPreference": "phone"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "commissionId": 123,
    "companyId": 1,
    "companyName": "永恆禮儀",
    "status": "pending",
    "serviceDate": "2025-11-25",
    "createdAt": "2025-11-17T15:30:00Z"
  }
}
```

---

## 5. 金流追蹤

### 5.1 獲取金流進度
**GET** `/payment/status`

#### Response
```json
{
  "success": true,
  "data": {
    "commissionId": 123,
    "totalAmount": 28500,
    "stages": [
      {
        "id": 1,
        "name": "委託成立",
        "status": "completed",
        "completedAt": "2025-11-10T10:00:00Z"
      },
      {
        "id": 2,
        "name": "款項託管中",
        "status": "completed",
        "completedAt": "2025-11-10T14:30:00Z",
        "amount": 28500
      },
      {
        "id": 3,
        "name": "業者已接單",
        "status": "completed",
        "completedAt": "2025-11-11T09:00:00Z"
      },
      {
        "id": 4,
        "name": "服務進行中",
        "status": "current",
        "estimatedCompletion": "2025-11-25"
      },
      {
        "id": 5,
        "name": "服務驗收完成",
        "status": "pending"
      },
      {
        "id": 6,
        "name": "撥款完成",
        "status": "pending"
      }
    ],
    "transactions": [
      {
        "id": 1,
        "type": "deposit",
        "amount": 28500,
        "description": "託管款項",
        "timestamp": "2025-11-10T14:30:00Z"
      }
    ]
  }
}
```

### 5.2 獲取交易歷史
**GET** `/payment/transactions`

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "deposit",
      "amount": 28500,
      "description": "託管款項",
      "status": "completed",
      "timestamp": "2025-11-10T14:30:00Z",
      "method": "credit_card",
      "last4": "1234"
    }
  ]
}
```

---

## 6. 聊天對話

### 6.1 獲取聊天記錄
**GET** `/chat/messages?limit=50&before={messageId}`

#### Query Parameters
- `limit` (可選): 預設 50，最大 100
- `before` (可選): 獲取指定訊息 ID 之前的訊息

#### Response
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": 1,
        "type": "bot",
        "content": "您好！我是安行助理",
        "timestamp": "2025-11-17T10:00:00Z"
      },
      {
        "id": 2,
        "type": "user",
        "content": "查看文件進度",
        "timestamp": "2025-11-17T10:05:00Z"
      },
      {
        "id": 3,
        "type": "bot",
        "content": "您目前有 3 份文件尚未上傳，2 份待補件，5 份已審核通過。",
        "timestamp": "2025-11-17T10:05:05Z",
        "metadata": {
          "type": "document_status",
          "data": {
            "pending": 3,
            "rejected": 2,
            "approved": 5
          }
        }
      }
    ],
    "hasMore": false
  }
}
```

### 6.2 發送訊息
**POST** `/chat/messages`

#### Request Body
```json
{
  "content": "查看金流",
  "type": "text"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "userMessage": {
      "id": 4,
      "type": "user",
      "content": "查看金流",
      "timestamp": "2025-11-17T10:10:00Z"
    },
    "botReply": {
      "id": 5,
      "type": "bot",
      "content": "您的委託目前在「服務進行中」階段，款項已託管，預計 11/25 完成驗收。",
      "timestamp": "2025-11-17T10:10:03Z",
      "metadata": {
        "type": "payment_status",
        "data": {
          "currentStage": "服務進行中",
          "estimatedCompletion": "2025-11-25"
        }
      }
    }
  }
}
```

### 6.3 快速查詢
**POST** `/chat/quick-query`

#### Request Body
```json
{
  "query": "document_status" // 或 "payment_status"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "type": "document_status",
    "summary": "您目前有 3 份文件尚未上傳，2 份待補件，5 份已審核通過。",
    "details": {
      "pending": 3,
      "rejected": 2,
      "approved": 5,
      "total": 10
    }
  }
}
```

---

## 附錄

### 資料模型

#### Document Status 枚舉
- `尚未上傳`
- `審核中`
- `已審核`
- `待補件`

#### Payment Stage Status 枚舉
- `pending`: 待開始
- `current`: 進行中
- `completed`: 已完成

#### Message Type 枚舉
- `user`: 用戶訊息
- `bot`: 機器人回覆
- `system`: 系統通知

### 前端需要的環境變數

建議在 `.env` 檔案中設定：

```bash
# API Base URL
VITE_API_BASE_URL=https://api.ango.com/v1

# Storage URL
VITE_STORAGE_URL=https://storage.ango.com

# WebSocket URL (如需即時聊天)
VITE_WS_URL=wss://ws.ango.com
```

### 建議的前端 API 調用架構

```javascript
// src/api/client.js
import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default client
```

### 錯誤處理建議

前端應處理以下常見錯誤碼：

- `401 UNAUTHORIZED`: Token 過期或無效 → 導向登入頁
- `403 FORBIDDEN`: 權限不足
- `404 NOT_FOUND`: 資源不存在
- `422 VALIDATION_ERROR`: 資料驗證失敗
- `500 INTERNAL_SERVER_ERROR`: 伺服器錯誤

---

## 變更日誌

### v1.0.0 (2025-11-17)
- 初版 API 文檔
- 包含所有主要功能的接口定義
