import type { RouteRecordRaw } from 'vue-router'

/** 异常相关路由 */
export default {
  name: 'Exception',
  path: '/exception',
  redirect: '/exception/not-found/index',
  meta: {
    title: '异常页'
  },
  children: [
    {
      name: 'ExceptionNotFoundIndex',
      path: 'not-found/index',
      component: () => import('@/pages/exception/not-found/index.vue'),
      meta: {
        title: '404'
      }
    }
  ]
} as RouteRecordRaw
