<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/api/auth'

const router = useRouter()
const name = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  if (!name.value || !phone.value || !password.value || !confirmPassword.value) {
    errorMessage.value = '請填寫所有欄位'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = '兩次密碼輸入不一致'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const res = await authApi.register({
      name: name.value,
      phone: phone.value,
      password: password.value
    })

    // Save token and user info (Auto login)
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    localStorage.setItem('familyId', res.user.familyId)

    // Redirect to onboarding
    router.push('/onboarding/room')
  } catch (error) {
    console.error(error)
    errorMessage.value = error.response?.data?.message || '註冊失敗，請稍後再試'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="register-container">
    <div class="content">
      <div class="header">
        <h1 class="title-zh">註冊安行</h1>
        <p class="subtitle">建立您的帳號以開始使用服務</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="name">姓名</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="請輸入真實姓名"
            required
          />
        </div>

        <div class="form-group">
          <label for="phone">手機號碼</label>
          <input
            id="phone"
            v-model="phone"
            type="tel"
            placeholder="0912345678"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">密碼</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="請設定密碼"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">確認密碼</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="請再次輸入密碼"
            required
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? '註冊中...' : '註冊' }}
        </button>
      </form>
      
      <div class="footer-links">
        <span>已有帳號？</span>
        <button class="link-btn" @click="router.push('/login')">立即登入</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  min-height: 100vh;
  width: 100vw;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.content {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title-zh {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
}

input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #9F35FF;
}

.submit-btn {
  background: #9F35FF;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
  margin-top: 0.5rem;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #ff4d4f;
  font-size: 0.9rem;
  text-align: center;
}

.footer-links {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}

.link-btn {
  background: none;
  border: none;
  color: #9F35FF;
  font-weight: 600;
  cursor: pointer;
  padding: 0 0.3rem;
}
</style>
