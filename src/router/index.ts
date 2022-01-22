import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import store from '@/store'
import { notification } from 'ant-design-vue'

// 通用路由表
export const constantRouterMap: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('@/views/404.vue'),
    meta: { hidden: true }
  }
]

// 动态路由表
export const asyncRouterMap: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/home',
    meta: { hidden: true },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },
  {
    path: '/user',
    component: BasicLayout,
    redirect: '/user/index',
    meta: { hidden: true },
    children: [
      {
        path: '/user/index',
        name: 'User',
        component: () => import('@/views/User.vue'),
        meta: { title: '用户管理', icon: 'user', roles: ['operator'] }
      }
    ]
  },
  {
    path: '/system',
    component: BasicLayout,
    redirect: '/system/role',
    meta: { title: '系统管理', icon: 'setting', roles: ['admin'] },
    children: [
      {
        path: '/system/role',
        name: 'SystemRole',
        component: () => import('@/views/system/SystemRole.vue'),
        meta: { title: '角色管理' }
      },
      {
        path: '/system/menu',
        name: 'SystemMenu',
        component: () => import('@/views/system/SystemMenu.vue'),
        meta: { title: '菜单管理' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*', // Vue-Router4 取消了 *、/* 等正则匹配
    redirect: '/404',
    meta: { hidden: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRouterMap
})

// 免登录白名单
const whiteList = ['/login', '/404']

// 路由守卫，登录拦截
router.beforeEach(async to => {
  const token = localStorage.getItem('token')
  if (token) {
    if (to.path === '/login') {
      return '/'
    }
    if ((store.state as any).user.roles.length) {
      // vuex 可以获取到用户信息，说明 token 有效
      return true
    }
    try {
      // 刷新页面，或者关闭页面后重新打开，vuex 失效，则重新获取
      await store.dispatch('GetInfo')
      const roles = (store.state as any).user.roles
      // 动态分发路由
      await store.dispatch('GenerateRoutes', roles);
      (store.state as any).permission.addRouters.forEach((route: RouteRecordRaw) => {
        router.addRoute(route)
      })
      return to.fullPath
    } catch (error) {
      // 获取失败，重新登录
      notification.error({
        message: '错误',
        description: '请求用户信息失败，请重试'
      })
      await store.dispatch('Logout')
      return '/login'
    }
  } else {
    if (whiteList.includes(to.path)) {
      // 免登录白名单，不需要登录
      return true
    }
    return '/login'
  }
})

export default router
