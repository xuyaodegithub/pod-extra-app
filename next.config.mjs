/** @type {import('next').NextConfig} */
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'
import createMDX from '@next/mdx'
const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    // images: {
    //   domains: ['*'],
    // },
    reactStrictMode: true,
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
      // serverActions: true,
    },
    env: {
      customKey: 'my-value',
      NEXTAUTH_TIMEOUT: '7000',
    },
    // 配置 `pageExtensions` 以包含 markdown 和 MDX 文件
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    async rewrites() {
      return [
        {
          source: '/blog/:path*',
          destination: 'https://blog.podextra.ai/:path*',
        },
        {
          source: '/blog/',
          destination: 'https://www.podextra.ai/blog',
        },
        {
          source: '/robots.txt',
          destination: 'https://api.podextra.ai/robots.txt',
        },
        {
          source: '/sitemap_index.xml',
          destination: 'https://api.podextra.ai/sitemap_index.xml',
        },
        {
          source: '/sitemap:version(\\d+).xml', // 匹配 `sitemap` 后的数字部分
          destination: 'https://api.podextra.ai/sitemap:version.xml', // 将匹配到的版本号放到目标 URL 中
        },
      ]
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
    async headers() {
      return [
        {
          source: '/playlist',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, max-age=0, must-revalidate, proxy-revalidate',
            },
          ],
        },
      ]
    },
    // keepAlive: false,
    // devIndicators: {
    //   autoPrerender: false,
    // },
  }
  const withMDX = createMDX({
    // 在这里添加 markdown 插件，根据需要
  })
  return withMDX(nextConfig) //nextConfig
  // experimental: {//最新版next才能使用ppr
  //   ppr: 'incremental',
  // },
}

export default nextConfig
