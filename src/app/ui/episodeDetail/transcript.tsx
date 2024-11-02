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
                <div className={`w-[50px] h-[50px] mr-[8px] text-max leading-[50px] text-center rounded-[6px]`}>
                  <img src={speaker.head} alt="" className={`w-[50px] h-[50px] object-cover`} />
                </div>
              )}
              <div className={`flex flex-col justify-between`}>
                <div
                  className={`text-min rounded-[8px] pl-[16px] pr-[5px] inline-block cursor-pointer self-start`}
                  onClick={(e: any) => playCurrTime(item.start, e)}
                  style={{ background: speaker.bg }}
                >
                  <span className={`mr-[10px] leading-[20px] inline-block`}>{timeFormat(item.start)}</span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`inline-block align-baseline w-[10px] h-[10px]`}
                  >
                    <g id="fa-play">
                      <path
                        id="play"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.24738 9.86849L9.12236 5.806C9.73563 5.44467 9.7376 4.55406 9.12236 4.19273L2.24738 0.128275C1.68878 -0.201791 0.833313 0.118509 0.833313 0.934929V9.06185C0.833313 9.79427 1.62824 10.2357 2.24738 9.86849Z"
                        fill={speaker.color}
                      />
                    </g>
                  </svg>
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
