import Pagination from '@/app/ui/pagination'
import { getPodEpisode } from '@/app/lib/service'
import { getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
const y = new Date().getFullYear()
import SearchEpisodesCard from '@/app/ui/search/search-episodes-card'
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
  const { instance, refresh, token } = await createServerAxios()
  const {
    data: {
      data: { resultList = [], total = 0 },
    },
  } = await instance.get(`v1/episode/my-favorite`, { params: { pageSize, pageNum, tagType: 'STAR' } })
  // const {
  //   data: { resultList = [], total = 0 },
  // } = await getPodEpisode({ pageSize, pageNum, sortBy: 'PUB_DATE' })
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
      <div className={`sticky top-[57px] bg-white dark:bg-black pb-[20px] z-[99]`}>
        <Pagination totalPages={totalPages} total={total} title="episodes" />
      </div>
      <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[14px] dark:border-fontGry-600 overflow-hidden`}>
        {resultList.map((item: any, ind: number) => {
          const {
            coverUrl,
            episodeTitle,
            gmtPubDate,
            showTitle,
            showCoverUrl,
            showNotes,
            episodeId,
            duration,
            episodeUrl,
            enclosureUrl,
            episodeStatus,
            showUrl,
          } = item
          const noMb = ind >= resultList.length - 1
          return (
            <SearchEpisodesCard
              item={{
                coverUrl,
                episodeTitle,
                gmtPubDate,
                showTitle,
                showCoverUrl,
                showNotes,
                episodeId,
                duration,
                episodeUrl,
                enclosureUrl,
                episodeStatus,
                showUrl,
              }}
              noMb={noMb}
              key={episodeId}
            />
          )
        })}
      </div>
    </main>
  )
}
