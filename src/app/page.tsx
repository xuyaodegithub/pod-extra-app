// import Image from 'next/image'
// import styles from '@/app/ui/home.module.css'
// import clsx from 'clsx'
import { redirect } from 'next/navigation'
import type { Metadata, Viewport } from 'next'
import SearchInput from '@/app/ui/home/searchInput'
import PopularPodcasts from '@/app/ui/home/popular-podcasts'
import { Suspense } from 'react'
import { LoadingLine } from '@/app/ui/skeletons'
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
export default function IndexPage() {
  redirect('/home') // 重定向到 /home
  return null
  // <main>
  //   <div className="p-6 max-w-111 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 opacity-60 max-h-1">
  //     <div className="shrink-0">
  //       <img className="size-12" src="/img/logo.svg" alt="ChitChat Logo" />
  //     </div>
  //     <div>
  //       <div className="text-xl font-medium text-black bg-gray-100 text-sm font-bold">ChitChat</div>
  //       <p className="text-slate-500">You have a new message!</p>
  //     </div>
  //   </div>
  //   <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
  //   <div className={clsx(styles.shape, 'aaa')} />
  //   <Image
  //     src="/woman-9009013_1280.png"
  //     width={1000}
  //     height={760}
  //     className="hidden md:block"
  //     alt="Screenshots of the dashboard project showing desktop version"
  //   />
  //   <div className="mx-auto max-w-7xl px-6 lg:px-8">
  //     <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
  //       <div className="mx-auto flex max-w-xs flex-col gap-y-4">
  //         <dt className="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>
  //         <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">44 million</dd>
  //       </div>
  //       <div className="mx-auto flex max-w-xs flex-col gap-y-4">
  //         <dt className="text-base leading-7 text-gray-600">Assets under holding</dt>
  //         <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$119 trillion</dd>
  //       </div>
  //       <div className="mx-auto flex max-w-xs flex-col gap-y-4">
  //         <dt className="text-base leading-7 text-gray-600">New users annually</dt>
  //         <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">46,000</dd>
  //       </div>
  //     </dl>
  //   </div>
  // </main>
}
