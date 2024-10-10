'use client'
import { usePathname } from 'next/navigation'
import Breadcrumb from '@/app/ui/breadcrumb'
import { useParams } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { podcastId }: { podcastId: string } = useParams()
  const [podcastName, showId] = decodeURIComponent(podcastId).split('-podcast-')
  return (
    <main className={`h-[100%] flex flex-col`}>
      <Breadcrumb title={podcastName} />
      <section className={`flex-1 overflow-hidden`}>{children}</section>
    </main>
  )
}
