<!-- src/views/ProviderPlaceholder.vue -->
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.push('/')
</script>

<template>
  <div class="page">
    <h2>業者端入口（開發中）</h2>
    <p>之後可以在這裡放業者端流程、訂單管理等等。</p>
    <button @click="goBack">回到主畫面</button>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  background: #f5f5f7;
  text-align: center;
}

button {
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  background: #5c3fe1;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>