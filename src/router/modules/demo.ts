import { type RouteRecordRaw } from 'vue-router'

/** 示例相关页面 */
export default {
  name: 'Demo',
  path: '/demo',
  redirect: '/demo/index',
  children: [
    // 示例首页
    {
      name: 'DemoIndex',
      path: 'index',
      meta: { title: '首页' },
      component: () => import('@/pages/demo/index.vue')
    },
    // 示例结果页
    {
      name: 'DemoResult',
      path: 'result',
      meta: { title: '结果页' },
      component: () => import('@/pages/demo/result.vue')
    }
  ]
} as RouteRecordRaw
