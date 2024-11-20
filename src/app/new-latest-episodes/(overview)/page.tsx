import Pagination from '@/app/ui/pagination'
import { getPodEpisode } from '@/app/lib/service'
import { PUB_DATE, getMetaData } from '@/app/lib/utils'
import { Card } from '@/app/ui/home/episodes-card'
import { Metadata } from 'next'
const y = new Date().getFullYear()
export const metadata: Metadata = getMetaData({
  title: `The Latest Episodes of  ${y - 1}-${y} | PodExtra.AI`,
  description: `PodExtra keeps a close eye on Latest Episodes, bringing you updates on popular Episodes as soon as they're available, ensuring that you can transcribe and summarize the content right away.`,
  keywords: '',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/new-latest-episodes`,
  },
})
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    pageSize?: string
    page?: string
  }
}) {
  const pageSize = searchParams?.pageSize || 50
  const pageNum = searchParams?.page || 1
  const {
    data: { resultList, total },
  } = await getPodEpisode({ sortBy: PUB_DATE, pageNum, pageSize })
  const totalPages = Math.ceil(+total / +pageSize)
  return (
    <main className={`flex flex-col`}>
      <div className={`sticky top-[57px] bg-white dark:bg-black pb-[22px]`}>
        <Pagination totalPages={totalPages} total={total} />
      </div>
      <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[15px] dark:border-fontGry-600`}>
        {resultList.map((item: any, ind: number) => {
          const { coverUrl, episodeTitle, gmtPubDate, showTitle, showNotes, episodeId, duration, episodeUrl = '', episodeStatus } = item
          const cardItem = {
            coverUrl,
            episodeTitle,
            gmtPubDate,
            showTitle,
            showNotes,
            episodeId,
            duration,
            episodeUrl,
            episodeStatus,
          }
          return <Card key={item?.episodeId} {...cardItem} noMb={ind >= resultList.length - 2} />
        })}
      </div>
    </main>
  )
}
