import { type RouteRecordRaw, RouterView } from 'vue-router'

/** 示例相关页面 */
export default {
  path: '/demo',
  component: RouterView,
  children: [
    {
      // 示例首页
      path: 'index',
      meta: { title: '首页' },
      component: () => import('@/pages/demo/index.vue')
    },
    {
      // 示例结果页
      path: 'result',
      meta: { title: '结果页' },
      component: () => import('@/pages/demo/result.vue')
    }
  ]
} as RouteRecordRaw
