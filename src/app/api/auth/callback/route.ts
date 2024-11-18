import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // 解析请求的 URL
  const url = new URL(req.url)

  // 获取查询参数
  const state = url.searchParams.get('state')
  console.log(state, '0000000000000')

  if (state) {
    // 解码并获取重定向路径
    const redirectPath = new URLSearchParams(decodeURIComponent(state)).get('redirectPath') || '/'
    return NextResponse.redirect(new URL(redirectPath, req.nextUrl.origin))
  }

  // 默认重定向到首页
  return NextResponse.redirect(new URL('/', req.nextUrl.origin))
}
