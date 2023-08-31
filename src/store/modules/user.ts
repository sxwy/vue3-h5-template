import { defineStore } from 'pinia'
import { login, getUserInfo, refreshToken } from '@/services'
import type { LoginQuery, Session, User } from '@/types'

export interface UserState {
  session: Session | null
  current: User | null
}

export const useUserStore = defineStore('user', {
  state(): UserState {
    return {
      session: null,
      current: null
    }
  },
  actions: {
    /**
     * 登录初始化
     * @param payload 参数
     */
    async loginInit(payload: LoginQuery) {
      const result = await login(payload)
      this.session = result
    },
    /**
     * 更新会话信息
     */
    async updateSession() {
      const result = await refreshToken()
      this.session = result
    },
    /**
     * 获取用户信息
     */
    async userInit() {
      const result = await getUserInfo()
      this.current = result
    },
    /**
     * 退出登录
     */
    logout() {
      this.session = null
      this.current = null
    }
  }
})
