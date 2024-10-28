import Pagination from '@/app/ui/pagination'
import { getPodEpisode } from '@/app/lib/service'
import { TRANSCRIPT_TIME, getMetaData, SUMMARIZE_TIME } from '@/app/lib/utils'
import { Card } from '@/app/ui/home/episodes-card'
import { Metadata } from 'next'
const y = new Date().getFullYear()
export const metadata: Metadata = getMetaData({
  title: `The Latest AI-processed episodes of  ${y - 1}-${y} ｜PodExtra.AI`,
  description: `PodExtra uses AI to transcribe and summarize the latest popular podcasts content for you, helping you quickly skim through podcast material, saving time and increasing efficiency.`,
  keywords: '',
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
  } = await getPodEpisode({ sortBy: SUMMARIZE_TIME, pageNum, pageSize })
  const totalPages = Math.ceil(+total / +pageSize)
  return (
    <main className={`flex flex-col overflow-hidden h-[100%] pb-[80px]`}>
      <Pagination totalPages={totalPages} total={total} />
      <div
        className={`flex flex-wrap border border-gray-1000 rounded-10px p-[15px] mt-[22px] flex-1 overflow-auto dark:border-fontGry-600`}
      >
        {resultList.map((item: any) => {
          return <Card key={item?.episodeId} {...item} />
        })}
      </div>
    </main>
  )
}
