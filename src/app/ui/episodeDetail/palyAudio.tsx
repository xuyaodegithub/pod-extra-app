'use client'
import { useEffect, useState } from 'react'
import { useMyContext } from '@/context/MyContext'
import { audio_info } from '@/app/lib/config'

export function PlayAudio({ audioInfo, classStyle }: { audioInfo: any; classStyle?: string }) {
  const { data, setData, isPlaying, setIsPlaying } = useMyContext()
  const { enclosureUrl = '' } = data || {}
  const { enclosureUrl: currUrl } = audioInfo
  const play = isPlaying && enclosureUrl && currUrl === enclosureUrl
  function playAuido() {
    const { episodeId = '' } = audioInfo || {}
    const { episodeId: id = '' } = data || {}
    if (!id || episodeId !== id) {
      setData(audioInfo)
      setTimeout(() => {
        setIsPlaying(true)
        localStorage.setItem(audio_info, JSON.stringify({ ...audioInfo, playTime: 0 }))
      }, 500)
    } else setIsPlaying(!isPlaying)
  }
  return (
    <div>
      <img
        src={`/images/${!play ? 'paused' : 'playing'}.svg`}
        alt=""
        className={`w-[]40px] h-[40px] mt-[10px] cursor-pointer ${classStyle}`}
        onClick={playAuido}
      />
    </div>
  )
}
