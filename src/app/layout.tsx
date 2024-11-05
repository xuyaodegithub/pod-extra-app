'use client'
import type { Viewport } from 'next'
import { useEffect } from 'react'
import '@/app/ui/global.css'
import SideNav from '@/app/ui/home/sidenav'
import Audio from '@/app/ui/home/audio'
import { MyProvider } from '@/context/MyContext'
import { usePathname } from 'next/navigation'
import Head from 'next/head'

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
    <MyProvider>
      <html lang="en" className={`h-[100%]`}>
        <Head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-1442PR33N8"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: ` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)};
          gtag('js', new Date());
          gtag('config', 'G-1442PR33N8');`,
            }}
          ></script>
        </Head>
        <body className={`opacity-0 antialiased h-[100%] dark:bg-black dark:text-darkTheme-900`}>
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
  )
}
