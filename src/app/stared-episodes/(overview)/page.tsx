import Pagination from '@/app/ui/pagination'
import { getPodShow } from '@/app/lib/service'
import { getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
const y = new Date().getFullYear()
export const metadata: Metadata = getMetaData({
  title: `The Latest Episodes of  ${y - 1}-${y} | PodExtra.AI`,
  description: `PodExtra keeps a close eye on Latest Episodes, bringing you updates on popular Episodes as soon as they're available, ensuring that you can transcribe and summarize the content right away.`,
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
  const { pageSize = 10, page: pageNum = 1 } = searchParams || {}
  const {
    data: { resultList = [], total = 0 },
  } = await getPodShow({ pageSize, pageNum, sortBy: 'PUB_DATE' })
  const totalPages = Math.ceil(+total / +pageSize)
  return (
    <main className="flex flex-col">
      <div className={`sticky top-[40px] bg-white dark:bg-black pb-[22px]`}>
        <Pagination totalPages={totalPages} total={total} title="podcasts" />
      </div>
      <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[14px] dark:border-fontGry-600`}></div>
    </main>
  )
}
