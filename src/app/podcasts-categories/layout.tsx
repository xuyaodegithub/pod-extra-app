'use client'
import Breadcrumb from '@/app/ui/breadcrumb'
import { useSearchParams, usePathname, useRouter, useParams } from 'next/navigation'
import { links } from '@/app/ui/home/nav-links'
import { capitalizeFirstLetter } from '@/app/lib/utils'
import { useRef } from 'react'
import useScrollRestoration from '@/hooks/useScrollRestoration'
// import { useMyContext } from '@/context/MyContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // const { data } = useMyContext()
  const params: any = useParams()
  const { categoryName = '', cateName = '' } = params
  const realCategoryName = decodeURIComponent(categoryName)
    .split('-')
    .map((i: string) => capitalizeFirstLetter(i))
    .join(' ')
  const realCateName = decodeURIComponent(cateName)
    .split('-')
    .map((i: string) => capitalizeFirstLetter(i))
    .join(' ')
  const realName = `${realCategoryName} ${realCateName ? '/ ' + realCateName : ''}`
  const title = links.find((link) => link.href === pathname)?.name || realName || '-'
  const scrollRef = useRef(null)
  useScrollRestoration(scrollRef)
  return (
    <main className={`h-[100%] flex flex-col`}>
      <Breadcrumb title={title} />
      <section className={`flex-1 overflow-auto`} ref={scrollRef}>
        {children}
      </section>
    </main>
  )
}
