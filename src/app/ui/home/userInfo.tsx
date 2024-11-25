'use client'
import Link from 'next/link'
import { useMyContext } from '@/context/MyContext'
import { useUserInfo } from '@/context/UserInfo'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import UserHead from '@/app/ui/home/userHead'
import { googleLoginPopup, revokeAccess2, client_id } from '@/app/lib/login'
// import { signIn, signOut, useSession } from 'next-auth/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { googleIdToken, BearerToken } from '@/app/lib/config'
import cookies from 'js-cookie'
import { userLogin, getUerInfo, userLoginOut } from '@/app/lib/service'
import { usePathname } from 'next/navigation'

export default function UserInfo() {
  const { isDark } = useMyContext()
  const { userInfo, setUserInfo, showDialog, setShowDialog, showLoginDialog, setShowLoginDialog } = useUserInfo()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
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
  async function useTokenToLogin() {
    const token = cookies.get(googleIdToken)
    const {
      data: { idToken },
    } = await userLogin({ idToken: token })
    cookies.set(BearerToken, idToken)
    cookies.remove(googleIdToken)
    initUserInfo()
  }
  async function initUserInfo() {
    const { data } = await getUerInfo()
    setUserInfo(data)
  }
  useEffect(() => {
    if (open) document.addEventListener('click', hiddenPopover)
    return () => {
      document.removeEventListener('click', hiddenPopover)
    }
  }, [open])
  //这是直接掉google的api
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
        // 在这里可以处理用户信息，例如将其存储在状态中
      } else {
        //accessToken过期
        if (status === 401) {
          cookies.remove(googleIdToken)
        }
      }
    } catch (error) {}
  }
  useEffect(() => {
    const accessToken = cookies.get(googleIdToken) || ''
    const token = cookies.get(BearerToken) || ''
    if (accessToken && !token) {
      // 登录获取idToken
      useTokenToLogin()
      // revokeAccess(accessToken)
    } else if (token) {
      initUserInfo()
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
    googleLoginPopup()
    // signIn('google')
    // 加载 Google Identity Services
  }

  async function signOut() {
    await userLoginOut()
    cookies.remove(BearerToken)
    cookies.remove(googleIdToken)
    //需要返回首页的页面
    const shouldBack = ['/plan-pricing']
    const backUrl = shouldBack.some((item) => pathname.endsWith(item)) ? '/home' : location.href
    revokeAccess2(backUrl)
  }

  return (
    <div className="flex items-center">
      {userInfo?.email && (
        <Link href="/plan-pricing" className={`mr-[30px] text-md text-fontGry-600 font-bold dark:text-homehbg`}>
          Pricing
        </Link>
      )}
      {userInfo?.email ? (
        <div>
          <Popover data-side="left" open={open}>
            <PopoverTrigger className={``}>
              <UserHead name={userInfo?.name.slice(0, 1)} open={openPopover} />
            </PopoverTrigger>
            <PopoverContent side="left" className={`w-[300px] border-none mt-[25px] dark:bg-bgDark`}>
              <div className={`rounded-md bg-hbg p-0 popover-content shadow-popoverShow dark:bg-bgDark`}>
                <div className={`flex items-center p-[20px] border-b-[1px] border-homehbg dark:border-fontGry-600`}>
                  <UserHead name={userInfo?.name?.slice(0, 1)} />
                  <div className={`text-md text-fontGry-600 leading-[22px] ml-[10px] flex-1 overflow-hidden`}>
                    <div className={`font-bold overflow-hidden text-ellipsis whitespace-nowrap dark:text-white`}>{userInfo?.name}</div>
                    <div className={` overflow-hidden text-ellipsis whitespace-nowrap dark:text-homehbg`}>{userInfo?.email}</div>
                  </div>
                </div>
                <div className={`px-[10px] pt-[10px] pb-[20px]`}>
                  <div
                    className={`hover:bg-[#E5E5E5] flex items-center cursor-pointer text-md text-fontGry-600 px-[14px] py-[8px] rounded-[4px] dark:text-homehbg dark:hover:bg-darkHomeBg`}
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
      <Dialog open={showDialog} onOpenChange={(val: boolean) => setShowDialog(val)}>
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
                to the{' '}
                <Link href="https://www.podextra.ai/terms.html" target="_blank">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="https://www.podextra.ai/terms.html" target="_blank">
                  Terms
                </Link>{' '}
                of Service.
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
