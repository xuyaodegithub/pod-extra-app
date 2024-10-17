import Pagination from '@/app/ui/pagination'
import { getEpisodeDetail, getEpisodeSummarize, getEpisodeTranscript } from '@/app/lib/service'
import { getCurrentLocalTime } from '@/app/lib/utils'
import Link from 'next/link'
import { Metadata } from 'next'
import { ClockIcon, MicrophoneIcon } from '@heroicons/react/24/outline'
const y = new Date().getFullYear()
import { Tab } from '@/app/ui/episodeDetail/tabs'
import { tabList } from '@/app/lib/config'
import { PlayAudio } from '@/app/ui/episodeDetail/palyAudio'

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
    episodeId: string
  }
}) {
  const [episodeName, episodeId] = decodeURIComponent(params.episodeId).split('-')
  const { data = {} } = await getEpisodeDetail(episodeId)
  const { coverUrl, itunesAuthor, gmtPubDate, showTitle } = data || {}
  const [res1, res2] = await Promise.all([getEpisodeSummarize(episodeId), getEpisodeTranscript(episodeId)])
  const summery = res1.data
  const sentences = res2.data?.sentences || []
  return (
    <main className={`flex flex-col overflow-auto h-[100%] relative episode-item`}>
      <div className={`flex `}>
        <img src={coverUrl} alt="" className={`w-[160px] h-[160px] mr-[17px] rounded-10px object-cover`} />
        <div className={`flex flex-1 flex-col overflow-hidden`}>
          <div className={`text-lg font-semibold flex items-center mb-[5px]`}>
            <MicrophoneIcon className={`mr-[5px] w-[20px] h-[28px]`} />
            <div className={`flex-1 text-fontGry-600 overflow-hidden text-ellipsis whitespace-nowrap`}>{itunesAuthor}</div>
          </div>
          <div className={`flex text-sm text-fontGry-100 overflow-hidden w-[100%]`}>
            <ClockIcon className={`w-[14px] mr-[4px]`} />
            <span className={`mr-24px`}>{getCurrentLocalTime(gmtPubDate, true)}</span>
            <span>Update: {getCurrentLocalTime(gmtPubDate, false)}</span>
          </div>
          <div>
            <PlayAudio audioInfo={data} />
          </div>
          <div className={`border border-gray-1000 rounded-5px text-sm py-[10px] px-[15px] mt-auto flex items-center`}>
            <span>All Episodes from</span>
            <img src={coverUrl} alt="" className={`w-[25px] h-[25px] rounded-5px mx-[6px]`} />
            <span className={`flex-1 overflow-hidden text-ellipsis whitespace-nowrap`}>{showTitle}</span>
          </div>
        </div>
      </div>
      <div className={`mt-[13px]`}>
        <Tab tabList={tabList} data={{ ...data, ...summery, sentences }} />
      </div>
    </main>
  )
}
