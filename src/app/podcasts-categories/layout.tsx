'use client'
import Breadcrumb from '@/app/ui/breadcrumb'
import { usePathname, useParams } from 'next/navigation'
import { links } from '@/app/ui/home/nav-links'
import { capitalizeFirstLetter } from '@/app/lib/utils'
import { Suspense, useRef } from 'react'
import { LoadingLine } from '@/app/ui/skeletons'
import SaveScroll from '@/app/ui/save-scroll'
import {useMyContext} from "@/context/MyContext";
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
  const { title } = useMyContext()
  // const realName = `${realCategoryName} ${realCateName ? '/ ' + realCateName : ''} Podcasts`
  const lastTitle = links.find((link) => link.href === pathname)?.name || title || '-'
  return (
    <Suspense fallback={<LoadingLine num={12} />}>
      <SaveScroll>
        <main>
          <Breadcrumb title={lastTitle} />
          <section>{children}</section>
        </main>
      </SaveScroll>
    </Suspense>
  )
}
