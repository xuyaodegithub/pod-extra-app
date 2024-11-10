'use client'
import Link from 'next/link'
import { useMyContext } from '@/context/MyContext'
import { useUserInfo } from '@/context/UserInfo'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import UserHead from '@/app/ui/home/userHead'
import { oauthSignIn, googleLoginPopup, revokeAccess2 } from '@/app/lib/login'
// import { signIn, signOut, useSession } from 'next-auth/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { googleAccessToken } from '@/app/lib/config'
export default function UserInfo() {
  const { isDark } = useMyContext()
  const { userInfo, setUserInfo, showDialog, setShowDialog, showLoginDialog, setShowLoginDialog } = useUserInfo()
  const [open, setOpen] = useState(false)
  // const { data: session } = useSession()
  function openPopover(e: any) {
    e.stopPropagation()
    setOpen(!open)
  }
  function hiddenPopover(e: any) {
    const { clientX, clientY } = e
    const dom = document.querySelector('.popover-content')
    if (dom) {
      const { top, left, height, width }: any = document.querySelector('.popover-content')?.getBoundingClientRect()
      if (!(clientY > top && clientY < top + height && clientX > left && clientX < left + width) && open) setOpen(false)
    }
  }
  useEffect(() => {
    if (open) document.addEventListener('click', hiddenPopover)
    return () => {
      document.removeEventListener('click', hiddenPopover)
    }
  }, [open])
  const fetchGoogleUserInfo = async (token: string) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const { ok = false, status } = response
      if (ok) {
        const userInfo = await response.json()
        setUserInfo(userInfo)
        console.log('User Info:', userInfo)
        // 在这里可以处理用户信息，例如将其存储在状态中
      } else {
        //accessToken过期
        if (status === 401) {
          localStorage.removeItem(googleAccessToken)
        }
        console.error('Failed to fetch user info')
      }
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }
  useEffect(() => {
    const accessToken = localStorage.getItem(googleAccessToken)
    if (accessToken) {
      // 调用函数获取用户信息
      fetchGoogleUserInfo(accessToken)
      // revokeAccess(accessToken)
    }
  }, [])
  const loginBtn = {
    text: 'Sign in',
    icon: '/images/login.svg',
    darkIcon: '/images/darkLogin.svg',
  }
  const signOutInfo = {
    text: 'Sign out',
    icon: '/images/login.svg',
    darkIcon: '/images/darkLogin.svg',
  }
  function login() {
    console.log(process.env.GOOGLE_CLIENT_ID, '---', process.env.NEXTAUTH_SECRET, process.env.AUTH_SECRET)
    googleLoginPopup()
    // signIn('google')
  }
  function signOut() {
    revokeAccess2()
  }

  return (
    <div className="flex items-center">
      <Link href="/Pricing" className={`mr-[30px] text-md text-fontGry-600 font-bold dark:text-homehbg`}>
        Pricing
      </Link>
      {userInfo?.id ? (
        <div>
          <Popover data-side="left" open={open}>
            <PopoverTrigger className={``}>
              <UserHead name={userInfo?.name.slice(0, 1)} open={openPopover} />
            </PopoverTrigger>
            <PopoverContent side="left" className={`w-[300px] border-none mt-[25px]`}>
              <div className={`rounded-md bg-hbg dark:bg-black p-0 popover-content shadow-popoverShow`}>
                <div className={`flex items-center p-[20px] border-b-[1px] border-homehbg`}>
                  <UserHead name={userInfo?.name?.slice(0, 1)} />
                  <div className={`text-md text-fontGry-600 leading-[20px] ml-[10px] flex-1 overflow-hidden`}>
                    <div className={`font-bold overflow-hidden text-ellipsis whitespace-nowrap`}>{userInfo?.name}</div>
                    <div className={` overflow-hidden text-ellipsis whitespace-nowrap`}>{userInfo?.email}</div>
                  </div>
                </div>
                <div className={`px-[10px] pt-[10px] pb-[20px]`}>
                  <div
                    className={`hover:bg-[#E5E5E5] flex items-center cursor-pointer text-md text-fontGry-600 px-[14px] py-[8px] rounded-[4px]`}
                    onClick={() => signOut()}
                  >
                    <img src={isDark ? signOutInfo.darkIcon : signOutInfo.icon} alt="" className={`mr-[10px]`} />
                    <span>{signOutInfo.text}</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div
          className={`cursor-pointer flex items-center py-[8px] px-[11px] bg-play font-bold text-md text-white dark:bg-bgDark rounded-[10px] dark:text-homehbg`}
          onClick={() => setShowDialog(true)}
        >
          <img src={loginBtn.darkIcon} alt="" className={`mr-[6px]`} />
          <span>{loginBtn.text}</span>
        </div>
      )}
      <Dialog open={showDialog} onOpenChange={(val) => setShowDialog(val)}>
        <DialogContent className={`w-[500px] bg-hbg dark:bg-bgDark rounded-[20px]`}>
          <DialogHeader>
            <DialogTitle
              className={`font-bold text-[30px] text-fontGry-600 tracking-[0.9px] text-center mt-[44px] mb-[60px] dark:text-homehbg`}
            >
              Let's get started!
            </DialogTitle>
            <DialogDescription className={`mt-[63px]`}>
              <button
                className={`cursor-pointer mx-auto w-[400px] h-[50px] flex items-center text-md text-fontGry-600 justify-center rounded-[10px] bg-white shadow-popoverShow dark:text-homehbg dark:bg-darkHomeBg`}
                onClick={() => login()}
              >
                <img src="/icons/google.svg" alt="" className={`mr-[11px]`} />
                <span>Continue with Google</span>
              </button>
              <span className={`block text-min mt-[25px] text-center dark:text-fontGry-100`}>More Sign in methods are on the way...</span>
              <span className={`block text-min text-[#bbbbbb] text-center mt-[112px] pb-[37px] dark:text-fontGry-100`}>
                By clicking "Continue", you agree
                <br />
                to the Privacy Policy and Terms of Service.
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
