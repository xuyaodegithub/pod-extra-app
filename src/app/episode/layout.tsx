'use client'
import { useParams, usePathname } from 'next/navigation'
import { links } from '@/app/ui/home/nav-links'
import Breadcrumb from '@/app/ui/breadcrumb'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { episodeId }: { episodeId: string } = useParams()
  const [title, id] = decodeURIComponent(episodeId).split('-')
  return (
    <main className={`h-[100%] flex flex-col overflow-hidden pb-[80px]`}>
      <Breadcrumb title={title} />
      <section className={`flex-1 overflow-hidden`}>{children}</section>
    </main>
  )
}
