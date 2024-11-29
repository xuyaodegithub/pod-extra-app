import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { callbackPath, googleAccessToken, googleIdToken, expiresIn, loginTime, cookiesOption, BearerToken } from '@/app/lib/config'
import { userLogin } from '@/app/lib/service'
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
  const expires_in = body.get('expires_in') || ''
  const path = String(body.get('state')) || ''
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
  const {
    data: { idToken: token },
  } = await userLogin({ idToken: idToken })
  cookieStore.set(BearerToken, token, cookiesOption())
  // console.log(decodeURIComponent(path), 'decodeURIComponent(path)')
  // 根据 `state` 跳转到目标页面
  const response = NextResponse.redirect(new URL(decodeURIComponent(path), req.nextUrl.origin), {
    status: 302,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  response.cookies.set(BearerToken, token)
  return response
  // return NextResponse.redirect(new URL(decodeURIComponent(path), req.nextUrl.origin), {
  //   status: 302,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
  // } catch (err: any) {
  //   console.error('Error:', err)
  //   return NextResponse.json({ error: 'Token validation failed' }, { status: 500 })
  // }
}

export const runtime = 'edge' // 推荐在 edge runtime 上运行以提高性能（可选）
