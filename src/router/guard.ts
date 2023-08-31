import type { Router } from 'vue-router'

export default (router: Router) => {
  router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
  })
}
