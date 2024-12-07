import { getEpisodeDetail, getEpisodeSummarize, getEpisodeTranscript } from '@/app/lib/service'
import { getCurrentLocalTime, timeFormat, getMetaData, splitStringFromLastDash } from '@/app/lib/utils'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import { Tab } from '@/app/ui/episodeDetail/tabs'
import { tabList } from '@/app/lib/config'
import PlayBtn from '@/app/ui/search/play-btn'
import FlowStart from '@/app/ui/search/flow-start'
import { ClientSub } from '@/app/ui/clientDispatch'
import Icon from '@/app/ui/episodeDetail/Icon'
import { createServerAxios } from '@/app/lib/serveFetch'
import Image from '@/app/ui/Image'
// 在目标页面处理 Action
export async function generateMetadata({ params }: any, parent: ResolvingMetadata): Promise<Metadata> {
  const [name, episodeId] = splitStringFromLastDash(decodeURIComponent(params.episodeId))
  const { data } = await getEpisodeDetail(episodeId)
  const { itunesAuthor, gmtPubDate, showTitle, duration, episodeTitle, episodeUrl } = data || {}
  return getMetaData({
    title: `${episodeTitle} | PodExtra.AI`,
    description: `Hosted by ${itunesAuthor}, the '${showTitle}' episode titled '${episodeTitle}' runs for ${timeFormat(duration)} and features AI-generated transcripts and summaries. Updated on ${getCurrentLocalTime(gmtPubDate)}.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}${episodeUrl}`,
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
    episodeId: string
  }
}) {
  const pageSize = searchParams?.pageSize || 50
  const pageNum = searchParams?.page || 1
  const [name, episodeId] = splitStringFromLastDash(decodeURIComponent(params.episodeId))
  // const { data } = await getEpisodeDetail(episodeId, token, { pageNum, pageSize })
  const { instance, refresh, token, refreshToken } = await createServerAxios()
  const {
    data: { data },
  } = await instance.get(`v1/podEpisode/${episodeId}`)
  console.log(data, '---单集详情')
  const { coverUrl, showCoverUrl, itunesAuthor, gmtPubDate, showTitle, duration, episodeTitle, showUrl = '' } = data || {}
  return (
    <main className={`flex flex-col episode-item`}>
      <ClientSub val={episodeTitle} param={{ pageSize, pageNum }} cookie={{ refresh, token, refreshToken }} />
      <div className={`flex `}>
        <Image src={coverUrl} alt="" className={`w-[160px] h-[160px] mr-[17px] rounded-10px object-cover`} />
        <div className={`flex flex-1 flex-col overflow-hidden items-start text-md`}>
          <div className={`text-lg font-normal flex items-center mb-[10px] leading-[22px]`}>
            <Icon path="mic" />
            <div className={`flex-1 text-fontGry-600 overflow-hidden text-ellipsis whitespace-nowrap dark:text-homehbg`}>
              {itunesAuthor}
            </div>
          </div>
          <div className={`flex text-fontGry-600 dark:text-fontGry-100 overflow-hidden w-[100%] text-md leading-[22px]`}>
            <Icon path="time-clock" />
            <span className={`mr-[17px]`}>{timeFormat(duration)}</span>
            <span>Update: {getCurrentLocalTime(gmtPubDate, false)}</span>
          </div>
          <div className={`mt-[10px] flex items-center`}>
            {/*<PlayAudio audioInfo={data} classStyle={`mt-0 mb-0`} />*/}
            <PlayBtn item={data} />
            <FlowStart item={data} />
          </div>
          <Link
            href={showUrl}
            className={`border border-gray-1000 rounded-5px text-sm py-[7px] px-[15px] mt-auto flex items-center dark:border-fontGry-600 dark:text-fontGry-100`}
          >
            <span className={`shrink-0`}>from podcast</span>
            <Image src={showCoverUrl} alt="" className={`w-[25px] h-[25px] rounded-5px mx-[6px]`} />
            <h2 className={`max-w-[710px] overflow-hidden text-ellipsis whitespace-nowrap`}>{showTitle}</h2>
          </Link>
        </div>
      </div>
      <div className={`mt-[13px]`}>
        <Tab tabList={tabList} data={{ ...data }} />
      </div>
    </main>
  )
}
