import Pagination from '@/app/ui/pagination'
import { getPodShow } from '@/app/lib/service'
import { getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
const y = new Date().getFullYear()
export const metadata: Metadata = getMetaData({
  title: `Followed Podcasts | PodExtra.AI`,
  description: `Check out the podcasts you've followed. PodExtra's features like transcripts, etc., enable quick access and better experience. All your followed podcasts are ready for you to dive into again.`,
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
    <main className="flex flex-col mt-[3px]">
      <div className={`flex items-center mb-[20px]`}>
        <Link href={''} className={`text-sm font-semibold text-white px-[10px] py-[8px] bg-play mr-[13px] rounded-[10px]`}>
          Updated episodes
        </Link>
        <Link
          href={'/followed-podcasts-all'}
          className={`text-sm font-semibold text-fontGry-600 px-[10px] py-[8px] bg-bgGray rounded-[10px]`}
        >
          All podcasts
        </Link>
      </div>
      <div className={`sticky top-[40px] bg-white dark:bg-black pb-[22px]`}>
        <Pagination totalPages={totalPages} total={total} title="episodes" />
      </div>
      <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[14px] dark:border-fontGry-600`}></div>
    </main>
  )
}
