/** @type {import('next').NextConfig} */
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
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
  }
  return nextConfig
  // experimental: {//最新版next才能使用ppr
  //   ppr: 'incremental',
  // },
}

export default nextConfig
