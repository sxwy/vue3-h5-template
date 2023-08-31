import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { STORE_CACHE_KEY } from '@/constants'
export * from './modules'

const store = createPinia()

store.use(
  createPersistedState({
    auto: true,
    key: (id) => `${STORE_CACHE_KEY}_${id}`,
    storage: sessionStorage
  })
)

export default store
