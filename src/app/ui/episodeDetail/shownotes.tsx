'use client'
import { getNoTagText, timeFormat } from '@/app/lib/utils'
import { useEffect } from 'react'
import { useMyContext } from '@/context/MyContext'

export function Shownotes({ data, goThisTime }: { data: any; goThisTime?: any }) {
  const { enclosureUrl = '', showTitle = '', showNotes = '', coverUrl = '', episodeTitle = '', episodeId = '', duration } = data || {}
  const audioInfo = { enclosureUrl, showTitle, showNotes, coverUrl, episodeTitle, episodeId }
  const { setData, setIsPlaying, setStepTime } = useMyContext()

  function timeToSeconds(timeStr: string) {
    const regex = /^(?:(\d{1,2}):)?(\d{2})(?::(\d{2}))?$/ // 更新的正则表达式
    const match = timeStr.match(regex)

    if (!match) {
      throw new Error('Invalid time format')
    }
    const [h, m, s]: any = [match[3] ? match[1] : 0, match[3] ? match[2] : match[1], match[3] || match[2]]

    return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) // 转换为秒
  }
  function clickSpan(e: any) {
    console.log(e.target, '--')
    const el: any = e.target
    if (el.classList.contains('clickable')) {
      const timeStr = el.getAttribute('data-val')
      const s = timeToSeconds(timeStr)
      console.log(s, 'pp')
      if (s > duration) return
      setData(audioInfo)
      setTimeout(() => {
        setIsPlaying(true)
        setStepTime(s + 0.1)
      }, 500)
    }
  }
  useEffect(() => {
    const box: any = document.querySelector('.ShownotesBox')
    box.innerHTML = showNotes.replace(
      /\b(\d{1,2}):(\d{2})(?::(\d{2}))?\b/g,
      `<span class="clickable cursor-pointer text-play" data-val="$&">$&</span>`
    )
  }, [showNotes])
  return (
    <div key="Shownotes">
      <div className={`text-min text-homehbg pb-[12px] border-b-[1px] border-e8e mb-[15px] dark:text-fontGry-100 dark:border-fontGry-600`}>
        Shownotes are provided by podcaster, not generated by AI.
      </div>
      <div className={`text-md text-fontGry-600 dark:text-homehbg ShownotesBox`} onClick={(e) => clickSpan(e)}></div>
    </div>
  )
}