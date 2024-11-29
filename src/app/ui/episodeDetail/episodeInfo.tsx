'use client'
import { useEffect, useState } from 'react'
import { useMyContext } from '@/context/MyContext'
import { audio_info, BearerToken } from '@/app/lib/config'
import { ClockIcon, MicrophoneIcon } from '@heroicons/react/24/outline'
import { getCurrentLocalTime, splitStringFromLastDash, timeFormat } from '@/app/lib/utils'
import PlayBtn from '@/app/ui/search/play-btn'
import Link from 'next/link'
import { getEpisodeDetail } from '@/app/lib/service'

export async function EpisodeInfo({ episodeId }: { episodeId: string }) {
  const [res, setRes]: any = useState({})
  const { setTitle } = useMyContext()

  async function fetchData() {
    const { data } = await getEpisodeDetail(episodeId)
    setRes(data)
    setTitle(data.episodeTitle)
  }
  useEffect(() => {
    fetchData
  }, [])
  const { coverUrl, showCoverUrl, itunesAuthor, gmtPubDate, showTitle, duration, episodeTitle, showUrl = '' } = res || {}

  return (
    <div className={`flex `}>
      <img src={coverUrl} alt="" className={`w-[160px] h-[160px] mr-[17px] rounded-10px object-cover`} />
      <div className={`flex flex-1 flex-col overflow-hidden items-start`}>
        <div className={`text-lg font-semibold flex items-center mb-[5px]`}>
          <MicrophoneIcon className={`mr-[5px] w-[20px] h-[28px]`} />
          <div className={`flex-1 text-fontGry-600 overflow-hidden text-ellipsis whitespace-nowrap dark:text-homehbg`}>{itunesAuthor}</div>
        </div>
        <div className={`flex text-sm text-fontGry-100 overflow-hidden w-[100%]`}>
          <ClockIcon className={`w-[14px] mr-[4px]`} />
          <span className={`mr-24px`}>{timeFormat(duration)}</span>
          <span>Update: {getCurrentLocalTime(gmtPubDate, false)}</span>
        </div>
        <div className={`mt-[10px] flex items-center`}>
          {/*<PlayAudio audioInfo={data} classStyle={`mt-0 mb-0`} />*/}
          <PlayBtn item={res} />
          {/*<FlowStart item={data} />*/}
        </div>
        <Link
          href={showUrl}
          className={`border border-gray-1000 rounded-5px text-sm py-[7px] px-[15px] mt-auto flex items-center dark:border-fontGry-600 dark:text-fontGry-100`}
        >
          <span className={`shrink-0`}>from podcast</span>
          <img src={showCoverUrl} alt="" className={`w-[25px] h-[25px] rounded-5px mx-[6px]`} />
          <h2 className={`max-w-[710px] overflow-hidden text-ellipsis whitespace-nowrap`}>{showTitle}</h2>
        </Link>
      </div>
    </div>
  )
}
