import { getEpisodeDetail, getEpisodeSummarize, getEpisodeTranscript } from '@/app/lib/service'
import { getCurrentLocalTime, timeFormat, getMetaData, splitStringFromLastDash } from '@/app/lib/utils'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import { ClockIcon, MicrophoneIcon } from '@heroicons/react/24/outline'
import { Tab } from '@/app/ui/episodeDetail/tabs'
import { tabList } from '@/app/lib/config'
import { PlayAudio } from '@/app/ui/episodeDetail/palyAudio'
import { ClientSub } from '@/app/ui/clientDispatch'
export async function generateMetadata({ params }: any, parent: ResolvingMetadata): Promise<Metadata> {
  const [name, episodeId] = splitStringFromLastDash(decodeURIComponent(params.episodeId))
  const { data } = await getEpisodeDetail(episodeId)
  const { itunesAuthor, gmtPubDate, showTitle, duration, episodeTitle } = data || {}
  return getMetaData({
    title: `${episodeTitle} | PodExtra.AI`,
    description: `Hosted by ${itunesAuthor}, the '${showTitle}' episode titled '${episodeTitle}' runs for ${timeFormat(duration)} and features AI-generated transcripts and summaries. Updated on ${getCurrentLocalTime(gmtPubDate)}.`,
  })
}
export default async function Page({
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
  const [name, episodeId] = splitStringFromLastDash(decodeURIComponent(params.episodeId))
  const { data } = await getEpisodeDetail(episodeId)
  const { coverUrl, showCoverUrl, itunesAuthor, gmtPubDate, showTitle, duration, episodeTitle, showUrl = '' } = data || {}
  const [res1, res2] = await Promise.all([getEpisodeSummarize(episodeId), getEpisodeTranscript(episodeId)])
  const summery = res1.data
  const paragraphs = res2.data?.paragraphs || []

  return (
    <main className={`flex flex-col episode-item`}>
      <ClientSub val={episodeTitle} />
      <div className={`flex `}>
        <img src={coverUrl} alt="" className={`w-[160px] h-[160px] mr-[17px] rounded-10px object-cover`} />
        <div className={`flex flex-1 flex-col overflow-hidden items-start`}>
          <div className={`text-lg font-semibold flex items-center mb-[5px]`}>
            <MicrophoneIcon className={`mr-[5px] w-[20px] h-[28px]`} />
            <div className={`flex-1 text-fontGry-600 overflow-hidden text-ellipsis whitespace-nowrap dark:text-homehbg`}>
              {itunesAuthor}
            </div>
          </div>
          <div className={`flex text-sm text-fontGry-100 overflow-hidden w-[100%]`}>
            <ClockIcon className={`w-[14px] mr-[4px]`} />
            <span className={`mr-24px`}>{timeFormat(duration)}</span>
            <span>Update: {getCurrentLocalTime(gmtPubDate, false)}</span>
          </div>
          <div>
            <PlayAudio audioInfo={data} classStyle={`mt-0 mb-0`} />
          </div>
          <Link
            href={showUrl}
            className={`border border-gray-1000 rounded-5px text-sm py-[10px] px-[15px] mt-auto flex items-center dark:border-fontGry-600 dark:text-fontGry-100`}
          >
            <span className={`shrink-0`}>from podcast</span>
            <img src={showCoverUrl} alt="" className={`w-[25px] h-[25px] rounded-5px mx-[6px]`} />
            <h2 className={`max-w-[710px] overflow-hidden text-ellipsis whitespace-nowrap`}>{showTitle}</h2>
          </Link>
        </div>
      </div>
      <div className={`mt-[13px]`}>
        <Tab tabList={tabList} data={{ ...data, ...summery, paragraphs }} />
      </div>
    </main>
  )
}
