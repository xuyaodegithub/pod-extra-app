import Pagination from '@/app/ui/pagination'
import { getPodcastsDetail, getPodEpisode } from '@/app/lib/service'
import { getNoTagText, PUB_DATE } from '@/app/lib/utils'
import { CardDes } from '@/app/ui/podcastsDetail/cardDes'
import Link from 'next/link'
import { Metadata } from 'next'
import CateItem from '@/app/ui/categories/cateItem'
import { MicrophoneIcon } from '@heroicons/react/24/outline'
import { Card } from '@/app/ui/home/episodes-card'
const y = new Date().getFullYear()
export const metadata: Metadata = {
  title: `The Latest Podcasts episodes of ${y - 1}-${y} ｜PodExtra.AI`,
  description:
    'PodExtra keeps you up-to-date with the latest podcasts from across the web in real-time, offering comprehensive tools like transcripts, mind maps, summaries, keywords, highlights, and shownotes to enrich your listening experience.',
  keywords: '',
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
  const [podcastName, showId] = decodeURIComponent(params.podcastId).split('-podcast-')
  const { data } = await getPodcastsDetail(showId)
  const { coverUrl, itunesAuthor, showDescription, categoryList } = data || {}
  const { pageSize = 50, page: pageNum = 1 } = searchParams || {}
  const {
    data: { resultList, total },
  } = await getPodEpisode({ showId, sortBy: PUB_DATE, pageNum, pageSize })
  const totalPages = Math.ceil(+total / +pageSize)
  console.log({ showId, sortBy: PUB_DATE, pageNum, pageSize }, resultList, total)
  return (
    <main className={`flex flex-col overflow-auto h-[100%] relative`}>
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
            <div className={`flex-1 overflow-hidden text-ellipsis whitespace-nowrap`}>{itunesAuthor}</div>
          </div>
          <CardDes des={getNoTagText(showDescription)} maxLine={8} />
        </div>
      </div>
      <div className={`py-[20px] sticky top-0 bg-white`}>
        <Pagination totalPages={totalPages} total={total} />
      </div>
      <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[15px] pb-[100px]`}>
        {resultList.map((item: any) => {
          return <Card key={item?.episodeId} {...item} />
        })}
      </div>
    </main>
  )
}
