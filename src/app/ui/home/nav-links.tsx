'use client'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { clsx } from 'clsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useMyContext } from '@/context/MyContext'
import { useUserInfo } from '@/context/UserInfo'
import { useEffect, useState } from 'react'
const home = { name: 'Home', href: '/home', icon: '/images/home.svg', darkIcon: '/images/darkHome.svg' }
const signIn = {
  name: 'Sign in',
  href: '',
  icon: '/images/login.svg',
  darkIcon: '/images/darkLogin.svg',
  rightIcon: '/images/rightIcon.svg',
  darkRightIcon: '/images/darkRightIcon.svg',
}

export const links = [
  {
    name: 'Popular Podcasts',
    href: '/popular-top-best-podcasts',
    icon: '/images/popular.svg',
    darkIcon: '/images/darkPopolar.svg',
  },
  { name: 'Latest Podcasts', href: '/new-latest-podcasts', icon: '/images/latest.svg', darkIcon: '/images/darkLatest.svg' },
  { name: 'Latest Episodes', href: '/new-latest-episodes', icon: '/images/latestE.svg', darkIcon: '/images/darkLatextE.svg' },
  {
    name: 'Latest AI-processed',
    href: '/latest-ai-processed-episodes',
    icon: '/images/latestAi.svg',
    darkIcon: '/images/darkLatextAi.svg',
  },
  { name: 'Categories', href: '/podcasts-categories', icon: '/images/cate.svg', darkIcon: '/images/darkCate.svg' },
]
const selectItemList = [
  { label: 'Light Mode', icon: '/icons/Shape-sun-1.svg', darkIcon: '/icons/Shape-sun-1.svg', value: 'light' },
  { label: 'Dark Mode', icon: '/icons/Shape-moon-1.svg', darkIcon: '/icons/Shape-moon-2.svg', value: 'dark' },
]
export const loginAfterLogin = [
  {
    name: 'Followed podcasts',
    href: '/followed-podcasts-updated',
    icon: '/icons/followed-podcasts.svg',
    darkIcon: '/icons/followed-podcasts-dark.svg',
  },
  { name: 'Playlist', href: '/playlist', icon: '/icons/play-circle.svg', darkIcon: '/icons/play-circle-dark.svg' },
  { name: 'Stared Episodes', href: '/stared-episodes', icon: '/icons/stared-episodes.svg', darkIcon: '/icons/stared-episodes-dark.svg' },
]
export const planPrice = {
  name: 'Plan & pricing',
  href: '/plan-pricing',
  icon: '/icons/card.svg',
  darkIcon: '/icons/card-dark.svg',
}
export default function NavLinks() {
  const { userInfo, setShowDialog } = useUserInfo()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { isDark, setIsDark } = useMyContext()
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
  function changeMode(val: string, e: any) {
    e.stopPropagation()
    const dark = val === selectItemList[1].value
    setIsDark(dark)
    setOpen(false)
    localStorage.theme = val
    if (dark) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }
  function openPopover(e: any) {
    e.stopPropagation()
    setOpen(!open)
  }
  function titleCase(str: string) {
    return <div className={`px-[14px] text-[17px] tracking-0.5px text-[#3C3C3C] mb-[9px] font-bold dark:text-darkText`}>{str}</div>
  }

  return (
    <div>
      {/*home */}
      <div className={` px-[10px]  mb-[15px]`}>
        <Link
          href={home.href}
          className={`flex px-[14px] mb-[16px] h-[40px] items-center transition duration-200 rounded-md text-md ${home.href === pathname ? 'bg-accent ext-accent-foreground' : ''} hover:bg-accent hover:text-accent-foreground`}
        >
          <img src={isDark ? home.darkIcon : home.icon} className="w-[20px] mr-[10px]" />
          <p>{home.name}</p>
        </Link>
        <div className={`ml-[14px] w-[210px] border-b-[1px] border-646410 dark:border-darkHomeBg`}></div>
      </div>
      {/*sigIn*/}
      {/*{!userInfo?.email && (*/}
      {/*  <div className={`pb-[18px] px-[10px]  mb-[15px]`} onClick={() => setShowDialog(true)}>*/}
      {/*    {titleCase('You')}*/}
      {/*    <div*/}
      {/*      className={`cursor-pointer flex px-[14px] mb-[16px] h-[40px] items-center transition duration-200 rounded-md text-md hover:bg-accent hover:text-accent-foreground`}*/}
      {/*    >*/}
      {/*      <img src={isDark ? signIn.darkIcon : signIn.icon} className="w-[20px] mr-[10px]" />*/}
      {/*      <p>{signIn.name}</p>*/}
      {/*      <img src={isDark ? signIn.darkRightIcon : signIn.rightIcon} className="w-[20px] ml-auto mr-[10px]" />*/}
      {/*    </div>*/}
      {/*    <div className={`ml-[14px] w-[210px] border-b-[1px] border-646410 dark:border-darkHomeBg`}></div>*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*loginafter*/}
      {userInfo?.email && (
        <div className={` px-[10px]  mb-[10px]`}>
          {titleCase('You')}
          {loginAfterLogin.map((link, ind: number) => (
            <Link
              key={ind}
              href={link.href}
              className={`cursor-pointer flex px-[14px] ${ind === loginAfterLogin.length - 1 ? 'mb-[16px]' : 'mb-[10px]'} h-[40px] items-center transition duration-200 rounded-md text-md ${link.href === pathname ? 'bg-accent ext-accent-foreground' : ''} hover:bg-accent hover:text-accent-foreground`}
            >
              <img src={isDark ? link.darkIcon : link.icon} className="w-[20px] mr-[10px]" />
              <p>{link.name}</p>
            </Link>
          ))}
          <div className={`ml-[14px] w-[210px] border-b-[1px] border-646410 dark:border-darkHomeBg`}></div>
        </div>
      )}
      Plan & pricing
      <div className={`px-[10px]  mb-[20px]`}>
        <Link
          href={planPrice.href}
          className={`cursor-pointer flex px-[14px] mb-[16px] h-[40px] items-center transition duration-200 rounded-md text-md ${planPrice.href === pathname ? 'bg-accent ext-accent-foreground' : ''}  hover:bg-accent hover:text-accent-foreground`}
        >
          <img src={isDark ? planPrice.darkIcon : planPrice.icon} className="w-[20px] mr-[10px]" />
          <p>{planPrice.name}</p>
        </Link>
        <div className={`ml-[14px] w-[210px] border-b-[1px] border-646410 dark:border-darkHomeBg`}></div>
      </div>
      <div className={`px-[10px]  mb-[20px]`}>
        {titleCase('Explore')}
        {links.map((link, ind: number) => {
          const LinkIcon = !isDark ? link.icon : link.darkIcon
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex px-[14px] ${ind === links.length - 1 ? 'mb-[16px]' : 'mb-[10px]'} h-[40px] items-center transition duration-200 rounded-md text-md ${link.href === pathname ? 'bg-accent ext-accent-foreground' : ''} hover:bg-accent hover:text-accent-foreground`}
            >
              <img src={LinkIcon} className="w-[20px] mr-[10px]" />
              <p>{link.name}</p>
              {/*<ChevronRightIcon className={`ml-auto w-[20px]`} />*/}
            </Link>
          )
        })}
        <div className={`ml-[14px] w-[210px] border-b-[1px] border-646410 dark:border-darkHomeBg`}></div>
      </div>
      <div>
        <div className={`font-bold text-md mb-[9px] px-[24px]`}>Setting</div>
        {/*open={open}*/}
        <Popover data-side="right" open={open}>
          <PopoverTrigger className={`px-[10px]`}>
            <div
              className={`flex px-[14px] w-[240px] h-[48px] items-center transition duration-200 rounded-md text-md hover:bg-accent hover:text-accent-foreground`}
              onClick={(event) => openPopover(event)}
            >
              <img src={`/images/${!isDark ? 'theme' : 'darkTheme'}.svg`} className="w-[20px] mr-[10px]" />
              <p>Theme</p>
              <div className={`ml-auto flex items-center`}>
                {isDark ? (
                  <img src={'/icons/Shape-moon.svg'} className={`w-[15px]`} />
                ) : (
                  <img src={'/icons/Shape-sun.svg'} className={`w-[15px]`} />
                )}
                <ChevronRightIcon className={`ml-[10px] w-[20px]`} />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent side="right">
            <div className={`rounded-md bg-bgGray dark:bg-black py-[13px] px-[10px] popover-content`}>
              {selectItemList.map((item: any, ind) => {
                const active = (item.value === selectItemList[1].value && isDark) || (item.value === selectItemList[0].value && !isDark)
                return (
                  <div
                    key={item.value}
                    className={`${active ? 'bg-play text-white' : ''} flex items-center cursor-pointer text-md rounded-[6px] ${ind === selectItemList.length - 1 ? '' : 'mb-[12px]'} dark:text-white text-fontGry-600 py-[6px] px-[15px]`}
                    onClick={(e: any) => changeMode(item.value, e)}
                  >
                    <img src={`${isDark ? item.darkIcon : item.icon}`} alt="" className={`w-[20px] h-[20px] mr-[17px]`} />
                    {item.label}
                  </div>
                )
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
