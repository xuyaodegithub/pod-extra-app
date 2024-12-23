'use client'
import { useMyContext } from '@/context/MyContext'

export default function MoreAiProcess({ des, className }: { des: string; className?: string }) {
  const { isDark } = useMyContext()
  return (
    <div
      className={`${className} flex items-center w-[300px] mx-auto text-sm text-fontGry-600 dark:text-[#c8c8c8]`}
      style={{
        background: isDark
          ? ''
          : 'linear-gradient(270deg, rgba(240, 240, 240, 0.05) 0%, rgba(240, 240, 240, 0.80) 49.5%, rgba(240, 240, 240, 0.05) 100%)',
      }}
    >
      <span className={`mr-[10px]`}>-</span> more AI-processed {des} <span className={`ml-[10px]`}>-</span>
    </div>
  )
}
