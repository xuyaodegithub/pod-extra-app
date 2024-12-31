'use client'
import Image from 'next/image'
import { getTimeWithHoursMin } from '@/app/lib/utils'
import { audio_info } from '@/app/lib/config'
import { useMyContext } from '@/context/MyContext'
import { useUserInfo } from '@/context/UserInfo'
import { useEffect, useState } from 'react'
import { flowEpisode } from '@/app/lib/service'

export default function PlayBtn({ item }: { item: any }) {
  const {
    data,
    setData,
    isPlaying,
    setIsPlaying,
    time,
    allTime,
    setAllTime,
    setStepTime,
    setTime,
    saveCurrentPosition,
    setSaveCurrentPosition,
  } = useMyContext()
  const { userInfo } = useUserInfo()
  const { role = '' } = userInfo || {}
  const { enclosureUrl: url = '' } = data || {}
  const {
    coverUrl,
    episodeTitle,
    showTitle,
    showNotes,
    episodeId,
    duration,
    enclosureUrl,
    currentPosition = 0,
    episodeUrl,
    episodeStatus,
  } = item
  const [currentPosi, setCurrentPosi] = useState(currentPosition)
  const play = isPlaying && url && url === enclosureUrl
  const t = allTime || duration
  const remainingTime = data?.episodeId === episodeId ? t - time : duration - currentPosi
  function playAuido(e: Event) {
    e.preventDefault()
    const { episodeId: id = '' } = data || {}
    if (!id || episodeId !== id) {
      try {
        //切换前先存一下
        if (id) {
          handleFlowEpisode(id, time)
          setSaveCurrentPosition({ id, time })
        }
      } catch (e) {}
      const audioInfo = { enclosureUrl, showTitle, showNotes, coverUrl, episodeTitle, episodeId, episodeUrl, episodeStatus }
      console.log(t, time, duration, currentPosi, '--------')
      setData(audioInfo)
      setAllTime(0)
      setTime(currentPosi)
      setStepTime(currentPosi)
      setTimeout(() => {
        setIsPlaying(true)
        sessionStorage.setItem(audio_info, JSON.stringify({ ...audioInfo, playTime: 0 }))
      }, 500)
    } else setIsPlaying(!isPlaying)
  }
  function handleFlowEpisode(id: string, t: number) {
    const isLogin = !!role
    if (id && !!t && isLogin) {
      flowEpisode(episodeId, { currentPosition: t, tagType: 'PLAYLIST', duration: allTime })
    }
  }
  useEffect(() => {
    const { id = '', time } = saveCurrentPosition
    if (id === episodeId) {
      setCurrentPosi(time)
    }
    return () => {}
  }, [saveCurrentPosition])
  return (
    <div
      className={`text-min text-white flex items-center px-[9px] h-[28px] rounded-[14px] bg-play mr-24px cursor-pointer`}
      onClick={(e: any) => playAuido(e)}
    >
      <img src={`/icons/${play ? 'play-white' : 'pused'}.svg`} alt="" className={`w-[16px] h-[16px] mr-[4px]`} />
      <div className={`h-[4px] bg-white w-[25px] rounded-[2px] relative mr-[8px] overflow-hidden`}>
        <i
          className={`absolute w-[50%] h-[100%] bg-[#FF9C70] left-0 top-0`}
          style={{ width: `${t > 0 && data?.episodeId === episodeId ? (time / t) * 100 : (currentPosi / duration) * 100}%` }}
        ></i>
      </div>
      <span className={`font-semibold`}>{getTimeWithHoursMin(remainingTime)}</span>
    </div>
  )
}
