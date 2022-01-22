import { constantRouterMap, asyncRouterMap } from '@/router'
import { RouteRecordRaw } from 'vue-router'

// 判断用户是否拥有当前页面的权限
function hasPermission (route: any, roles: Array<string>): boolean {
  if (route.meta?.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  }
  return true
}

// 根据权限过滤，获取动态路由表
function filterAsyncRouters (routerMap: Array<RouteRecordRaw>, roles: Array<string>): Array<RouteRecordRaw> {
  const accessedRouters = routerMap.filter(route => {
    // 超级管理员，返回全部路由
    if (roles.includes('admin')) {
      return true
    }
    // 用户有权限
    if (hasPermission(route, roles)) {
      // 处理子路由
      if (route.children && route.children.length) {
        route.children = filterAsyncRouters(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS (state: any, routers: Array<RouteRecordRaw>) {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    async GenerateRoutes ({ commit }: { commit: any }, roles: Array<string>) {
      // 根据 roles 权限做筛选
      const accessedRouters = filterAsyncRouters(asyncRouterMap, roles)
      commit('SET_ROUTERS', accessedRouters)
    }
  }
}

export default permission
