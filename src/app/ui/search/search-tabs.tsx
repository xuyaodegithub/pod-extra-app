'use client'
import { useMyContext } from '@/context/MyContext'
import { searchTabs } from '@/app/lib/config'
import { useState } from 'react'
import { clsx } from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SearchTabs({ className, tab }: { className?: string; tab: string }) {
  const { isDark, tabsPage, setTabsPage } = useMyContext()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const { push } = useRouter()
  function changeTab(key: string) {
    const params = new URLSearchParams(searchParams)
    const page = tabsPage.get(key) || 1
    params.set('tab', key)
    params.set('page', page)
    setTabsPage(tabsPage.set(tab, currentPage))
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
