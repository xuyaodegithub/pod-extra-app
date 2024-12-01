'use client'
// import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { getCurrentLocalTime, getNoTagText, timeFormat } from '@/app/lib/utils'
import { ClockIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { summarized } from '@/app/lib/config'
export function Card({
  coverUrl,
  episodeTitle,
  gmtPubDate,
  showTitle,
  showNotes,
  episodeId,
  isHome = false,
  duration,
  isShowTitle = true,
  noMb = false,
  episodeUrl = '',
  episodeStatus = '',
}: {
  coverUrl: string
  episodeTitle: string
  gmtPubDate: any
  showTitle: any
  showNotes: any
  episodeId: string
  isHome?: boolean
  isShowTitle?: boolean
  duration: number
  noMb: boolean
  episodeUrl: string
  episodeStatus?: string
}) {
  const elementARef = useRef(null)
  const [oneline, setOneLine] = useState(false)
  useEffect(() => {
    const elA: any = elementARef.current
    setOneLine(elA.offsetHeight > 24)
  }, [])
  return (
    <Link href={episodeUrl} className={` w-[50%]`}>
      <div
        className={`flex rounded-[5px] p-[10px] ${noMb ? '' : 'mb-[5px]'} overflow-hidden cursor-pointer ${isHome ? 'hover:bg-homehbg' : 'hover:bg-hbg'} dark:hover:bg-darkHomeBg transition-all`}
      >
        <img
          src={coverUrl}
          title={episodeTitle}
          alt={episodeTitle}
          className={`mr-[6px] rounded-[10px] w-[110px] h-[110px] object-cover`}
          width={110}
          height={110}
        />
        <div className={`flex-1 flex flex-col overflow-hidden`}>
          <h3
            ref={elementARef}
            className={`text-md overflow-hidden text-ellipsis line-clamp-2 text-fontGry-600 dark:text-white`}
            title={episodeTitle}
          >
            {episodeStatus === summarized && (
              <img src="/icons/ai-ready-icon.svg" className={`inline-block h-[20px] mr-[5px] align-text-bottom`} />
            )}
            {episodeTitle}
            {/*{episodeStatus === summarized && <img src="/icons/ai-ready-icon.svg" className={`h-[20px] mr-[5px]`} />}*/}
            {/*<span className={`flex-1 overflow-hidden text-ellipsis whitespace-nowrap`}>{episodeTitle}</span>*/}
          </h3>
          <div
            className={`text-sm overflow-hidden text-ellipsis ${oneline ? 'line-clamp-2' : 'line-clamp-3'} text-fontGry-100`}
            title={getNoTagText(showNotes)}
          >
            {getNoTagText(showNotes)}
          </div>
          <div className={`flex text-sm text-fontGry-100 mt-auto overflow-hidden w-[100%]`}>
            <ClockIcon className={`w-[14px] mr-[4px]`} />
            <span className={`mr-[10px]`}>{timeFormat(duration)}</span>
            <span>{getCurrentLocalTime(gmtPubDate)}</span>
            {isShowTitle && (
              <span className={`ml-[24px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap`} title={showTitle}>
                {showTitle}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
