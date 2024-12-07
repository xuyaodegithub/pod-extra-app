import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { callbackPath, googleAccessToken, refreshToken, expiresIn, loginTime, cookiesOption, BearerToken } from '@/app/lib/config'
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
  //userLogin({ idToken: idToken })
  const token = authRes.data?.data?.idToken
  const rToken = authRes.headers.get('set-cookie') || ''
  cookieStore.set(BearerToken, token, cookiesOption())
  // 根据 `state` 跳转到目标页面
  const response = NextResponse.redirect(new URL(decodeURIComponent(path), req.nextUrl.origin), {
    status: 302,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  response.cookies.set(BearerToken, token, cookiesOption())
  console.log(rToken,'rToken','~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',authRes)
  if (rToken) {
    const match = rToken.match(/refreshToken=([^;]+)/)
    const t = `refreshToken=${match ? match[1] : ''}`
    cookieStore.set(refreshToken, t, cookiesOption())
    response.cookies.set(refreshToken, t, cookiesOption({ httpOnly: true }))
  }
  return response
}

export const runtime = 'edge' // 推荐在 edge runtime 上运行以提高性能（可选）
