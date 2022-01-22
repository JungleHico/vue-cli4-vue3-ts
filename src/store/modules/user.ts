import { login, getInfo } from '@/api/login'

const user = {
  state: {
    info: null, // 用户基本信息，用户判断是否登录
    roles: [] // 用户权限
  },
  mutations: {
    SET_INFO (state: any, info: any) {
      state.info = info
    },
    SET_ROLES (state: any, roles: Array<string>) {
      state.roles = roles
    }
  },
  actions: {
    // 封装登录接口
    async Login (state: any, loginInfo = {}) {
      try {
        const res = await login(loginInfo)
        const token = res.data.token
        // 缓存 token
        localStorage.setItem('token', `Bearer ${token}`)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 获取用户基本信息，用于判断登录是否过期
    async GetInfo ({ commit }: { commit: any }) {
      try {
        const res = await getInfo()
        const info = res.data
        commit('SET_INFO', info)
        commit('SET_ROLES', info.roles)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 退出登录
    async Logout ({ commit }: { commit: any }) {
      // TODO 退出登录接口（如果需要）
      // 移除 token，清空个人信息
      localStorage.removeItem('token')
      commit('SET_INFO', null)
    }
  }
}

export default user
