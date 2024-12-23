'use client'
import type { Viewport } from 'next'
import { useEffect } from 'react'
import '@/app/ui/global.css'
import SideNav from '@/app/ui/home/sidenav'
import Audio from '@/app/ui/home/audio'
import { MyProvider } from '@/context/MyContext'
import { UserProvider } from '@/context/UserInfo'
import { usePathname } from 'next/navigation'
import SearchInput from '@/app/ui/home/searchInput'
import UserInfo from '@/app/ui/home/userInfo'
import Script from 'next/script'
import { ConfigProvider, Spin } from 'antd'
import { Suspense } from 'react'
import { LoadingLine } from '@/app/ui/skeletons'
// import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BearerToken } from '@/app/lib/config'
import LoginDialog from '@/app/ui/home/loginDialog'
//字体
import { Tilt_Warp, Open_Sans } from 'next/font/google'
import cookies from 'js-cookie'
import { isTokenExpired, refreshToken as getNewToken } from '@/app/lib/fetch'

const TiltWarp = Tilt_Warp({ subsets: ['latin'], display: 'swap', variable: '--font-TiltWarp' })
const OpenSans = Open_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-OpenSans' })
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isLanding = pathname === '/'
  const { replace } = useRouter()
  useEffect(() => {
    const refreshToken = async () => {
      try {
        // 检查是否过期  提前十分钟
        const isExpired = isTokenExpired(10)
        let token = cookies.get(BearerToken)
        console.log('token', token, isExpired)
        if (isExpired && token) {
          const token = await getNewToken()
        }
      } catch (error) {
        console.error('Failed to refresh token:', error)
      }
    }
    // 初始化调用
    refreshToken()
    const interval = setInterval(refreshToken, 5 * 60 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search.substring(1))
    const needClose = urlParams.get('needClose') || false
    if (needClose) window.close()
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window?.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    //避免刷新时 模式闪烁
    document.body.classList.add('opacity-100')
  }, [isLanding])

  return (
    // <SessionProvider>
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            /* 这里是你的 Slider 组件的自定义 token */
            handleLineWidth: 0,
            handleLineWidthHover: 0,
            handleSize: 18,
            handleSizeHover: 18,
            dotActiveBorderColor: '#ffffff',
            handleActiveOutlineColor: '#ffffff',
            dotBorderColor: '#ffffff',
            dotSize: 18,
            handleActiveColor: '#ffffff', // 自定义滑轨的颜色
            handleColor: '#ffffff', // 自定义滑轨的颜色
            railBg: '#dcdcdc',
            railHoverBg: '#dcdcdc',
            trackBg: '#aaaaaa',
            trackHoverBg: '#aaaaaa',
          },
        },
      }}
    >
      <UserProvider>
        <MyProvider>
          <html lang="en" className={`h-[100%] ${TiltWarp.variable} ${OpenSans.variable}`}>
            <head>
              <link rel="icon" href="/images/favicon.png" />
              {/* Use React.Fragment or an array to wrap multiple elements */}
              <>
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-1442PR33N8" strategy="beforeInteractive"></Script>
                <Script
                  dangerouslySetInnerHTML={{
                    __html: ` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)};
          gtag('js', new Date());
          gtag('config', 'G-1442PR33N8');`,
                  }}
                  strategy="beforeInteractive"
                ></Script>
              </>
            </head>
            <body className={`opacity-0 antialiased h-[100%] dark:bg-black dark:text-darkTheme-900 font-sans`}>
              {!isLanding ? (
                <div className="flex w-xl py-[24px] w-1280 mx-auto h-[100%]">
                  <SideNav />
                  <main className={`flex-1 overflow-hidden flex flex-col`}>
                    <div className={`mb-[22px] flex justify-between items-center pr-[20px]`}>
                      <Suspense fallback={<LoadingLine num={1} />}>
                        <SearchInput />
                      </Suspense>
                      <UserInfo />
                    </div>
                    <section className={`flex-1 overflow-hidden pr-[20px]`}>{children}</section>
                  </main>
                </div>
              ) : (
                <section className={``}>{children}</section>
              )}
              {!isLanding && <Audio />}
              <LoginDialog />
            </body>
          </html>
        </MyProvider>
      </UserProvider>
    </ConfigProvider>
    // </SessionProvider>
  )
}
