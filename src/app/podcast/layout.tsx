'use client'
import { usePathname } from 'next/navigation'
import Breadcrumb from '@/app/ui/breadcrumb'
import { useParams } from 'next/navigation'
import { Suspense, useRef } from 'react'
import { useMyContext } from '@/context/MyContext'
import { LoadingLine } from '@/app/ui/skeletons'
import SaveScroll from '@/app/ui/save-scroll'
import { splitStringFromLastDash } from '@/app/lib/utils'
export default function Layout({ children }: { children: React.ReactNode }) {
  const { title } = useMyContext()
  //这个代码不能去
  const pathname = usePathname()
  const { podcastId }: { podcastId: string } = useParams()
  const [podcastName, showId] = splitStringFromLastDash(decodeURIComponent(podcastId))
  return (
    <Suspense fallback={<LoadingLine num={12} />}>
      <SaveScroll>
        <main>
          <Breadcrumb title={title} />
          <section className={``}>{children}</section>
        </main>
      </SaveScroll>
    </Suspense>
  )
}
