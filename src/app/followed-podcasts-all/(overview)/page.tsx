import Pagination from '@/app/ui/pagination'
import { getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
const y = new Date().getFullYear()
import SearchPodcastCard from '@/app/ui/search/search-podcast-card'
import { createServerAxios } from '@/app/lib/serveFetch'

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
  const { pageSize = 50, page: pageNum = 1 } = searchParams || {}
  const { instance } = await createServerAxios()
  const {
    data: {
      data: { resultList = [], total = 0 },
    },
  } = await instance.get(`v1/podcast/my-favorite`, { params: { pageSize, pageNum, sortBy: 'TAG_DATE' } })
  const totalPages = Math.ceil(+total / +pageSize)
  return (
    <main className="flex flex-col mt-[3px]">
      <div className={`flex items-center mb-[20px]`}>
        <Link
          href={'/followed-podcasts-updated'}
          className={`text-sm font-semibold px-[10px] text-fontGry-600 py-[8px] bg-bgGray mr-[13px] rounded-[10px]`}
        >
          Updated episodes
        </Link>
        <Link href={''} className={`text-sm font-semibold text-white px-[10px] py-[8px] bg-play rounded-[10px]`}>
          All podcasts
        </Link>
      </div>
      <div className={`sticky top-[57px] bg-white dark:bg-black pb-[22px] z-[99]`}>
        <Pagination totalPages={totalPages} total={total} title="episodes" />
      </div>
      {!!resultList?.length ? (
        <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[14px] dark:border-fontGry-600 overflow-hidden`}>
          {resultList?.map((item: any, ind: number) => {
            const { coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate, showUrl, followed } = item
            const noMb = ind >= resultList.length - 1
            return (
              <SearchPodcastCard
                item={{ coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate, showUrl, followed }}
                noMb={noMb}
                key={showId}
              />
            )
          })}
        </div>
      ) : (
        <div
          className={`text-sm text-fontGry-600 leading-[100px] text-center border-[1px] border-bgGray rounded-[10px] dark:border-fontGry-600 dark:text-fontGry-100`}
        >
          No podcast followed yet.
        </div>
      )}
    </main>
  )
}
