'use client'
import { useMyContext } from '@/context/MyContext'
import Pagination from '@/app/ui/pagination'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function StickyPagination({ totalPages, total, classDom }: { totalPages: number; total: number; classDom?: string }) {
  const [top, setTop] = useState(57)
  const { isDark } = useMyContext()
  useEffect(() => {
    if (classDom) {
      setTimeout(() => {
        const dom: any = document.querySelector(`.${classDom}`)
        const h = dom.offsetHeight
        setTop(h)
      }, 100)
    }
    return () => {}
  }, [classDom])
  return (
    <div className={`py-[20px] sticky bg-white dark:bg-black z-[66]`} style={{ top: `${top}px` }}>
      <Pagination totalPages={totalPages} total={total} />
    </div>
  )
}
