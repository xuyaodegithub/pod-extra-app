'use client'
import { useState } from 'react'
import { flowEpisode, unFlowEpisode } from '@/app/lib/service'

export default function FlowStart({ item }: { item: any }) {
  const { episodeId, star, currentPosition = 0 } = item
  const [isStar, setIsStar] = useState(star)
  async function followEpiosde(e: any) {
    e.preventDefault()
    if (isStar) {
      await unFlowEpisode(episodeId)
    } else {
      await flowEpisode(episodeId, { currentPosition, tagType: 'STAR' })
    }
    setIsStar(!isStar)
  }
  return (
    <div className={`bg-hbg dark:bg-bgDark rounded-[50%] p-[5px]`} onClick={(e: any) => followEpiosde(e)}>
      <img src={`/icons/${isStar ? 'star-filled' : 'star'}.svg`} alt="" />
    </div>
  )
}
