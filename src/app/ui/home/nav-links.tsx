'use client'
import {
  HomeIcon,
  SignalIcon,
  MicrophoneIcon,
  NewspaperIcon,
  StarIcon,
  Squares2X2Icon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { clsx } from 'clsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useMyContext } from '@/context/MyContext'
import { useEffect, useState } from 'react'
export const links = [
  { name: 'Home', href: '/home', icon: '/images/home.svg', darkIcon: '/images/darkHome.svg' },
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
export default function NavLinks() {
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
  return (
    <div>
      <div className={`pb-[18px] px-[10px]  mb-[15px]`}>
        {links.map((link) => {
          const LinkIcon = !isDark ? link.icon : link.darkIcon
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex px-[14px] mb-[10px] h-[40px] items-center transition duration-200 rounded-md text-md ${link.href === pathname ? 'bg-accent ext-accent-foreground' : ''} hover:bg-accent hover:text-accent-foreground`}
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
