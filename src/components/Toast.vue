<script setup>
import { useToast } from '@/composables/useToast'

const { toastMessage, showToast } = useToast()
</script>

<template>
  <transition name="toast-fade">
    <div v-if="showToast" class="toast">
      {{ toastMessage }}
    </div>
  </transition>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  background: linear-gradient(135deg, #9F35FF, #b35aff);
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 8px 24px rgba(159, 53, 255, 0.4);
  z-index: 2000;
  text-align: center;
  min-width: 200px;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}
</style>
