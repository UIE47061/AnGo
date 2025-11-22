import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://win.acthub.pro',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
client.interceptors.response.use(
  (response) => {
    // Return the data property directly if the backend wraps everything in { success: true, data: ... }
    // Based on API docs, responses are { success: true, data: ... }
    // We can return response.data to get the full object, or response.data.data to get just the payload.
    // Let's return response.data for now to allow checking success flag.
    return response.data
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized (e.g., redirect to login)
          console.error('Unauthorized, please login again.')
          // window.location.href = '/login' // Optional: redirect
          break
        case 403:
          console.error('Forbidden access.')
          break
        case 404:
          console.error('Resource not found.')
          break
        case 500:
          console.error('Internal server error.')
          break
        default:
          console.error('An error occurred.')
      }
    }
    return Promise.reject(error)
  }
)

export default client
