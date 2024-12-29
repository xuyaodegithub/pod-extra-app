import Pagination from '@/app/ui/pagination'
import { getEpisodeDetail, getPodcastsDetail, getPodEpisode } from '@/app/lib/service'
import { getCurrentLocalTime, getMetaData, getNoTagText, PUB_DATE, timeFormat, splitStringFromLastDash } from '@/app/lib/utils'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import { ClientSub } from '@/app/ui/clientDispatch'
import SearchEpisodesCard from '@/app/ui/search/search-episodes-card'
import Image from '@/app/ui/Image'
import { createServerAxios } from '@/app/lib/serveFetch'
import { summarized } from '@/app/lib/config'
import TagCardItem from '@/app/ui/ladingPage/tagCardItem'
export async function generateMetadata({ params, searchParams }: any, parent: ResolvingMetadata): Promise<Metadata> {
  const [title, tagId] = splitStringFromLastDash(decodeURIComponent(params.tagId))

  return getMetaData({
    title: `# ${title} Related Episodes and Podcasts | PodExtra.AI`,
    description: `Dive into all # ${title} related episodes and podcasts, enhanced with AI-powered transcription, summaries, takeaways, topics, mindmaps, outlines, keywords and highlights.`,
    keywords: `[tag名称], episodes, podcast summaries, podcast transcripts, AI transcription, mind maps, outlines, highlights, takeaways`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/tag/${title}-${tagId}`,
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
    tagId: string
  }
}) {
  const { instance, refresh, token, refreshToken } = await createServerAxios()
  const [tagName, tagId] = splitStringFromLastDash(decodeURIComponent(params.tagId))
  const { pageSize = 50, page: pageNum = 1 } = searchParams || {}
  const {
    data: { data },
  } = await instance.get(`v1/tag/${tagId}/page-query-episodes`, { params: { pageNum, pageSize } }) //getPodcastsDetail(showId)
  const { total = 0, resultList = [] } = data || {}
  const totalPages = Math.ceil(+total / +pageSize)
  return (
    <main className={`flex flex-col`}>
      {/*<ClientSub val={showTitle} />*/}
      <div className={`flex `}></div>
      <div className={`sticky top-[60px] bg-white dark:bg-black pb-[20px] z-[99]`}>
        <Pagination totalPages={totalPages} total={total} title="episodes" />
      </div>
      <div className={`border-[1px] border-gray-1000 rounded-10px p-[10px] dark:border-fontGry-600`}>
        {resultList?.map((card: any, index: number) => (
          <TagCardItem card={card} key={index} isDetail isLast={index === resultList?.length - 1} />
        ))}
      </div>
    </main>
  )
}
