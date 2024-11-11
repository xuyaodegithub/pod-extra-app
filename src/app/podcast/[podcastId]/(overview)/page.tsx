import Pagination from '@/app/ui/pagination'
import { getEpisodeDetail, getPodcastsDetail, getPodEpisode } from '@/app/lib/service'
import { getCurrentLocalTime, getMetaData, getNoTagText, PUB_DATE, timeFormat, splitStringFromLastDash } from '@/app/lib/utils'
import { CardDes } from '@/app/ui/podcastsDetail/cardDes'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import CateItem from '@/app/ui/categories/cateItem'
import { MicrophoneIcon } from '@heroicons/react/24/outline'
import { Card } from '@/app/ui/home/episodes-card'
export async function generateMetadata({ params, searchParams }: any, parent: ResolvingMetadata): Promise<Metadata> {
  const [podcastName, showId] = splitStringFromLastDash(decodeURIComponent(params.podcastId))
  const { data = {} } = await getPodcastsDetail(showId)
  console.log(showId, 'sssssssss', data)
  const { itunesAuthor } = data || {}
  const { pageSize = 50, page: pageNum = 1 } = searchParams || {}
  const {
    data: { resultList, total },
  } = await getPodEpisode({ showId, sortBy: PUB_DATE, pageNum, pageSize })

  return getMetaData({
    title: `${podcastName} all Episodes with AI Transcript | PodExtra.AI`,
    description: `Dive into all ${total} episodes of ${itunesAuthor}'s '${podcastName}' podcast, enhanced with AI-powered transcription and episode summaries. Discover the latest episode from ${getCurrentLocalTime(resultList[0]?.gmtPubDate)}.`,
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
  const [podcastName, showId] = splitStringFromLastDash(decodeURIComponent(params.podcastId))
  const { data } = await getPodcastsDetail(showId)
  const { coverUrl, itunesAuthor, showDescription, categoryList } = data || {}
  const { pageSize = 50, page: pageNum = 1 } = searchParams || {}
  const {
    data: { resultList, total },
  } = await getPodEpisode({ showId, sortBy: PUB_DATE, pageNum, pageSize })
  const totalPages = Math.ceil(+total / +pageSize)
  return (
    <main className={`flex flex-col`}>
      <div className={`flex `}>
        <img src={coverUrl} alt="" className={`w-[250px] h-[250px] mr-[17px] rounded-10px`} />
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
          <CardDes des={getNoTagText(showDescription)} maxLine={8} />
        </div>
      </div>
      <div className={`py-[20px] sticky top-[57px] bg-white dark:bg-black`}>
        <Pagination totalPages={totalPages} total={total} />
      </div>
      <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[15px] dark:border-fontGry-600`}>
        {resultList.map((item: any, ind: number) => {
          const { coverUrl, episodeTitle, gmtPubDate, showTitle, showNotes, episodeId, duration, episodeUrl = '' } = item
          const cardItem = {
            coverUrl,
            episodeTitle,
            gmtPubDate,
            showTitle,
            showNotes,
            episodeId,
            duration,
            episodeUrl,
          }
          return <Card key={item?.episodeId} {...cardItem} isShowTitle={false} noMb={ind >= resultList.length - 2} />
        })}
      </div>
    </main>
  )
}
