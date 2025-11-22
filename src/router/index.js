// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('@/views/WelcomeView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue'),
  },
  {
    path: '/onboarding/room',
    name: 'OnboardingRoom',
    component: () => import('@/views/Onboarding/RoomSelectionPage.vue'),
  },
  {
    path: '/onboarding/faith',
    name: 'OnboardingFaith',
    component: () => import('@/views/Onboarding/FaithSelectionPage.vue'),
  },
  {
    path: '/onboarding/relationship',
    name: 'OnboardingRelationship',
    component: () => import('@/views/Onboarding/RelationshipPage.vue'),
  },
  {
    path: '/onboarding/basic-info',
    name: 'OnboardingBasicInfo',
    component: () => import('@/views/Onboarding/BasicInfoPage.vue'),
  },
  {
    path: '/family',
    name: 'FamilyDashboard',
    component: () => import('@/views/FamilyDashboard.vue'),
  },
  {
    path: '/provider',
    name: 'ProviderDashboard',
    component: () => import('@/views/ProviderPlaceholder.vue'),
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/ChatPage.vue'),
  },
  {
    path: '/documents',
    name: 'Documents',
    component: () => import('@/views/DocumentPage.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('@/views/CalendarPage.vue'),
  },
  {
    path: '/process',
    name: 'Process',
    component: () => import('@/views/ProcessPage.vue'),
  },
  {
    path: '/quote',
    name: 'Quote',
    component: () => import('@/views/QuotePage.vue'),
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('@/views/PaymentPage.vue'),
  },
  {
    path: '/back',
    name: 'BackPage',
    component: () => import('@/views/BackPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || process.env.BASE_URL || '/'),
  routes,
})

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/register']
  const onboardingPages = ['/onboarding/room', '/onboarding/faith', '/onboarding/relationship', '/onboarding/basic-info']
  const authRequired = !publicPages.includes(to.path) && !onboardingPages.includes(to.path)
  const loggedIn = localStorage.getItem('token')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router