'use client'
import { useMyContext } from '@/context/MyContext'
import { searchTabs } from '@/app/lib/config'
import { useState } from 'react'
import { clsx } from 'clsx'

export default function SearchTabs({ className }: { className: string }) {
  const [activeTab, setActiveTab] = useState(searchTabs[0].key)
  const { isDark } = useMyContext()
  return (
    <div className={`flex items-center`}>
      {searchTabs.map((item) => (
        <div
          className={`text-sm px-[10px] py-[8px] bg-bgGray text-fontGry-600 rounded-[10px] mr-[15px] cursor-pointer dark:bg-bgDark dark:text-homehbg ${clsx(activeTab === item.key && 'bg-play text-white dark:bg-play dark:text-white')} ${className}`}
          key={item.key}
          onClick={() => setActiveTab(item.key)}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}
