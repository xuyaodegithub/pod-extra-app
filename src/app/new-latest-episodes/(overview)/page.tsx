import Pagination from '@/app/ui/pagination'
import { getPodEpisode } from '@/app/lib/service'
import { PUB_DATE } from '@/app/lib/utils'
import { Card } from '@/app/ui/home/episodes-card'
import { Metadata } from 'next'
const y = new Date().getFullYear()
export const metadata: Metadata = {
  title: `The Latest Episodes episodes of  ${y - 1}-${y} ｜PodExtra.AI`,
  description: `PodExtra keeps a close eye on Latest Episodes, bringing you updates on popular Episodes as soon as they're available, ensuring that you can transcribe and summarize the content right away.`,
  keywords: '',
}
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
    <main className={`flex flex-col overflow-hidden h-[100%]`}>
      <Pagination totalPages={totalPages} total={total} />
      <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[25px] mt-[22px] overflow-auto pb-[100px]`}>
        {resultList.map((item: any) => {
          return <Card key={item?.episodeId} {...item} />
        })}
      </div>
    </main>
  )
}
