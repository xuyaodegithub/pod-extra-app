'use client'
// import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { formatTime } from '@/app/lib/utils'

export function Card({
  coverUrl,
  episodeTitle,
  des,
  gmtPubDate,
  showTitle,
  showNotes,
}: {
  coverUrl: string
  episodeTitle: string
  des: string
  gmtPubDate: any
  showTitle: any
  showNotes: any
}) {
  const elementARef = useRef(null)
  const [oneline, setOneLine] = useState(false)
  useEffect(() => {
    const elA: any = elementARef.current
    setOneLine(elA.offsetHeight > 24)
  }, [])
  return (
    <div className="flex rounded-[5px] w-[50%] mb-[25px] pr-[12px] overflow-hidden cursor-pointer">
      <img
        src={coverUrl}
        title={episodeTitle}
        alt={episodeTitle}
        className={`mr-[6px] rounded-[5px] w-[110px] h-[110px]`}
        width={110}
        height={110}
      />
      <div className={`flex-1 flex flex-col overflow-hidden`}>
        <div ref={elementARef} className={`text-md overflow-hidden text-ellipsis line-clamp-2 text-fontGry-600`} title={episodeTitle}>
          {episodeTitle}
        </div>
        <div
          className={`text-sm overflow-hidden text-ellipsis ${oneline ? 'line-clamp-2' : 'line-clamp-3'} line-clamp-2 text-fontGry-100`}
          title={showNotes}
        >
          {showNotes}
        </div>
        <div className={`flex text-sm text-fontGry-100 mt-auto overflow-hidden w-[100%]`}>
          <span>{formatTime(gmtPubDate / 1000, 'hh:mm:ss  dd/MM/yyyy')}</span>
          <span className={`ml-[24px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap`}>{showTitle}</span>
        </div>
      </div>
    </div>
  )
}
