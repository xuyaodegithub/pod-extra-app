// import Image from 'next/image'
// import styles from '@/app/ui/home.module.css'
// import clsx from 'clsx'
import { redirect } from 'next/navigation'
import type { Metadata, Viewport } from 'next'
import SearchInput from '@/app/ui/home/searchInput'
import PopularPodcasts from '@/app/ui/home/popular-podcasts'
import { Suspense } from 'react'
import { LoadingLine } from '@/app/ui/skeletons'
import { getMetaData } from '@/app/lib/utils'
import Link from 'next/link'
export const metadata: Metadata = getMetaData()
export default function IndexPage() {
  // redirect('/home') // 重定向到 /home
  return (
    <main className={`landing`}>
      <div className={`w-1280 mx-auto`}>
        <div className={`flex justify-between pt-[24px] items-center`}>
          <img src="/images/logo.svg" alt="" />
          <Link href={'/home'} className={`text-md py-[10px] px-[16px] text-play bg-[#FFF0D7] rounded-[5px] font-bold`}>
            Get Started
          </Link>
        </div>
      </div>
    </main>
  )
}
