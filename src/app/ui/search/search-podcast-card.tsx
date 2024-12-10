'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCurrentLocalTime, getNoTagText } from '@/app/lib/utils'
import CateItem from '@/app/ui/categories/cateItem'
import Image from '@/app/ui/Image'
import FlowBtn from '@/app/ui/search/flow-btn'

export default function SearchPodcastCard({ item, noMb }: { item: any; noMb: boolean }) {
  const { coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate, showUrl } = item
  const [title, des] = [getNoTagText(showTitle) || '-', getNoTagText(showDescription) || '-']
  return (
    <div className={` relative ${noMb ? '' : 'pb-[5px] mb-[5px]'} w-[100%]`}>
      <Link href={showUrl} key={showId} className={`w-[100%] inline-block`}>
        <div className={`flex cursor-pointer overflow-hidden  hover:bg-hbg dark:hover:bg-darkHomeBg transition-all p-[10px] rounded-10px`}>
          <Image src={coverUrl} alt="" className={`w-[120px] h-[120px] object-cover rounded-10px`} />
          <div className={`flex-1 ml-[10px] overflow-hidden`}>
            <div className={`flex mb-[6px]`}>{categoryList?.map((item: any) => <CateItem {...item} key={item.categoryId} />)}</div>
            <div className={`overflow-hidden text-ellipsis whitespace-nowrap text-fontGry-600 text-md dark:text-white`} title={title}>
              {title}
            </div>
            <div className={`text-sm text-fontGry-100 flex items-center`} title={des}>
              <span className={`max-w-[50%] overflow-hidden text-ellipsis whitespace-nowrap`} title={itunesAuthor}>
                {itunesAuthor}
              </span>
              <span>（{`Update ${getCurrentLocalTime(gmtLastUpdate)}`}）</span>
              {/*{itunesAuthor}（{`Update ${getCurrentLocalTime(gmtLastUpdate)}`}）*/}
            </div>
            <div className={`text-sm overflow-hidden text-ellipsis line-clamp-2 text-fontGry-100`} title={des}>
              {des}
            </div>
          </div>
        </div>
      </Link>
      {!noMb && <div className={`border-b-[1px] border-bgGray absolute left-[10px] bottom-0 right-[10px] dark:border-fontGry-600`}></div>}
      <FlowBtn item={item} />
    </div>
  )
}
