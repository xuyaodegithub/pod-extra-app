'use client'
import { useMyContext } from '@/context/MyContext'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'

export default function SearchEpisodes() {
  const { isDark } = useMyContext()
  return (
    <div>
      <div className={`flex items-center mb-[12px] text-lg text-fontGry-600 ml-[24px] font-bold cursor-pointer`}>
        <div className={`${styles.hoverBBorder} dark:text-white`}>Episodes</div>
        <ChevronRightIcon className={`ml-[10px] w-[20px] dark:text-white`} />
      </div>
      <div className={`border-[1px] border-bgGray rounded-[10px] p-[14px] dark:border-fontGry-600`}></div>
    </div>
  )
}
