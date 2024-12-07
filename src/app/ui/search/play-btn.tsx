'use client'
import Image from 'next/image'
import { getTimeWithHoursMin } from '@/app/lib/utils'
import { audio_info } from '@/app/lib/config'
import { useMyContext } from '@/context/MyContext'

export default function PlayBtn({ item }: { item: any }) {
  const { data, setData, isPlaying, setIsPlaying, time, allTime, setAllTime, setStepTime } = useMyContext()
  const { enclosureUrl: url = '' } = data || {}
  const { coverUrl, episodeTitle, showTitle, showNotes, episodeId, duration, enclosureUrl, currentPosition = 0 } = item
  const play = isPlaying && url && url === enclosureUrl
  const t = allTime || duration
  const remainingTime = data?.episodeId === episodeId ? t - time : duration - currentPosition
  function playAuido(e: Event) {
    e.preventDefault()
    const { episodeId: id = '' } = data || {}
    if (!id || episodeId !== id) {
      const audioInfo = { enclosureUrl, showTitle, showNotes, coverUrl, episodeTitle, episodeId }
      console.log(id, episodeId, data, audioInfo, '--------')
      setData(audioInfo)
      setAllTime(0)
      setTimeout(() => {
        setIsPlaying(true)
        setStepTime(currentPosition)
        sessionStorage.setItem(audio_info, JSON.stringify({ ...audioInfo, playTime: 0 }))
      }, 500)
    } else setIsPlaying(!isPlaying)
  }
  return (
    <div
      className={`text-min text-white flex items-center px-[9px] h-[28px] rounded-[14px] bg-play mr-24px cursor-pointer`}
      onClick={(e: any) => playAuido(e)}
    >
      <img src={`/icons/${play ? 'play-white' : 'pused'}.svg`} alt="" className={`w-[16px] h-[16px] mr-[4px]`} />
      <div className={`h-[4px] bg-white w-[25px] rounded-[2px] relative mr-[8px] overflow-hidden`}>
        <i
          className={`absolute w-[50%] h-[100%] bg-[#FF9C70] left-0 top-0`}
          style={{ width: `${t > 0 && data?.episodeId === episodeId ? (time / t) * 100 : (currentPosition / duration) * 100}%` }}
        ></i>
      </div>
      <span className={`font-semibold`}>{getTimeWithHoursMin(remainingTime)}</span>
    </div>
  )
}
