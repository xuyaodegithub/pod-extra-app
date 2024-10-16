'use client'
import type { Viewport } from 'next'
import { useEffect } from 'react'
import '@/app/ui/global.css'
import SideNav from '@/app/ui/home/sidenav'
import Audio from '@/app/ui/home/audio'
import { Suspense } from 'react'
import { LoadingLine } from '@/app/ui/skeletons'
import SearchInput from '@/app/ui/home/searchInput'
import { MyProvider } from '@/context/MyContext'
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
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    // if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    //   document.body.classList.add('dark')
    // } else {
    //   document.body.classList.remove('dark')
    // }
    // // Whenever the user explicitly chooses light mode
    //   localStorage.theme = 'light'
    //
    // // Whenever the user explicitly chooses dark mode
    //   localStorage.theme = 'dark'
    //
    // // Whenever the user explicitly chooses to respect the OS preference
    //   localStorage.removeItem('theme')
  }, [])

  return (
    <MyProvider>
      <html lang="en" className={`h-100`}>
        <body className={`antialiased h-100 dark:bg-black dark:text-darkTheme-900`}>
          <div className="flex w-xl xl:py-[24px] sm:py-32 w-1280 mx-auto h-100">
            <SideNav />
            <main className={`flex-1 overflow-hidden pl-[14px] flex flex-col`}>
              <div className={`mb-[25px]`}>
                <Suspense fallback={<LoadingLine />}>
                  <SearchInput />
                </Suspense>
              </div>
              <section className={`flex-1 overflow-auto`}>{children}</section>
            </main>
          </div>
          <Audio />
        </body>
      </html>
    </MyProvider>
  )
}
