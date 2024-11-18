import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { BearerToken, googleIdToken,refreshToken } from '@/app/lib/config'
import axios from 'axios'

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetUrl = `${process.env.NEXT_PUBLIC_API_URL}${params.path.join('/')}`
  const cookieStore = cookies()
  const body = await req.json()
  const t = cookieStore.get(googleIdToken)?.value || cookieStore.get(BearerToken)?.value || ''
  const rToken = cookieStore.get(refreshToken)?.value || ''
  console.log(t, 'token', body, targetUrl, '================')
  // @ts-ignore
  const response: any = await axios({
    url: targetUrl,
    method: 'POST',
    withCredentials: true,
    dataType: 'JSON',
    headers: {
      ...req.headers,
      Authorization: `Bearer ${t.trim()}`,
      Cookie: `${decodeURIComponent(rToken)}`,
    },
    data: body,
  })
  const {url} = response.config
  if(url.endsWith('account/auth')){
    const Cookie = response.headers['set-cookie']
    cookieStore.set(refreshToken,Cookie[0]||'')
  }
  return new NextResponse(JSON.stringify(response.data), {
    status: response.status,
    headers: {
      'Content-Type': 'application/json', // 确保返回正确的 Content-Type
      ...response.headers,
    },
  })
}
export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetUrl = `${process.env.NEXT_PUBLIC_API_URL}${params.path.join('/')}`
  const cookieStore = cookies()
  try {
    // @ts-ignore
    const response: any = await axios({
      url: targetUrl,
      method: 'GET',
      withCredentials: true,
      dataType: 'JSON',
      headers: {
        ...req.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookieStore.get(BearerToken)?.value || ''}`,
      },
      params: {},
    })

    return new NextResponse(JSON.stringify(response.data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json', // 确保返回正确的 Content-Type
        ...response.headers,
      },
    })
  } catch (e) {
    console.log(e)
    return new NextResponse(JSON.stringify({}), {})
  }
}
