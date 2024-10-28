'use client'
import MarkmapHooks from './markmap-hooks'

export function Mindmap({ data, isMindMap, goThisTime }: { data: any; isMindMap?: boolean; goThisTime?: any }) {
  const { mindmapInMd = {}, episodeTitle } = data || {}
  function clickSpan(e: any) {
    const el: any = e.target
    if (el.classList.contains('clickable')) {
      const val = el.getAttribute('data-val')
      goThisTime(val)
    }
    console.log(e.target, '--')
  }

  return (
    <div key="Mindmap" className={`p-[12px]`}>
      <div id="mindMap" className={`h-[500px] bg-hbg relative`} onClick={clickSpan}>
        {isMindMap && (
          <MarkmapHooks
            mindmapInMd={mindmapInMd.replace(/\((\d+\.\d+)\)/g, (match: any, p1: any) => {
              return `<span class="clickable text-fontGry-100 cursor-pointer" data-val="${p1}">(${p1})</span>`
            })}
          />
        )}
      </div>
    </div>
  )
}
