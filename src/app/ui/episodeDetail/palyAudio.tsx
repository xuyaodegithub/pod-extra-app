'use client'
import { useEffect, useState } from 'react'
import { useMyContext } from '@/context/MyContext'

export function PlayAudio({ audioInfo }: { audioInfo: any }) {
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
      }, 500)
    } else setIsPlaying(!isPlaying)
  }
  return (
    <div>
      <img
        src={`/images/${!play ? 'paused' : 'playing'}.svg`}
        alt=""
        className={`w-[]40px] h-[40px] mt-[10px] mb-[16px] cursor-pointer`}
        onClick={playAuido}
      />
    </div>
  )
}
