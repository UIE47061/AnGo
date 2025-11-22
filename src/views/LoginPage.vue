<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/api/auth'

const router = useRouter()
const phone = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!phone.value || !password.value) {
    errorMessage.value = '請輸入手機號碼與密碼'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const res = await authApi.login({
      phone: phone.value,
      password: password.value
    })

    // Save token and user info
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    
    if (res.user.roomId) {
      localStorage.setItem('roomId', res.user.roomId)
    }

    // Check if user has a room
    if (res.user.roomId) {
      // Has room - go to dashboard
      if (res.user.role === 'family_member') {
        router.push('/family')
      } else {
        router.push('/provider')
      }
    } else {
      // No room - go to room selection
      router.push('/onboarding/room')
    }
  } catch (error) {
    console.error(error)
    errorMessage.value = error.response?.data?.message || '登入失敗，請檢查帳號密碼'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="content">
      <div class="header">
        <h1 class="title-zh">登入安行</h1>
        <p class="subtitle">請輸入您的手機號碼與密碼</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
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
            placeholder="請輸入密碼"
            required
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? '登入中...' : '登入' }}
        </button>
      </form>
      
      <div class="footer-links">
        <span>還沒有帳號？</span>
        <button class="link-btn" @click="router.push('/register')">立即註冊</button>
      </div>
      
      <button class="back-btn" @click="router.push('/')">返回首頁</button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
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

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  margin-top: 1rem;
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

.back-btn {
  background: none;
  border: none;
  color: #666;
  margin-top: 1rem;
  cursor: pointer;
  width: 100%;
}
</style>
