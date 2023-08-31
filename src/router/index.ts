import { createRouter, createWebHistory } from 'vue-router'
import { BASE_SITE } from '@/constants'
import guard from './guard'
import { demoRoutes } from './modules'

const routes = [demoRoutes]

const router = createRouter({
  history: createWebHistory(BASE_SITE),
  routes
})

guard(router)

export default router
