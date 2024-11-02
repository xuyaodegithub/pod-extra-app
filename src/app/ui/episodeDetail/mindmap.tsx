'use client'
import MarkmapHooks from './markmap-hooks'
import { timeFormat } from '@/app/lib/utils'
import { useEffect, useState } from 'react'
import { ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline'

export function Mindmap({ data, isMindMap, goThisTime }: { data: any; isMindMap?: boolean; goThisTime?: any }) {
  const { mindmapInMd = {}, episodeTitle } = data || {}
  const [showOnce, setShowOnce] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  function clickSpan(e: any) {
    const el: any = e.target
    if (el.classList.contains('clickable')) {
      const val = el.getAttribute('data-val')
      goThisTime(val)
    }
    console.log(e.target, '--')
  }

  useEffect(() => {
    if (isMindMap) {
      setShowOnce(true)
    }
  }, [isMindMap])
  return (
    <div key="Mindmap" className={`p-[12px] pb-[100px]`}>
      <div
        id="mindMap"
        className={`bg-hbg ${fullScreen ? 'fixed w-[100%] h-[100%] top-0 left-0 z-[1111]' : 'relative h-[500px]'}`}
        onClick={clickSpan}
      >
        {/*<div className={`absolute top-[10px] left-[10px] z-100`}>11</div>*/}
        <div className={`absolute top-[10px] right-[10px] z-100 cursor-pointer`} onClick={() => setFullScreen(!fullScreen)}>
          {fullScreen ? (
            <ArrowsPointingInIcon className={`w-[20px] h-[20px]`} />
          ) : (
            <ArrowsPointingOutIcon className={`w-[20px] h-[20px]`} />
          )}
        </div>
        {showOnce && (
          <MarkmapHooks
            fullScreen={fullScreen}
            mindmapInMd={mindmapInMd?.replace(/\((\d+\.\d+)\)/g, (match: any, p1: any) => {
              return `<span class="clickable text-fontGry-100 cursor-pointer" data-val="${p1}">(${timeFormat(+p1, true)})</span>`
            })}
          />
        )}
      </div>
    </div>
  )
}
