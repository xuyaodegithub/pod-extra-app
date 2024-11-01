'use client'
import { useParams, usePathname } from 'next/navigation'
import { links } from '@/app/ui/home/nav-links'
import Breadcrumb from '@/app/ui/breadcrumb'
import { useRef } from 'react'
import useScrollRestoration from '@/hooks/useScrollRestoration'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { episodeId }: { episodeId: string } = useParams()
  const [title, id] = decodeURIComponent(episodeId).split('-')
  const scrollRef = useRef(null)
  useScrollRestoration(scrollRef)
  return (
    <main className={`h-[100%] flex flex-col overflow-auto relative pb-[100px]`} ref={scrollRef}>
      <Breadcrumb title={title} />
      <section className={``}>{children}</section>
    </main>
  )
}
