const allDocuments = ([
  // 1. 驗屍檢驗
  { id: 1, name: '逗者身分證', status: '已審核', approveDate: '2025/11/15', uploadDate: '2025/11/12', category: '1. 驗屍檢驗', processId: 1 },
  { id: 2, name: '健保卡', status: '已審核', approveDate: '2025/11/14', uploadDate: '2025/11/10', category: '1. 驗屍檢驗', processId: 1 },
  { id: 3, name: '家屬身分證', status: '已審核', approveDate: '2025/11/16', uploadDate: '2025/11/13', category: '1. 驗屍檢驗', processId: 1 },
  { id: 4, name: '死亡診斷書', status: '已審核', approveDate: '2025/11/13', uploadDate: '2025/11/09', category: '1. 驗屍檢驗', processId: 1 },
  
  // 2. 遗體接運
  { id: 5, name: '死亡證明', status: '已審核', approveDate: '2025/11/14', uploadDate: '2025/11/10', category: '2. 遗體接運', processId: 2 },
  { id: 6, name: '殡葬設施使用申請表', status: '已審核', approveDate: '2025/11/15', uploadDate: '2025/11/11', category: '2. 遗體接運', processId: 2 },
  
  // 3. 入館安置
  { id: 7, name: '冷凍室使用紀錄', status: '已審核', approveDate: '2025/11/16', uploadDate: '2025/11/12', category: '3. 入館安置', processId: 3 },
  { id: 8, name: '入斂申請表', status: '已審核', approveDate: '2025/11/17', uploadDate: '2025/11/13', category: '3. 入館安置', processId: 3 },
  { id: 9, name: '靈堂使用申請表', status: '待補件', uploadDate: '2025/11/14', rejectReason: '缺少簽章', category: '3. 入館安置', processId: 3 },
  
  // 4. 禮儀安排
  { id: 10, name: '遗照照片', status: '已審核', approveDate: '2025/11/18', uploadDate: '2025/11/15', category: '4. 禮儀安排', processId: 4 },
  { id: 11, name: '委託書', status: '已審核', approveDate: '2025/11/19', uploadDate: '2025/11/16', category: '4. 禮儀安排', processId: 4 },
  
  // 5. 許可申請
  { id: 12, name: '火化申請表', status: '尚未上傳', deadline: '2025/11/25', category: '5. 許可申請', processId: 5 },
  { id: 13, name: '印章', status: '已審核', approveDate: '2025/11/17', uploadDate: '2025/11/14', category: '5. 許可申請', processId: 5 },
  
  // 6. 安葬作業
  { id: 14, name: '火化許可證', status: '待補件', uploadDate: '2025/11/10', rejectReason: '文件模糊，請重新上傳清晰版本', category: '6. 安葬作業', processId: 6 },
  { id: 15, name: '骨灰（骼）存放申請書', status: '尚未上傳', deadline: '2025/11/26', category: '6. 安葬作業', processId: 6 },
  { id: 16, name: '土地使用同意書', status: '已審核', approveDate: '2025/11/12', uploadDate: '2025/11/08', category: '6. 安葬作業', processId: 6 },
  
  // 7. 後續處理
  { id: 17, name: '戶口名簿', status: '尚未上傳', deadline: '2025/11/30', category: '7. 後續處理', processId: 7 },
  { id: 18, name: '保單', status: '已審核', approveDate: '2025/11/18', uploadDate: '2025/11/15', category: '7. 後續處理', processId: 7 },
  { id: 19, name: '財產清冊', status: '尚未上傳', deadline: '2025/12/15', category: '7. 後續處理', processId: 7 },
  { id: 20, name: '家庭戶籍謄本', status: '尚未上傳', deadline: '2025/12/10', category: '7. 後續處理', processId: 7 }
])