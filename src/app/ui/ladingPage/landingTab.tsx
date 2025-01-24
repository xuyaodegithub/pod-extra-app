'use client'
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const tabList = [
  { label: 'Top', className: 'landing' },
  { label: 'Pricing', className: 'Pricing' },
  { label: 'FAQ', className: 'FAQ' },
  { label: 'Blog', className: 'Blog' },
  { label: 'Get Started', className: 'Started' },
]
export default function LandingTab() {
  const { push } = useRouter()
  function changeTab(tab: any) {
    const toDo: any = {
      'Get Started': () => {
        push('/home')
      },
      Blog: () => {
        window.open('/blog ')
      },
    }
    if (toDo[tab.label]) {
      toDo[tab.label]()
    } else {
      const dom: any = document.querySelector(`.${tab.className}`)
      const t = dom?.offsetTop
      console.log(t, '--')
      document.documentElement.scrollTo({ top: t - 60, behavior: 'smooth' })
    }
  }

  return (
    <div
      className={`z-[100] flex justify-between plus:justify-center items-center border-[1px] border-[#D9D9D9] rounded-[20px] w-[3rem] plus:w-[465px] fixed top-[15px] plus:top-[20px] left-[15px] plus:left-[50%] plus:translate-x-[-50%] bg-white dark:bg-bgDark dark:border-darkHomeBg px-[20px] plus:px-0`}
    >
      {tabList.map((tab, index) =>
        tab.className === 'Blog' ? (
          <Link
            key={index}
            href={`/blog `}
            target={`_blank`}
            className={`plus:text-md font-bold plus:leading-[40px] plus:mr-[40px] text-[#02073E] dark:dark:text-white text-[0.14rem] leading-[34px]`}
          >
            {tab.label}
          </Link>
        ) : (
          <div
            className={`plus:text-md font-bold leading-[34px] plus:leading-[40px] cursor-pointer ${index === tabList.length - 1 ? '' : 'plus:mr-[40px]'} ${tab.className === 'Started' ? 'text-play underline' : 'text-[#02073E] dark:dark:text-white'} text-[0.14rem]`}
            onClick={() => changeTab(tab)}
            key={index}
          >
            {tab.label}
          </div>
        )
      )}
    </div>
  )
}
