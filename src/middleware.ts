import { NextResponse, NextRequest } from 'next/server'
import { BearerToken, expiresIn, loginTime } from '@/app/lib/config'
import { cookies } from 'next/headers'
import axios from 'axios'

// import crypto from 'crypto'
async function generateEtag(request: NextRequest) {
  // 假设 data.updatedAt 是 ISO 格式时间戳
  const encoder = new TextEncoder()
  const data = encoder.encode(request.url)

  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return `"${hashHex}"`
}
// 检查 token 是否过期
function isTokenExpired(): boolean {
  const cookie = cookies()
  const token = cookie.get(BearerToken)?.value
  //不需要刷新token
  if (!token) return false
  try {
    const t = cookie.get(expiresIn)?.value || 0
    const l = cookie.get(loginTime)?.value || 0
    const now = Date.now() // 当前时间
    return +t + +l < now // 比较 exp（过期时间）
  } catch (e) {
    return true // 如果解析失败，认为 token 已过期
  }
}
// 刷新 token 函数
async function refreshToken(): Promise<string> {
  const cookie = cookies()
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}v1/account/refreshIdToken`,
    {},
    { headers: { Authorization: `Bearer ${cookie.get(BearerToken)?.value}` } }
  )
  const idToken = response.data?.data?.idToken || ''
  cookie.set(BearerToken, idToken) // 更新本地idToken
  cookie.set(loginTime, String(Date.now())) // 更新本地loginTime
  return idToken
}
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //这里做refreshToken
  const tokenIsExpires = isTokenExpired()
  const { pathname } = new URL(request.url)
  // console.log(token, '--------', pathname)
  // if (token && pathname.startsWith('/v1/podEpisode')) {
  //   request.headers.set('Authorization', `Bearer ${token}`)
  // }

  // return NextResponse.redirect(new URL('/home', request.url))
  //   const { pathname } = new URL(request.url);
  // 想要缓存的接口
  //   if (pathname.startsWith('/api/some-endpoint')) {
  // const res: any = NextResponse.next()
  // 假设您有一个生成 Etag 的方法
  // const etag = await generateEtag(request)

  // if (request.headers.get('If-None-Match') === etag) {
  //   // 如果匹配，返回 304 响应，结束函数
  //   return new NextResponse(null, {
  //     status: 304,
  //   })
  // }

  // res.headers.set('Etag', etag)
  // res.headers.set('Last-Modified', new Date().toUTCString())

  // return res
  return NextResponse.next()
}

// export const config = {
//   matcher: '/about/:path*',
// }
