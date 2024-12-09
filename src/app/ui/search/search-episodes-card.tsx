'use client'
import { useMyContext } from '@/context/MyContext'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCurrentLocalTime, getNoTagText, getTimeWithHoursMin } from '@/app/lib/utils'
import { audio_info, summarized } from '@/app/lib/config'
import { useRouter } from 'next/navigation'
import PlayBtn from '@/app/ui/search/play-btn'
import FlowStart from '@/app/ui/search/flow-start'
import Image from '@/app/ui/Image'

export default function SearchPodcastCard({
  item,
  noMb,
  hiddenPodcast,
  isFirst,
}: {
  item: any
  noMb: boolean
  hiddenPodcast?: boolean
  isFirst?: boolean
}) {
  const { isDark } = useMyContext()
  const { data, setData, isPlaying, setIsPlaying } = useMyContext()
  const { push, refresh } = useRouter()
  const { enclosureUrl: url = '' } = data || {}
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
  const des = getNoTagText(showNotes)
  function toPodcast(e: Event) {
    e.preventDefault()
    push(showUrl)
  }

  useEffect(() => {
    if (isFirst) {
      refresh()
    }
  }, [])
  return (
    <div className={` relative ${noMb ? '' : 'pb-[5px] mb-[5px]'}`}>
      <Link href={episodeUrl} key={episodeId} className={``}>
        <div className={`flex cursor-pointer overflow-hidden  hover:bg-hbg dark:hover:bg-darkHomeBg transition-all p-[10px] rounded-10px`}>
          <Image src={coverUrl} alt="" className={`w-[130px] h-[130px] object-cover rounded-10px`} />
          <div className={`flex-1 ml-[10px] overflow-hidden flex flex-col`}>
            <div className={`flex mb-[5px] text-sm text-fontGry-600 items-center dark:text-fontGry-100`}>
              <div className={`mr-[20px]`}>{getCurrentLocalTime(gmtPubDate)}</div>
              {!hiddenPodcast && (
                <div className={`flex items-center flex-1`} onClick={(e: any) => toPodcast(e)}>
                  <Image src={showCoverUrl} alt="" className={`w-[20px] h-[20px] mr-[5px] rounded-[5px]`} />
                  <span className={`flex-1 overflow-hidden whitespace-nowrap text-ellipsis`}>{showTitle}</span>
                </div>
              )}
            </div>
            <h3 className={`flex items-center  text-fontGry-600 text-md dark:text-white`} title={episodeTitle}>
              {episodeStatus === summarized && <img src="/icons/ai-ready-icon.svg" className={`h-[20px] mr-[5px]`} />}
              <span className={`flex-1 overflow-hidden text-ellipsis whitespace-nowrap`}>{episodeTitle}</span>
            </h3>
            <div className={`text-sm overflow-hidden text-ellipsis line-clamp-2 text-fontGry-100`} title={des}>
              {des}
            </div>
            <div className={`flex items-center mt-auto`}>
              <PlayBtn item={item} />
              <FlowStart item={item} />
            </div>
          </div>
        </div>
      </Link>
      {!noMb && <div className={`border-b-[1px] border-bgGray absolute left-[10px] bottom-0 right-[10px] dark:border-fontGry-600`}></div>}
    </div>
  )
}
