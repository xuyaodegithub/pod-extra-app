'use client'
import MarkmapHooks from './markmap-hooks'

export function Mindmap({ data, isMindMap }: { data: any; isMindMap?: boolean }) {
  const { mindmap: mindMap = {}, episodeTitle } = data || {}

  return (
    <div key="Mindmap" className={`p-[12px]`}>
      <div id="mindMap" className={`h-[500px] bg-hbg relative`}>
        {isMindMap && <MarkmapHooks />}
      </div>
    </div>
  )
}
