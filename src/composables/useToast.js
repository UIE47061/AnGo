import { ref } from 'vue'

const toastMessage = ref('')
const showToast = ref(false)

export function useToast() {
  const displayToast = (message, duration = 1000) => {
    toastMessage.value = message
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, duration)
  }

  return {
    toastMessage,
    showToast,
    displayToast
  }
}
