// lib/axios.ts
import axios from 'axios'
// import { useRouter } from 'next/navigation'
// const { replace } = useRouter()

const instance: any = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  (config: any) => {
    // 在发送请求之前做些什么
    console.log('start')
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
      console.log('success')
      // Promise.resolve(res)
      return res
    } else if (res.code === 10001) {
      window.location.host = '/'
    }
  },
  (err: any) => {
    // 根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案
    if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
      // return axios.request(originalRequest) // 再重复请求一次
      return 'timeout'
    }
    return Promise.reject(err)
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
