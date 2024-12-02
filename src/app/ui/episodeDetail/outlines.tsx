'use client'
import { useRouter } from 'next/navigation'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useEffect, useState } from 'react'
import { useMyContext } from '@/context/MyContext'
import { timeFormat } from '@/app/lib/utils'
import Image from '@/app/ui/Image'

export function Outlines({ data }: { data: any }) {
  const { enclosureUrl = '', showTitle = '', showNotes = '', coverUrl = '', episodeTitle = '', episodeId = '' } = data || {}
  const audioInfo = { enclosureUrl, showTitle, showNotes, coverUrl, episodeTitle, episodeId }
  const { setData, setIsPlaying, isPlaying, time, setStepTime } = useMyContext()
  function playCurrTime(t: number, e: any) {
    e.stopPropagation()
    setData(audioInfo)
    setTimeout(() => {
      setIsPlaying(true)
      setStepTime(t)
    }, 500)
  }
  const { outline = [] } = data || {}
  return (
    <div className={``} key="Outlines">
      {outline?.map((item: any, ind: number) => (
        <Accordion type="single" collapsible key={`${item.start}-${ind}`}>
          <AccordionItem value="item-1">
            <AccordionTrigger className={`text-left ${ind === 0 ? 'pt-0' : ''}`}>
              <div>
                <div
                  className={`text-min rounded-[8px] bg-bgGray text-play pl-[16px] pr-[5px] inline-block mb-[8px] cursor-pointer dark:bg-darkHomeBg dark:text-homehbg`}
                  onClick={(e: any) => playCurrTime(item.start, e)}
                >
                  <span className={`mr-[10px] cursor-pointer leading-[20px] inline-block`}>{timeFormat(item.start)}</span>
                  <Image src="/images/fa-play.png" alt="" className={`inline-block align-baseline w-[10px] h-[10px]`} />
                </div>
                <div className={`cursor-pointer relative dark:text-homehbg`}>{item.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div
                className={`py-[10px] px-[15px] bg-bgGray rounded-[10px] dark:bg-bgDark dark:text-homehbg ${item.start <= time && item.end >= time ? 'text-play' : ''}`}
              >
                {item.description}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}
