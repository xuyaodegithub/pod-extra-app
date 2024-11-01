'use client'
import { useParams, usePathname } from 'next/navigation'
import { links } from '@/app/ui/home/nav-links'
import Breadcrumb from '@/app/ui/breadcrumb'
import { Suspense, useRef } from 'react'
import SaveScroll from '@/app/ui/save-scroll'
import { LoadingLine } from '@/app/ui/skeletons'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { episodeId }: { episodeId: string } = useParams()
  const [title, id] = decodeURIComponent(episodeId).split('-')
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
