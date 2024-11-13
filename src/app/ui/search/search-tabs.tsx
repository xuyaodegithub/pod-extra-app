'use client'
import { useMyContext } from '@/context/MyContext'
import { searchTabs } from '@/app/lib/config'
import { useState } from 'react'
import { clsx } from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SearchTabs({ className, tab }: { className?: string; tab: string }) {
  const { isDark } = useMyContext()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { push } = useRouter()
  function changeTab(key: string) {
    const params = new URLSearchParams(searchParams)
    params.set('tab', key)
    push(`${pathname}?${params.toString()}`)
  }
  return (
    <div className={`flex items-center sticky top-0 bg-white z-[99] ${className} dark:bg-darkBody`}>
      {searchTabs.map((item) => (
        <div
          className={`text-sm px-[10px] py-[8px] bg-bgGray text-fontGry-600 rounded-[10px] mr-[15px] cursor-pointer dark:bg-bgDark dark:text-homehbg ${clsx(tab === item.key && 'bg-play text-white dark:bg-play dark:text-white')}`}
          key={item.key}
          onClick={() => changeTab(item.key)}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}
