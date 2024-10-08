/** @type {import('next').NextConfig} */
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    // images: {
    //   domains: ['*'],
    // },
    sassOptions: {
      additionalData: `$var: red;`,
    },
    eslint: {
      dirs: ['app'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    },
    basePath: '',
    assetPrefix: isDev ? '' : '',
    crossOrigin: 'anonymous',
    experimental: {
      cssChunking: 'loose', // default
    },
    env: {
      customKey: 'my-value',
    },
    // distDir: '.next',
    // exportPathMap: async function (
    //   defaultPathMap,
    //   { dev, dir, outDir, distDir, buildId }
    // ) {
    //   return {
    //     '/': { page: '/' },
    //     '/about': { page: '/about' },
    //     '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
    //     '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
    //     '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    //   }
    // },
    // generateEtags: false,
    // async headers() {
    //   return [
    //     {
    //       source: '/about',
    //       headers: [
    //         {
    //           key: 'x-custom-header',
    //           value: 'my custom header value',
    //         },
    //         {
    //           key: 'x-another-custom-header',
    //           value: 'my other custom header value',
    //         },
    //       ],
    //     },
    //   ]
    // },
    // keepAlive: false,
    // devIndicators: {
    //   autoPrerender: false,
    // },
    // server: {
    //   // 代理配置
    //   dev: [
    //     {
    //       // 匹配所有以 /api 开头的请求
    //       path: '/api/*',
    //       // 目标服务器地址
    //       target: 'http://localhost:3001',
    //       // 是否转发主机头
    //       changeOrigin: true,
    //       // 是否忽略路径
    //       pathRewrite: { '^/api': '' },
    //     },
    //   ],
    // },
  }
  return nextConfig
  // experimental: {//最新版next才能使用ppr
  //   ppr: 'incremental',
  // },
}

export default nextConfig
