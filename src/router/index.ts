import { createRouter, createWebHashHistory } from 'vue-router'
import { BASE_SITE } from '@/constants'
import guard from './guard'
import { basicsRoutes, exceptionRoutes, demoRoutes } from './modules'

const routes = [demoRoutes, exceptionRoutes, ...basicsRoutes]

const router = createRouter({
  history: createWebHashHistory(BASE_SITE),
  routes
})

guard(router)

export default router
