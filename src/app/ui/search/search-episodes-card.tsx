'use client'
import { useMyContext } from '@/context/MyContext'
import { useState } from 'react'
import Link from 'next/link'
import { getCurrentLocalTime, getNoTagText, getTimeWithHoursMin } from '@/app/lib/utils'
import { clsx } from 'clsx'
import CateItem from '@/app/ui/categories/cateItem'
import { FireIcon } from '@heroicons/react/24/outline'

export default function SearchPodcastCard({ item, noMb }: { item: any; noMb: boolean }) {
  const { isDark } = useMyContext()
  const { coverUrl, episodeTitle, gmtPubDate, showTitle, showCoverUrl, showNotes, episodeId, duration, episodeUrl } = item
  const des = getNoTagText(showNotes)
  return (
    <div className={` relative ${noMb ? '' : 'pb-[5px] mb-[5px]'}`}>
      <Link href={episodeUrl} key={episodeId} className={``}>
        <div className={`flex cursor-pointer overflow-hidden  hover:bg-hbg dark:hover:bg-darkHomeBg transition-all p-[10px] rounded-10px`}>
          <img src={coverUrl} alt="" className={`w-[130px] h-[130px] object-cover rounded-10px`} />
          <div className={`flex-1 ml-[10px] overflow-hidden flex flex-col`}>
            <div className={`flex mb-[5px] text-sm text-fontGry-600 items-center dark:text-fontGry-100`}>
              <div className={`mr-[20px]`}>{getCurrentLocalTime(gmtPubDate)}</div>
              <div className={`flex items-center flex-1`}>
                <img src={showCoverUrl} alt="" className={`w-[20px] h-[20px] mr-[5px] rounded-[5px]`} />
                <span className={`flex-1 overflow-hidden whitespace-nowrap text-ellipsis`}>{showTitle}</span>
              </div>
            </div>
            <h3
              className={`flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-fontGry-600 text-md dark:text-white`}
              title={episodeTitle}
            >
              <FireIcon className={`h-[20px] mr-[5px]`} />
              {episodeTitle}
            </h3>
            <div className={`text-sm overflow-hidden text-ellipsis line-clamp-2 text-fontGry-100`} title={des}>
              {des}
            </div>
            <div className={`flex items-center mt-auto`}>
              <div className={`text-min text-white flex items-center px-[9px] h-[28px] rounded-[14px] bg-play mr-24px`}>
                <img src="/icons/pused.svg" alt="" className={`w-[16px] h-[16px] mr-[4px]`} />
                <div className={`h-[4px] bg-white w-[25px] rounded-[2px] relative mr-[8px] overflow-hidden`}>
                  <i className={`absolute w-[50%] h-[100%] bg-[#FF9C70] left-0 top-0`}></i>
                </div>
                <span>{getTimeWithHoursMin(96 * 60)}</span>
              </div>
              <img src="/icons/star-filled.svg" alt="" />
            </div>
          </div>
        </div>
      </Link>
      {!noMb && <div className={`border-b-[1px] border-bgGray absolute left-[10px] bottom-0 right-[10px] dark:border-fontGry-600`}></div>}
    </div>
  )
}
