import type { Metadata, Viewport } from 'next'
import '@/app/ui/global.css'
import SideNav from '@/app/ui/home/sidenav'
import Audio from '@/app/ui/home/audio'
import { Suspense } from 'react'
import { LoadingLine } from '@/app/ui/skeletons'
import SearchInput from '@/app/ui/home/searchInput'
import { MyProvider } from '@/context/MyContext'
export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'PodExtra AI—Unleash the power of podcast',
  },
  description:
    'PodExtra is an innovative AI-powered podcast tool that provides transcripts, summaries, mind maps, outlines, highlights, and takeaways for your favorite podcasts. It allows you to quickly browse through the content, saving time and improving efficiency.',
  icons: {
    icon: '/images/logo.svg',
  },
  keywords:
    'podcast,podcast summaries,podcast transcripts, AI transcription,podcast tool,mind maps,outlines, highlights,takeaways,favorite podcasts,',
}
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
  return (
    <MyProvider>
      <html lang="en" className={`h-100`}>
        <body className={`antialiased h-100`}>
          <div className="flex bg-white w-xl xl:py-[24px] sm:py-32 w-1280 mx-auto h-100">
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
