'use client'
import type { Viewport } from 'next'
import { useEffect } from 'react'
import '@/app/ui/global.css'
import SideNav from '@/app/ui/home/sidenav'
import Audio from '@/app/ui/home/audio'
import { MyProvider } from '@/context/MyContext'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { ConfigProvider } from 'antd'
//字体
import { Tilt_Warp, Open_Sans } from 'next/font/google'
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
  useEffect(() => {
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
      <MyProvider>
        <html lang="en" className={`h-[100%] ${TiltWarp.variable} ${OpenSans.variable}`}>
          <head>
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
              <div className="flex w-xl xl:py-[24px] sm:py-32 w-1280 mx-auto h-[100%]">
                <SideNav />
                <main className={`flex-1 overflow-hidden flex flex-col`}>
                  <div className={`mb-[20px] h-[40px]`}>
                    {/*<Suspense fallback={<LoadingLine />}>*/}
                    {/*  <SearchInput />*/}
                    {/*</Suspense>*/}
                  </div>
                  <section className={`flex-1 overflow-hidden pr-[20px]`}>{children}</section>
                </main>
              </div>
            ) : (
              <section className={``}>{children}</section>
            )}
            {!isLanding && <Audio />}
          </body>
        </html>
      </MyProvider>
    </ConfigProvider>
  )
}
