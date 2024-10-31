'use client'
import { usePathname } from 'next/navigation'
import Breadcrumb from '@/app/ui/breadcrumb'
import { useParams } from 'next/navigation'
import { useRef } from 'react'
import useScrollRestoration from '@/hooks/useScrollRestoration'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { podcastId }: { podcastId: string } = useParams()
  const [podcastName, showId] = decodeURIComponent(podcastId).split('-podcast-')
  const scrollRef = useRef(null)
  useScrollRestoration(scrollRef)
  return (
    <main className={`h-[100%] flex flex-col overflow-auto relative pb-[100px]`} ref={scrollRef}>
      <Breadcrumb title={podcastName} />
      <section className={``}>{children}</section>
    </main>
  )
}
