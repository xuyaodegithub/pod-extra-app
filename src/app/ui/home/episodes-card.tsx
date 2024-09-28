'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

export function Card({ imgUrl, title, des }: { imgUrl: string; title: string; des: string }) {
  const elementARef = useRef(null)
  const [oneline, setOneLine] = useState(false)
  useEffect(() => {
    const elA: any = elementARef.current
    setOneLine(elA.offsetHeight > 24)
  }, [])
  return (
    <div className="flex rounded-[5px] w-[50%] mb-[25px] pr-[12px] overflow-hidden cursor-pointer">
      <Image src={imgUrl} title={title} alt={title} className={`mr-[6px] rounded-[5px]`} width={110} height={110} />
      <div className={`flex-1 flex flex-col overflow-hidden`}>
        <div ref={elementARef} className={`text-md overflow-hidden text-ellipsis line-clamp-2 text-fontGry-600`} title={title}>
          {title}
        </div>
        <div
          className={`text-sm overflow-hidden text-ellipsis ${oneline ? 'line-clamp-2' : 'line-clamp-3'} line-clamp-2 text-fontGry-100`}
          title={des}
        >
          {des}
        </div>
        <div className={`flex text-sm text-fontGry-100 mt-auto overflow-hidden w-[100%]`}>
          <span>{'2024/9/28 23:58:54'}</span>
          <span className={`ml-[24px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap`}>
            vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
          </span>
        </div>
      </div>
    </div>
  )
}
