'use client'
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
      className={`z-10 flex justify-center items-center border-[1px] border-[#D9D9D9] rounded-[20px] w-[465px] fixed top-[20px] left-[50%] translate-x-[-50%] bg-white dark:bg-bgDark dark:border-darkHomeBg`}
    >
      {tabList.map((tab, index) => (
        <div
          className={`text-md font-bold leading-[40px] cursor-pointer ${index === tabList.length - 1 ? '' : 'mr-[40px]'} ${tab.className === 'Started' ? 'text-play underline' : 'text-[#02073E] dark:dark:text-white'}`}
          onClick={() => changeTab(tab)}
          key={index}
        >
          {tab.label}
        </div>
      ))}
    </div>
  )
}
