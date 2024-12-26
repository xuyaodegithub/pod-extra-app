'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import TagCardItem from '@/app/ui/ladingPage/tagCardItem'
import MoreAiProcess from '@/app/ui/episodeDetail/moreAiProcess'

export function OverView({ data }: { data: any }) {
  const [showMore, setShowMore] = useState(true)
  const [boxHeight, setBoxHeight] = useState(0)
  const { summary = '' } = data || {}
  const boxRef = useRef<any>(null)
  const { paragraphSummary = [], takeaway = [], topics = [], tags = [], relatedEpisodes = [], hasViewSummary, isSummarized } = data
  function changeHeight() {
    const h = boxRef.current.scrollHeight
    setBoxHeight(showMore ? h : 0)
    setShowMore(!showMore)
  }
  return (
    <div className={`text-fontGry-600 dark:text-homehbg`} key="OverView">
      <h3 className={`font-bold mb-[20px] text-play flex items-center`}>
        <span className={`h-[20px] w-[5px] bg-play rounded-[3px] mr-[10px]`}></span>AI Summary
      </h3>
      <div className={`mb-[20px]`}>{summary}</div>
      {isSummarized && (
        <div
          className={`overflow-hidden transition-all`}
          ref={boxRef}
          style={{ height: `${boxHeight}px`, display: hasViewSummary ? 'block' : 'none' }}
        >
          {paragraphSummary?.map((i: any, ind: number) => (
            <div className={`flex items-center mb-[20px]`} key={ind}>
              <span className={`w-[4px] h-[4px] bg-fontGry-600 dark:bg-homehbg rounded self-start mt-[12px] mx-[10px]`}></span>
              <span className={`flex-1`}>{i}</span>
            </div>
          ))}
        </div>
      )}
      {!hasViewSummary ? (
        <MoreAiProcess des={'summary'} />
      ) : (
        <div
          className={`mb-[40px] bg-white text-min px-[10px] py-[2px] text-fontGry-c8 rounded-[8px] border border-fontGry-c8 cursor-pointer w-[85px] dark:bg-bgDark dark:text-homehbg`}
          onClick={changeHeight}
        >
          {showMore ? 'show more' : 'show less'}
        </div>
      )}
      {/*<MoreAiProcess des="summary" />*/}
      {!!takeaway?.length && (
        <div className={`pb-[20px]`}>
          <h3 className={`font-bold mb-[20px] text-play flex items-center`}>
            <span className={`h-[20px] w-[5px] bg-play rounded-[3px] mr-[10px]`}></span>Takeaways
          </h3>
          <div>
            {takeaway?.map((i: any, ind: number) => (
              <div
                className={`flex items-center mb-[20px]`}
                key={ind}
                style={{ display: hasViewSummary ? 'flex' : ind > 1 ? 'none' : 'flex' }}
              >
                <span className={`w-[4px] h-[4px] bg-fontGry-600 dark:bg-homehbg rounded self-start mt-[12px] mx-[10px]`}></span>
                <span className={`flex-1`}>{i}</span>
              </div>
            ))}
          </div>
          {!hasViewSummary && <MoreAiProcess des={'takeaways'} className={'mt-[14px]'} />}
        </div>
      )}
      {!!topics?.length && (
        <div className={`pb-[20px]`}>
          <h3 className={`font-bold mb-[20px] text-play flex items-center`}>
            <span className={`h-[20px] w-[5px] bg-play rounded-[3px] mr-[10px]`}></span>Topics
          </h3>
          <div>
            {topics?.map((item: any, ind: number) => (
              <div className={`mb-[20px]`} key={ind} style={{ display: hasViewSummary ? 'block' : ind > 1 ? 'none' : 'block' }}>
                <div className={`font-bold`}>{item?.title || ''}</div>
                <div>{item?.description || ''}</div>
              </div>
            ))}
          </div>
          {!hasViewSummary && <MoreAiProcess des={'topics'} className={'mt-[14px]'} />}
        </div>
      )}
      {!!tags?.length && (
        <div className={`pb-[30px]`}>
          <h3 className={`font-bold mb-[20px] text-play flex items-center`}>
            <span className={`h-[20px] w-[5px] bg-play rounded-[3px] mr-[10px]`}></span>Tags
          </h3>
          <div className={`flex flex-wrap`}>
            {tags?.map((item: any, ind: number) => (
              <Link
                href={`${item.tagUrl}`}
                className={`text-fontGry-600 mb-[10px] mr-[10px] px-[5px] text-sm leading-[28px] border-[1px] border-[#c8c8c8] rounded-[5px] hover:text-play hover:border-play  dark:hover:text-play dark:hover:border-play dark:text-homehbg dark:border-homehbg`}
                key={ind}
              >
                {item?.tagName || '-'}
              </Link>
            ))}
          </div>
        </div>
      )}
      {!!relatedEpisodes?.length && (
        <div className={`pb-[30px]`}>
          <h3 className={`font-bold mb-[20px] text-play flex items-center`}>
            <span className={`h-[20px] w-[5px] bg-play rounded-[3px] mr-[10px]`}></span>Related Episodes
          </h3>
          <div className={``}>
            {relatedEpisodes?.map((item: any, ind: number) => (
              <TagCardItem key={ind} card={item} isLast={ind === relatedEpisodes?.length - 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
