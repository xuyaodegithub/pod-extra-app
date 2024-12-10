'use client'
import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import FlowBtn from '@/app/ui/search/flow-btn'

export function CardDes({ maxLine = 4, des, lineHeight = 20, item }: { maxLine?: number; des: string; lineHeight?: number; item: any }) {
  const [initHeight, setInitHeight] = useState(0)
  const [showMore, setShowMore] = useState(false)
  const [showMoreBtn, setShowMoreBtn] = useState(false)
  const boxRef: any = useRef(null)
  useEffect(() => {
    const box = boxRef.current
    const h = box.offsetHeight
    setInitHeight(h)
    setShowMore(h > lineHeight * maxLine)
    setShowMoreBtn(h > lineHeight * maxLine)
    // return () => {}
  }, [lineHeight, maxLine])
  return (
    <div className={`relative`}>
      <div
        className={`overflow-hidden text-fontGry-600 text-sm mb-[5px] relative transition-all dark:text-homehbg`}
        style={{ height: showMore ? `${maxLine * lineHeight}px` : `${initHeight || 'auto'}px`, lineHeight: lineHeight + 'px' }}
        ref={boxRef}
      >
        {des}
        {showMore && <div className={`absolute bottom-[5px] right-0 text-sm bg-white px-[5px] dark:bg-darkBody`}>......</div>}
      </div>
      {showMoreBtn && (
        <div
          className={`bg-white text-min px-[10px] py-[2px] text-fontGry-c8 rounded-[8px] border border-fontGry-c8 cursor-pointer w-[85px] dark:bg-bgDark dark:text-homehbg`}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'show more' : 'show less'}
        </div>
      )}
      <div className={`mt-[10px] inline-block`}>
        <FlowBtn item={item} noPosition />
      </div>
    </div>
  )
}
