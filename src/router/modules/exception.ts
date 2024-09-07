import type { RouteRecordRaw } from 'vue-router'

/** 异常相关路由 */
export default {
  name: 'Exception',
  path: '/exception',
  redirect: '/exception/not-found',
  children: [
    {
      name: 'ExceptionNotFound',
      path: 'not-found',
      component: () => import('@/pages/exception/not-found.vue'),
      meta: {
        title: '404'
      }
    }
  ]
} as RouteRecordRaw
