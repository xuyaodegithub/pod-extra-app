import axios from 'axios'
import { BearerToken, expiresIn, googleAccessToken, loginTime, refreshToken as rToken, loginExpire, cookiesOption } from '@/app/lib/config'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

// 检查 token 是否过期
export async function isTokenExpired() {
  const cookie = cookies()
  try {
    const t = cookie.get(expiresIn)?.value || 0
    const l = cookie.get(loginTime)?.value || 0
    const now = Date.now() // 当前时间
    return +t + +l < now && !!t // 比较 exp（过期时间）
  } catch (e) {
    return true // 如果解析失败，认为 token 已过期
  }
}

// 刷新 token 函数
// @ts-ignore
export async function refreshToken(): Promise<string> {
  const cookie = cookies()
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}v1/account/refreshIdToken`,
      {},
      { headers: { Cookie: `${decodeURIComponent(cookie.get(rToken)?.value || '')}`, withCredentials: true } }
    )
    const idToken = response.data?.data?.idToken || ''
    return idToken
  } catch (e: any) {
    if (e.status === 401) {
      return ''
    }
  }
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  let token = cookieStore.get(BearerToken)?.value
  const isExpired = await isTokenExpired()
  if (!isExpired && token) {
    const token = await refreshToken()
    // const { newtToken } = await response.json()
    console.log(token, '----')
    if (token) {
      cookieStore.set(BearerToken, token, cookiesOption()) // 更新本地idToken
      cookieStore.set(loginTime, String(Date.now()), cookiesOption()) // 更新本地loginTime
    } else {
      cookieStore.delete(BearerToken) // 更新本地idToken
      cookieStore.delete(rToken) // 更新本地loginTime
      redirect('/home')
    }
  }
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      Pragma: 'no-cache',
    },
  })
  // 返回一个 JSON 响应，包含创建的 axios 实例
  return NextResponse.json({ axiosInstance })
}
export const runtime = 'edge' // 推荐在 edge runtime 上运行以提高性能（可选）
