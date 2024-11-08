'use client'
import Link from 'next/link'
import { useMyContext } from '@/context/MyContext'
import { useUserInfo } from '@/context/UserInfo'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import UserHead from '@/app/ui/home/userHead'

export default function UserInfo() {
  const { isDark } = useMyContext()
  const { userInfo } = useUserInfo()
  const [open, setOpen] = useState(false)
  function openPopover(e: any) {
    e.stopPropagation()
    setOpen(!open)
  }
  const loginBtn = {
    text: 'Sign in',
    icon: '/images/login.svg',
    darkIcon: '/images/darkLogin.svg',
  }
  return (
    <div className="flex items-center">
      <Link href="/Pricing" className={`mr-[30px] text-md text-fontGry-600 font-bold dark:text-homehbg`}>
        Pricing
      </Link>
      {userInfo?.userName ? (
        <div>
          <Popover data-side="right" open={open}>
            <PopoverTrigger className={`px-[10px]`}>
              <UserHead name={userInfo?.userName.slice(0, 1)} open={openPopover} />
            </PopoverTrigger>
            <PopoverContent side="right">
              <div className={`rounded-md bg-bgGray dark:bg-black p-0 popover-content`}>
                <div className={`flex items-center`}>
                  <UserHead name={userInfo?.userName.slice(0, 1)} />
                  <div className={`text-md text-fontGry-600 leading-[20px]`}>
                    <div className={`font-bold`}>{userInfo?.userName}</div>
                    <div className={``}>{userInfo?.email}</div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div
          className={`cursor-pointer flex items-center py-[8px] px-[11px] bg-play font-bold text-md text-white dark:bg-bgDark rounded-[10px] dark:text-homehbg`}
        >
          <img src={loginBtn.darkIcon} alt="" className={`mr-[6px]`} />
          <span>{loginBtn.text}</span>
        </div>
      )}
    </div>
  )
}
