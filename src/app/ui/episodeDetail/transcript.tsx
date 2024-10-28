'use client'
import { useRouter } from 'next/navigation'
import { speakerList } from '@/app/lib/config'
import { timeFormat } from '@/app/lib/utils'
import { useMyContext } from '@/context/MyContext'
import { useState } from 'react'

export function Transcript({ data }: { data: any }) {
  const { paragraphs = [] } = data || {}
  const { enclosureUrl = '', showTitle = '', showNotes = '', coverUrl = '', episodeTitle = '', episodeId = '' } = data || {}
  const audioInfo = { enclosureUrl, showTitle, showNotes, coverUrl, episodeTitle, episodeId }
  const { setData, setIsPlaying, isPlaying, time, setStepTime, isDark } = useMyContext()
  let listInd = 0
  function playCurrTime(t: number, e: any) {
    if (t === 0) t = t + 0.1
    e.stopPropagation()
    setData(audioInfo)
    setTimeout(() => {
      setIsPlaying(true)
      setStepTime(t)
    }, 500)
  }
  return (
    <div key="Transcript">
      {paragraphs?.map((item: any, ind: number) => {
        const { speakerIndex = 0 } = item
        const isSame = item.speaker === paragraphs[ind - 1]?.speaker
        if (!isSame) {
          listInd += 1
        }
        const speaker = speakerList[speakerIndex] || speakerList[0]
        return (
          <div className={`mb-[16px] pb-[12px] border-b-[1px] border-e8e dark:border-fontGry-600`} key={`${item.start}-${ind}`}>
            <div
              className={`flex mb-[9px] ${isSame ? 'items-center' : ''} active_${((item.start || '') + '').replace(/\./g, '_')}`}
              style={{ color: speaker.color }}
            >
              {isSame ? (
                <div className={`w-[10px] h-[30px] rounded-[6px] mr-[48px]`} style={{ background: speaker.bg }}></div>
              ) : (
                <div
                  className={`w-[50px] h-[50px] mr-[8px] text-max leading-[50px] text-center rounded-[6px]`}
                  style={{ background: speaker.bg }}
                >
                  {listInd > 9 ? listInd : `0${listInd}`}
                </div>
              )}
              <div className={`flex flex-col justify-between`}>
                <div
                  className={`text-min rounded-[8px] pl-[16px] pr-[5px] inline-block cursor-pointer`}
                  onClick={(e: any) => playCurrTime(item.start, e)}
                  style={{ background: speaker.bg }}
                >
                  <span className={`mr-[10px] leading-[20px] inline-block`}>{timeFormat(item.start)}</span>
                  <img src="/images/fa-play.png" alt="" className={`inline-block align-baseline w-[10px] h-[10px]`} />
                </div>
                {!isSame && <div className={`text-md leading-[20px]`}>{item.speaker}</div>}
              </div>
            </div>
            <div className={`text-md text-fontGry-600`}>
              {item.sentences.map((it: any, ind: number) => {
                const isactive = isPlaying && time >= it.start && time <= it.end
                const bg = isDark ? '#404040' : speaker.bg
                const color = isDark ? speaker.bg : speaker.color
                return (
                  <span
                    className={`hover:bg-bgGray cursor-pointer dark:hover:bg-darkHomeBg dark:text-homehbg active_${((it.start || '') + '').replace(/\./g, '_')}`}
                    style={{ background: isactive ? bg : '', color: isactive ? color : '' }}
                    key={`${it.start}-${ind}`}
                    onClick={(e: any) => playCurrTime(it.start, e)}
                  >
                    {it.description}
                  </span>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
