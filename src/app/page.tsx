import Image from 'next/image'
import styles from '@/app/ui/home.module.css'
import clsx from 'clsx'
import SideNav from '@/app/ui/home/sidenav'
import { Button } from '@/components/ui/button'
import SearchInput from '@/app/ui/home/searchInput'
import PopularPodcasts from '@/app/ui/home/popular-podcasts'
export default function Home() {
  return (
    <div className="flex bg-white w-xl xl:py-[24px] sm:py-32 w-1280 mx-auto h-100">
      {/*<div className="p-6 max-w-111 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 opacity-60 max-h-1">*/}
      {/*  <div className="shrink-0">*/}
      {/*    <img className="size-12" src="/img/logo.svg" alt="ChitChat Logo" />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <div className="text-xl font-medium text-black bg-gray-100 text-sm font-bold">ChitChat</div>*/}
      {/*    <p className="text-slate-500">You have a new message!</p>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />*/}
      {/*<div className={clsx(styles.shape, 'aaa')} />*/}
      {/*<Image*/}
      {/*  src="/woman-9009013_1280.png"*/}
      {/*  width={1000}*/}
      {/*  height={760}*/}
      {/*  className="hidden md:block"*/}
      {/*  alt="Screenshots of the dashboard project showing desktop version"*/}
      {/*/>*/}
      {/*<div className="mx-auto max-w-7xl px-6 lg:px-8">*/}
      {/*  <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">*/}
      {/*    <div className="mx-auto flex max-w-xs flex-col gap-y-4">*/}
      {/*      <dt className="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>*/}
      {/*      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">44 million</dd>*/}
      {/*    </div>*/}
      {/*    <div className="mx-auto flex max-w-xs flex-col gap-y-4">*/}
      {/*      <dt className="text-base leading-7 text-gray-600">Assets under holding</dt>*/}
      {/*      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$119 trillion</dd>*/}
      {/*    </div>*/}
      {/*    <div className="mx-auto flex max-w-xs flex-col gap-y-4">*/}
      {/*      <dt className="text-base leading-7 text-gray-600">New users annually</dt>*/}
      {/*      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">46,000</dd>*/}
      {/*    </div>*/}
      {/*  </dl>*/}
      {/*</div>*/}
      <SideNav />
      <main className={`flex-1 overflow-auto pl-[14px]`}>
        <div className={`mb-24px`}>
          <SearchInput />
        </div>
        <div className={`mb-24px`}>
          <PopularPodcasts title={`Popular Podcasts`} />
        </div>
      </main>
    </div>
  )
}
