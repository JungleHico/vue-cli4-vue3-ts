import axios from 'axios'
import { notification } from 'ant-design-vue'
import store from '@/store'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 10000 // 请求超时时间
})

// 请求拦截
http.interceptors.request.use(
  (config: any) => {
    // 请求头携带 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截
http.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      // 提示错误信息
      const { status, data } = error.response
      notification.error({
        message: status,
        description: data.message
      })
      if (status === 401) {
        // token 过期，打开登录页（路由守卫）
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
      }
    }
    return Promise.reject(error)
  }
)

export default http

// 封装 get 请求
export const get = (url: string, params = {}, config = {}) => {
  return http({
    url,
    method: 'GET',
    params,
    ...config
  })
}

// 封装 post 请求
export const post = (url: string, data = {}, config = {}) => {
  return http({
    url,
    method: 'POST',
    data,
    ...config
  })
}
