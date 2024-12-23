'use client'
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { timeFormatter, getCurrentLocalTime, getNoTagText } from '@/app/lib/utils'
import { useMyContext } from '@/context/MyContext'
import Image from '@/app/ui/Image'
import Link from 'next/link'
import { summarized } from '@/app/lib/config'

export default function TagCardItem({ card, isDetail }: { card: any; isDetail?: boolean }) {
  const { isDark } = useMyContext()
  const {
    coverUrl,
    gmtPubDate,
    showTitle,
    episodeTitle,
    summary,
    takeaway = [],
    tags = [],
    episodeStatus,
    showNotes,
    currentTagName,
    currentTagText,
    episodeUrl,
    showUrl,
  } = card

  return (
    <div className={`flex mb-[10px] p-[10px] items-center hover:bg-[#F8F8F8] rounded-[5px] dark:hover:bg-bgDark tagCardItem`}>
      <Image src={coverUrl} className={`mr-[10px] self-start w-[50px] h-[50px] rounded-[10px]`} />
      <div className={`flex-1 text-sm text-fontGry-600 overflow-hidden dark:text-homehbg`}>
        <div className={`flex`}>
          <span className={`mr-[20px]`}>{getCurrentLocalTime(gmtPubDate)}</span>
          <Link href={showUrl} className={`flex-1 overflow-hidden text-ellipsis whitespace-nowrap`}>
            {showTitle}
          </Link>
        </div>
        <Link href={episodeUrl} className={`text-black dark:text-white flex items-center`}>
          {episodeStatus === summarized && <img src="/icons/ai-ready-icon.svg" className={`h-[20px] mr-[10px]`} />} {episodeTitle}
        </Link>
        {episodeStatus === summarized ? (
          <div>
            <div className={`overflow-hidden text-ellipsis line-clamp-2`}>{summary}</div>
            <ol className={`w-[100%]`}>
              {takeaway?.slice(0, 2)?.map((i: any, index: number) => (
                <li
                  key={index}
                  className={`overflow-hidden text-ellipsis whitespace-nowrap w-[100%] indent-[10px]`}
                  style={{ listStyle: 'inside' }}
                >
                  {i}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className={`overflow-hidden text-ellipsis line-clamp-3`}>{getNoTagText(showNotes)}</div>
        )}
        {isDetail ? (
          <div className={`mt-[20px] text-sm`}>
            <h1 className={`flex mb-[10px]`}>
              <span className={`h-[20px] leading-[20px] bg-bgGray rounded-[10px] px-[10px] mr-[10px] dark:bg-bgDark `}>
                # {currentTagName}
              </span>
              <span className={`text-fontGry-600 dark:text-homehbg flex-1 font-bold`}>{currentTagText}</span>
            </h1>
            <div className={`flex flex-wrap max-h-[50px] overflow-hidden`}>
              {tags?.map((tag: any, ind: number) => (
                <Link href={tag.tagUrl} key={ind} className={` mr-[10px] mb-[10px]`}>
                  <span
                    className={`inline-block bg-bgGray rounded-[10px] px-[10px] hover:text-play dark:bg-darkHomeBg dark:text-white dark:hover:text-play`}
                  >
                    # {tag?.tagName || '-'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={`w-[100%] flex items-center text-fontGry-100 dark:text-[#888888] overflow-hidden text-ellipsis whitespace-normal`}
          >
            <img src="/images/cateIcon/tag.svg" alt="" className={`mr-[7px]`} />
            {tags?.map((tag: any, ind: number) => (
              <span className={` shrink-0`} key={ind}>
                {ind > 0 && <span className={`mx-[10px] font-bold`}>·</span>}
                <Link href={tag.tagUrl} key={ind} className={`hover:underline`}>
                  {tag.tagName}
                </Link>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
