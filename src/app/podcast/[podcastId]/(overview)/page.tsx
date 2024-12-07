import Pagination from '@/app/ui/pagination'
import { getEpisodeDetail, getPodcastsDetail, getPodEpisode } from '@/app/lib/service'
import { getCurrentLocalTime, getMetaData, getNoTagText, PUB_DATE, timeFormat, splitStringFromLastDash } from '@/app/lib/utils'
import { CardDes } from '@/app/ui/podcastsDetail/cardDes'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import CateItem from '@/app/ui/categories/cateItem'
import { MicrophoneIcon } from '@heroicons/react/24/outline'
import StickyPagination from '@/app/ui/podcastsDetail/stickyPagination'
import { ClientSub } from '@/app/ui/clientDispatch'
import SearchEpisodesCard from '@/app/ui/search/search-episodes-card'
import Image from '@/app/ui/Image'
export async function generateMetadata({ params, searchParams }: any, parent: ResolvingMetadata): Promise<Metadata> {
  const [title, showId] = splitStringFromLastDash(decodeURIComponent(params.podcastId))
  const { data = {} } = await getPodcastsDetail(showId)
  const { itunesAuthor, showTitle, showUrl } = data || {}
  const { pageSize = 50, page: pageNum = 1 } = searchParams || {}
  const {
    data: { resultList, total },
  } = await getPodEpisode({ showId, sortBy: PUB_DATE, pageNum, pageSize })

  return getMetaData({
    title: `${showTitle} all Episodes with AI Transcript | PodExtra.AI`,
    description: `Dive into all ${total} episodes of ${itunesAuthor}'s '${showTitle}' podcast, enhanced with AI-powered transcription and episode summaries. Discover the latest episode from ${getCurrentLocalTime(resultList[0]?.gmtPubDate)}.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}${showUrl}`,
    },
  })
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
    podcastId: string
  }
}) {
  const [title, showId] = splitStringFromLastDash(decodeURIComponent(params.podcastId))
  const { data } = await getPodcastsDetail(showId)
  console.log(data, '——————节目详情')
  const { coverUrl, itunesAuthor, showDescription, categoryList, showTitle = '', followed = false } = data || {}
  const { pageSize = 50, page: pageNum = 1 } = searchParams || {}
  const {
    data: { resultList, total },
  } = await getPodEpisode({ showId, sortBy: PUB_DATE, pageNum, pageSize })
  const totalPages = Math.ceil(+total / +pageSize)
  return (
    <main className={`flex flex-col`}>
      <ClientSub val={showTitle} />
      <div className={`flex `}>
        <Image src={coverUrl} alt="" className={`w-[250px] h-[250px] mr-[17px] rounded-10px`} />
        <div className={`flex flex-1 flex-col`}>
          <div className={`flex items-center mb-[10px]`}>
            {categoryList.map((item: any) => (
              <CateItem {...item} key={item.categoryId} />
            ))}
          </div>
          <div className={`text-lg font-semibold flex items-center mb-[5px]`}>
            <MicrophoneIcon className={`mr-[5px] w-[20px] h-[28px]`} />
            <div className={`flex-1 overflow-hidden text-fontGry-600 text-ellipsis whitespace-nowrap dark:text-homehbg`}>
              {itunesAuthor}
            </div>
          </div>
          <CardDes des={getNoTagText(showDescription)} maxLine={6} item={{ showId, followed }} />
        </div>
      </div>
      <StickyPagination totalPages={totalPages} total={total} classDom="episodeDetail" />
      {/*<div className={`py-[20px] sticky top-[57px] bg-white dark:bg-black z-[66]`}>*/}
      {/*  <Pagination totalPages={totalPages} total={total} />*/}
      {/*</div>*/}
      <div className={`border border-gray-1000 rounded-10px p-[15px] dark:border-fontGry-600`}>
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
              hiddenPodcast={true}
            />
          )
        })}
      </div>
    </main>
  )
}
