import Pagination from '@/app/ui/pagination'
import { getPodShow } from '@/app/lib/service'
import { getNoTagText, PUB_DATE, getCurrentLocalTime } from '@/app/lib/utils'
import Link from 'next/link'
import { Metadata } from 'next'
const y = new Date().getFullYear()
export const metadata: Metadata = {
  title: `The Latest Podcasts episodes of ${y - 1}-${y} ｜PodExtra.AI`,
  description:
    'PodExtra keeps you up-to-date with the latest podcasts from across the web in real-time, offering comprehensive tools like transcripts, mind maps, summaries, keywords, highlights, and shownotes to enrich your listening experience.',
  keywords: '',
}
export default async function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    pageSize?: string
    page?: string
  }
  params: {
    episodeId: string
  }
}) {
  return (
    <main className={`flex flex-col overflow-hidden h-[100%]`}>
      {/*<Pagination totalPages={totalPages} total={total} />*/}
      单集详情
    </main>
  )
}
