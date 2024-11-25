// lib/axios.ts
import axios from 'axios'
// import { useRouter } from 'next/navigation'
// const { replace } = useRouter()
import cookies from 'js-cookie'
import { BearerToken, expiresIn, googleAccessToken, loginTime, refreshToken as rToken, loginExpire } from '@/app/lib/config'
import { useUserInfo } from '@/context/UserInfo'
import { message } from 'antd'
import eventBus from '@/app/lib/eventBus'

// 检查 token 是否过期
function isTokenExpired(): boolean {
  try {
    const t = cookies.get(expiresIn) || 0
    const l = cookies.get(loginTime) || 0
    const now = Date.now() // 当前时间
    return +t + +l < now // 比较 exp（过期时间）
  } catch (e) {
    return true // 如果解析失败，认为 token 已过期
  }
}

// 刷新 token 函数
async function refreshToken(): Promise<string> {
  const response = await axios.post(
    '/api/proxy/v1/account/refreshIdToken',
    {},
    { headers: { Authorization: `Bearer ${cookies.get(BearerToken)}` } }
  )
  const idToken = response.data?.data?.idToken || ''
  cookies.set(BearerToken, idToken) // 更新本地idToken
  cookies.set(loginTime, String(Date.now())) // 更新本地loginTime
  return idToken
}

const instance: any = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // timeout: 10000,
  withCredentials: true,
  headers: {
    Authorization: cookies.get(BearerToken) ? `Bearer ${cookies.get(BearerToken)}` : '',
    // 'Content-Type': 'application/json',
    // 'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  async (config: any) => {
    let token = cookies.get(BearerToken)
    //只在客户端判断是否token过期
    if (token && isTokenExpired() && typeof window !== 'undefined') {
      // 如果 token 已过期，尝试刷新
      try {
        token = await refreshToken()
      } catch (error) {
        console.error('Token refresh failed:', error)
        // 可以在这里处理刷新失败逻辑，例如跳转到登录页面
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // 在发送请求之前做些什么
    if (config.url.startsWith('/api/proxy/')) {
      config.baseURL = ''
    }
    return config
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: any) => {
    const res = response.data
    // 对响应数据做点什么
    if (res.code === 0) {
      // Promise.resolve(res)
      return res
    } else if (res.code === 10001) {
      window.location.host = '/'
    } else {
      if (typeof window !== 'undefined') {
        // Safe to use window here
        message.error(res.message || '系统异常')
      }
    }
  },
  (err: any) => {
    if (err.status === 401) {
      cookies.remove(BearerToken)
      cookies.remove(rToken)
      cookies.remove(googleAccessToken)
      eventBus.emit(loginExpire)
    }
    // 根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案
    if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
      // return axios.request(originalRequest) // 再重复请求一次
      return 'timeout'
    }
    return Promise.resolve(err)
  }
)

// export default instance
const fetchPost = (url: string, data: any) => {
  //post请求
  return instance({
    method: 'post',
    url: url,
    dataType: 'JSON',
    data: data,
  })
}
const fetchGet = (url: string, data: any) => {
  //post请求
  return instance({
    method: 'get',
    url: url,
    dataType: 'JSON',
    params: data,
  })
}
const fetchPut = (url: string, data: any) => {
  //post请求
  return instance({
    method: 'put',
    url: url,
    dataType: 'JSON',
    data: data,
  })
}
const upPost = (url: string, data: any) => {
  //图片上传请求
  return instance({
    method: 'post',
    url: url,
    dataType: 'JSON',
    data: data,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
export { fetchPost, fetchGet, upPost, fetchPut }
