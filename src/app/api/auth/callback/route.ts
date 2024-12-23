import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { googleAccessToken, refreshToken, expiresIn, loginTime, cookiesOption, BearerToken } from '@/app/lib/config'
import axios from 'axios'
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export async function POST(req: NextRequest) {
  // try {
  const cookieStore = cookies()
  // 获取请求体数据
  const body = await req.formData()
  const accessToken = body.get('access_token') || ''
  const idToken = body.get('id_token') || ''
  const expires_in = body.get('expires_in') || 60 * 60 * 1000
  const path = decodeURIComponent(String(body.get('state') || ''))
  cookieStore.set(googleAccessToken, String(accessToken), cookiesOption())
  //idToken
  // cookieStore.set(googleIdToken, String(idToken), cookiesOption())
  //expires_in
  cookieStore.set(expiresIn, String(+expires_in * 1000), cookiesOption())
  //登录时间
  cookieStore.set(loginTime, String(Date.now()), cookiesOption())
  // const { id_token = '', state = '' } = {}
  if (!idToken) {
    return NextResponse.json({ error: 'Missing id_token or state' }, { status: 400 })
  }
  // @ts-ignore
  const authRes: any = await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}v1/account/auth`,
    method: 'POST',
    withCredentials: true,
    dataType: 'JSON',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { idToken },
  })
  const { idToken: token, refreshToken: rToken } = authRes.data?.data || {}
  // 根据 `state` 跳转到目标页面
  console.log(path, 'path')
  const response = NextResponse.redirect(
    new URL(decodeURIComponent(`${path}${path.includes('?') ? '&' : '?'}needClose=true`), req.nextUrl.origin),
    {
      status: 302,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  // response.headers.set('Cache-Control', 'no-store') // 禁止缓存
  response.cookies.set(BearerToken, token, cookiesOption())
  if (rToken) {
    response.cookies.set(refreshToken, rToken, cookiesOption())
  }
  return response
}

export const runtime = 'edge' // 推荐在 edge runtime 上运行以提高性能（可选）
