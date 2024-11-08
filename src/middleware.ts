import { NextResponse, NextRequest } from 'next/server'
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
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/home', request.url))
  const res: any = NextResponse.next()
  // console.log(request, '----')
  // 假设您有一个生成 Etag 的方法
  const etag = await generateEtag(request)

  if (request.headers.get('If-None-Match') === etag) {
    // 如果匹配，返回 304 响应，结束函数
    return new NextResponse(null, {
      status: 304,
    })
  }

  res.headers.set('Etag', etag)
  res.headers.set('Last-Modified', new Date().toUTCString())

  return res
  // return NextResponse.next()
}

// export const config = {
//   matcher: '/about/:path*',
// }
