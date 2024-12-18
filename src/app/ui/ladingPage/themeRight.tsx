'use client'
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import UserInfo from '@/app/ui/home/userInfo'
import { useMyContext } from '@/context/MyContext'
import Link from 'next/link'

export default function ThemeRight() {
  const { isDark, setIsDark } = useMyContext()
  const { push } = useRouter()
  function changeTheme() {
    localStorage.theme = isDark ? 'light' : 'dark'
    if (!isDark) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
    setIsDark(!isDark)
  }

  return (
    <div className={`flex items-center`}>
      <div
        className={`cursor-pointer flex justify-center items-center w-[40px] h-[40px] rounded-[50%] border-[1px] mr-[10px] ${isDark ? 'border-darkHomeBg' : 'border-[#D9D9D9]'}`}
        onClick={changeTheme}
      >
        <img src={`/icons/${isDark ? 'Shape-moon' : 'Shape-sun'}.svg`} className={`w-[18px]`} />
      </div>
      <Link
        className={`flex justify-center items-center w-[40px] h-[40px] rounded-[50%] border-[1px] mr-[10px] ${isDark ? 'border-darkHomeBg' : 'border-[#D9D9D9]'}`}
        href={`/home`}
      >
        <img src={`/icons/${isDark ? 'darkSearch' : 'search'}.svg`} alt="" className={`w-[18px]`} />
      </Link>
      <UserInfo hiddenPrice />
    </div>
  )
}
