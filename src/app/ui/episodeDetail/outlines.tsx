'use client'
import { useRouter } from 'next/navigation'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useEffect, useState } from 'react'
import { useMyContext } from '@/context/MyContext'
import { timeFormat } from '@/app/lib/utils'

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
  const { chapters = [] } = data || {}
  return (
    <div className={``} key="Outlines">
      {chapters?.map((item: any) => (
        // <div key={item.start} className={`mb-[15px] font-md `}>
        //   <div className={`text-min rounded-[8px] bg-bgGray text-play pl-[16px] pr-[5px] inline-block mb-[8px] cursor-pointer`}>
        //     <span className={`mr-[10px] cursor-pointer leading-[20px] inline-block`}>{timeFormat(item.start)}</span>
        //     <img src="/images/fa-play.png" alt="" className={`inline-block align-baseline w-[10px] h-[10px]`} />
        //   </div>
        //   <div className={`cursor-pointer relative border-b-2 border-borderb pb-[12px] relative z-[-1]`}>
        //     {item.text}
        //     <ChevronDownIcon className={`w-[18px] h-[18px] absolute right-[15px] top-[50%] translate-y-[-50%]`} />
        //   </div>
        //   <div className={`py-[10px] px-[15px] bg-bgGray rounded-[10px] mt-[10px]`}>
        //     {item.children?.map((it: any) => <span className={`hover:text-play cursor-pointer`}>{it.text}，</span>)}
        //   </div>
        // </div>
        <Accordion type="single" collapsible key={item.start}>
          <AccordionItem value="item-1">
            <AccordionTrigger className={`text-left`}>
              <div>
                <div
                  className={`text-min rounded-[8px] bg-bgGray text-play pl-[16px] pr-[5px] inline-block mb-[8px] cursor-pointer`}
                  onClick={(e: any) => playCurrTime(item.start, e)}
                >
                  <span className={`mr-[10px] cursor-pointer leading-[20px] inline-block`}>{timeFormat(item.start)}</span>
                  <img src="/images/fa-play.png" alt="" className={`inline-block align-baseline w-[10px] h-[10px]`} />
                </div>
                <div className={`cursor-pointer relative relative`}>{item.text}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className={`py-[10px] px-[15px] bg-bgGray rounded-[10px]`}>
                {item.children?.map((it: any) => (
                  <span
                    className={`hover:text-play cursor-pointer ${it.start <= time && it.end >= time ? 'text-play' : ''}`}
                    onClick={(e: any) => playCurrTime(it.start, e)}
                    key={it.start}
                  >
                    {it.text}，
                  </span>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}
