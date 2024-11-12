'use client'
import { useParams, usePathname } from 'next/navigation'
import { links } from '@/app/ui/home/nav-links'
import Breadcrumb from '@/app/ui/breadcrumb'
import { Suspense, useRef } from 'react'
import SaveScroll from '@/app/ui/save-scroll'
import { LoadingLine } from '@/app/ui/skeletons'
import { splitStringFromLastDash } from '@/app/lib/utils'
import { useMyContext } from '@/context/MyContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { title } = useMyContext()
  //这个代码不能去
  const { episodeId }: { episodeId: string } = useParams()
  const [name, id] = splitStringFromLastDash(decodeURIComponent(episodeId))
  return (
    <Suspense fallback={<LoadingLine num={12} />}>
      <SaveScroll className={`episode-item`}>
        <main>
          <Breadcrumb title={title} />
          <section className={``}>{children}</section>
        </main>
      </SaveScroll>
    </Suspense>
  )
}
