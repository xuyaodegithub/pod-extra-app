'use client'
import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'

export function CardDes({ maxLine = 4, des, lineHeight = 18 }: { maxLine?: number; des: string; lineHeight?: number }) {
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
    <div className={``}>
      <div
        className={`overflow-hidden text-fontGry-600 text-sm mb-[5px] relative transition-all dark:text-homehbg`}
        style={{ height: showMore ? `${maxLine * lineHeight}px` : `${initHeight || 'auto'}px` }}
        ref={boxRef}
      >
        {des}
        {showMore && <div className={`absolute bottom-[5px] right-0 text-sm bg-white px-[5px]`}>......</div>}
      </div>
      {showMoreBtn && (
        <Button
          className={`bg-white text-min px-10px text-fontGry-c8 rounded-5px border border-fontGry-c8`}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'show more' : 'show less'}
        </Button>
      )}
    </div>
  )
}
