import Pagination from '@/app/ui/pagination'
import { getPodEpisode } from '@/app/lib/service'
import { getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
const y = new Date().getFullYear()
import SearchEpisodesCard from '@/app/ui/search/search-episodes-card'
import { createServerAxios } from '@/app/lib/serveFetch'
export const metadata: Metadata = getMetaData({
  title: `Starred Episodes | PodExtra.AI`,
  description: `On the Starred Episodes page, view your favorite podcast episodes. PodExtra's features like transcripts, etc., help you quickly browse. All your starred ones are ready for you to revisit and enjoy.`,
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
  } = await instance.get(`v1/episode/my-favorite`, { params: { pageSize, pageNum, tagType: 'STAR' } })
  console.log(resultList, total, 'stared-episodes')
  const totalPages = Math.ceil(+total / +pageSize)
  return (
    <main className="flex flex-col mt-[3px]">
      <div className={`sticky top-[57px] bg-white dark:bg-black pb-[22px] z-[99]`}>
        <Pagination totalPages={totalPages} total={total} title="episodes" />
      </div>
      {!!resultList?.length ? (
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
              star,
              currentPosition,
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
                  star,
                  currentPosition,
                }}
                noMb={noMb}
                key={episodeId}
                isFirst={ind === 0}
              />
            )
          })}
        </div>
      ) : (
        <div
          className={`text-sm text-fontGry-600 leading-[100px] text-center border-[1px] border-bgGray rounded-[10px] dark:border-fontGry-600 dark:text-fontGry-100`}
        >
          No episode starred yet.
        </div>
      )}
    </main>
  )
}
