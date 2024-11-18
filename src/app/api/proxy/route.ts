import { NextRequest, NextResponse } from 'next/server';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({});

export async function GET(req: NextRequest): Promise<Response> {
  console.log('Request received:', req.url); // 添加调试信息
  if (req.nextUrl.pathname.startsWith('/api/proxy/')) {
    console.log('Proxying request to:', req.nextUrl.pathname);
    const targetUrl = req.nextUrl.pathname.replace('/api/proxy/', 'https://blog.podextra.ai/');

    return new Promise((resolve:any, reject:any) => {
      // @ts-ignore
      proxy.web(req, NextResponse, { target: targetUrl }, (error) => {
        console.error('Proxy error:', error); // 添加调试信息
        resolve(new NextResponse(JSON.stringify({ error: 'Something went wrong.' }), { status: 500 }));
      });
    }) as Promise<Response>;
  } else {
    return new NextResponse(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }
}
