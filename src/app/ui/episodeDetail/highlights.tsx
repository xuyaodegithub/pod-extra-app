'use client'
import { useRouter } from 'next/navigation'
import { speakerList } from '@/app/lib/config'
import { timeFormat } from '@/app/lib/utils'
import { useMyContext } from '@/context/MyContext'
import Image from '@/app/ui/Image'

export function Highlights({ data }: { data: any }) {
  const { highlights = [] } = data || {}
  const {
    enclosureUrl = '',
    showTitle = '',
    showNotes = '',
    coverUrl = '',
    episodeTitle = '',
    episodeId = '',
    episodeUrl = '',
  } = data || {}
  const audioInfo = { enclosureUrl, showTitle, showNotes, coverUrl, episodeTitle, episodeId, episodeUrl }
  const { setData, setIsPlaying, isPlaying, time, setStepTime } = useMyContext()
  function playCurrTime(t: number, e: any) {
    e.stopPropagation()
    setData(audioInfo)
    setTimeout(() => {
      setIsPlaying(true)
      setStepTime(t)
    }, 500)
  }
  return (
    <div key="Transcript">
      {highlights?.map((item: any, ind: number) => {
        const { speaker: speakerItem, speakerIndex } = item
        // const i = ind > speakerList.length - 1 ? ind % speakerList.length : ind
        const speaker = speakerList[speakerIndex] || speakerList[0]
        return (
          <div className={`mb-[16px] pb-[12px] border-b-[1px] border-e8e dark:border-fontGry-600`} key={`${item.start}-${ind}`}>
            <div className={`flex mb-[9px]`} style={{ color: speaker.color }}>
              <div className={`w-[50px] h-[50px] mr-[8px] text-max0 leading-[50px] text-center rounded-[6px]`}>
                <Image src={speaker.head} alt="" className={`w-[50px] h-[50px] object-cover`} />
              </div>
              <div className={`flex flex-col justify-between`}>
                <div
                  className={`text-min rounded-[8px] pl-[16px] pr-[5px] inline-block cursor-pointer  self-start`}
                  onClick={(e: any) => playCurrTime(item.start, e)}
                  style={{ background: speaker.bg }}
                >
                  <span className={`mr-[10px] leading-[20px] inline-block`}>{timeFormat(item.start)}</span>
                  <Image src="/images/fa-play.png" alt="" className={`inline-block align-baseline w-[10px] h-[10px]`} />
                </div>
                <div className={`text-md leading-[20px]`}>{item.speaker || `Speaker ${ind + 1}`}</div>
              </div>
            </div>
            <div className={`text-md text-fontGry-600 py-[10px] px-[15px] bg-hbg rounded-10px dark:bg-bgDark dark:text-homehbg`}>
              {item?.sentences?.map((item: any, ind: number) => <span key={ind}>{item?.description || ''}</span>)}
              {/*{item.description}*/}
            </div>
          </div>
        )
      })}
    </div>
  )
}
