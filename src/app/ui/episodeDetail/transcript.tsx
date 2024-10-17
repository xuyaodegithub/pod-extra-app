'use client'
import { useRouter } from 'next/navigation'
import { speakerList } from '@/app/lib/config'
import { timeFormat } from '@/app/lib/utils'
import { useMyContext } from '@/context/MyContext'
import { useState } from 'react'

export function Transcript({ data }: { data: any }) {
  // const { sentences = [] } = data || {}
  const { enclosureUrl = '', showTitle = '', showNotes = '', coverUrl = '', episodeTitle = '', episodeId = '' } = data || {}
  const audioInfo = { enclosureUrl, showTitle, showNotes, coverUrl, episodeTitle, episodeId }
  const { setData, setIsPlaying, isPlaying, time, setStepTime } = useMyContext()
  let speakerInd = -1
  function playCurrTime(t: number, e: any) {
    e.stopPropagation()
    setData(audioInfo)
    setTimeout(() => {
      setIsPlaying(true)
      setStepTime(t)
    }, 500)
  }
  const sentences = [
    {
      begin: 0.0,
      end: 10.5,
      speaker: 'speaker_01',
      sentences: [
        {
          text: 'Hello, my name is John Doe.',
          begin: 0.0,
          end: 3.0,
        },
        {
          text: 'I am a software engineer.',
          begin: 3.0,
          end: 6.0,
        },
        {
          text: 'I work at Google.',
          begin: 6.0,
          end: 10.5,
        },
      ],
    },
    {
      begin: 1.0,
      end: 10.5,
      speaker: 'speaker_01',
      sentences: [
        {
          text: 'Hello, my name is John Doe.',
          begin: 9.0,
          end: 13.0,
        },
        {
          text: 'I am a software engineer.',
          begin: 14.0,
          end: 16.0,
        },
        {
          text: 'I work at Google.',
          begin: 16.0,
          end: 30.5,
        },
      ],
    },
    {
      begin: 10.5,
      end: 20.0,
      speaker: 'speaker_02',
      sentences: [
        {
          text: 'Hello, my name is Jane Doe.',
          begin: 10.5,
          end: 13.0,
        },
        {
          text: 'I am a software engineer.',
          begin: 13.0,
          end: 16.0,
        },
        {
          text: 'I work at Facebook.',
          begin: 16.0,
          end: 20.0,
        },
      ],
    },
  ]
  return (
    <div key="Transcript">
      {sentences?.map((item: any, ind: number) => {
        const isSame = item.speaker === sentences[ind - 1]?.speaker
        if (!isSame) {
          speakerInd = speakerInd >= 8 ? 0 : speakerInd + 1
        }
        const speaker = speakerList[speakerInd]
        return (
          <div className={`mb-[16px] pb-[12px] border-b-[1px] border-e8e`} key={item.begin}>
            <div className={`flex mb-[9px] ${isSame ? 'items-center' : ''}`} style={{ color: speaker.color }}>
              {isSame ? (
                <div className={`w-[10px] h-[30px] rounded-[6px] mr-[48px]`} style={{ background: speaker.bg }}></div>
              ) : (
                <div
                  className={`w-[50px] h-[50px] mr-[8px] text-max leading-[50px] text-center rounded-[6px]`}
                  style={{ background: speaker.bg }}
                >
                  {ind + 1 > 9 ? ind + 1 : `0${ind + 1}`}
                </div>
              )}
              <div className={`flex flex-col justify-between`}>
                <div
                  className={`text-min rounded-[8px] pl-[16px] pr-[5px] inline-block cursor-pointer`}
                  onClick={(e: any) => playCurrTime(item.begin, e)}
                  style={{ background: speaker.bg }}
                >
                  <span className={`mr-[10px] leading-[20px] inline-block`}>{timeFormat(item.begin)}</span>
                  <img src="/images/fa-play.png" alt="" className={`inline-block align-baseline w-[10px] h-[10px]`} />
                </div>
                {!isSame && <div className={`text-md leading-[20px]`}>{item.speaker}</div>}
              </div>
            </div>
            <div className={`text-md text-fontGry-600`}>
              {item.sentences.map((it: any) => (
                <span
                  className={`hover:bg-bgGray cursor-pointer`}
                  style={{ background: isPlaying && time >= it.begin && time <= it.end ? speaker.bg : '' }}
                  key={it.begin}
                  onClick={(e: any) => playCurrTime(it.begin, e)}
                >
                  {it.text}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
