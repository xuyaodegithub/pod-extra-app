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
import { useState } from 'react'
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
  { label: 'Light Mode', icon: '', value: 'light' },
  { label: 'Dark Mode', icon: '', value: 'dark' },
]
export default function NavLinks() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { isDark, setIsDark } = useMyContext()
  function changeMode(val: string) {
    const dark = val === selectItemList[1].value
    setIsDark(dark)
    setOpen(false)
    localStorage.theme = val
    if (dark) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }
  return (
    <div>
      <div className={`pb-[18px] border-b-[1px] border-fontGry-600 mb-[15px]`}>
        {links.map((link) => {
          const LinkIcon = !isDark ? link.icon : link.darkIcon
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex px-[14px] h-[48px] items-center transition duration-200 rounded-md text-md ${link.href === pathname ? 'bg-accent ext-accent-foreground' : ''} hover:bg-accent hover:text-accent-foreground`}
            >
              <img src={LinkIcon} className="w-[20px] mr-[10px]" />
              <p>{link.name}</p>
              <ChevronRightIcon className={`ml-auto w-[20px]`} />
            </Link>
          )
        })}
      </div>
      <div>
        <div className={`font-bold text-md mb-[9px] px-[14px]s`}>Setting</div>
        {/*open={open}*/}
        <Popover data-side="right">
          <PopoverTrigger>
            <div
              className={`flex px-[14px] w-[240px] h-[48px] items-center transition duration-200 rounded-md text-md hover:bg-accent hover:text-accent-foreground`}
              onClick={() => setOpen(!open)}
            >
              <img src={`/images/${!isDark ? 'theme' : 'darkTheme'}.svg`} className="w-[20px] mr-[10px]" />
              <p>Theme</p>
              <div className={`ml-auto flex items-center`}>
                {isDark ? <MoonIcon className={`w-[14px]`} /> : <SunIcon className={`w-[14px]`} />}
                <ChevronRightIcon className={`ml-[10px] w-[20px]`} />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent side="right">
            <div className={`rounded-md bg-bgGray dark:bg-black py-[13px] px-[10px]`}>
              {selectItemList.map((item: any) => {
                const active = (item.value === selectItemList[1].value && isDark) || (item.value === selectItemList[0].value && !isDark)
                return (
                  <div
                    key={item.value}
                    className={`${active ? 'bg-play text-white' : ''} flex items-center cursor-pointer text-md rounded-[6px] mb-[12px] dark:text-white text-fontGry-600 py-[6px] px-[15px]`}
                    onClick={() => changeMode(item.value)}
                  >
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
