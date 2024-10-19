'use client'
import { useRouter } from 'next/navigation'
import { useEffect, Ref, useState } from 'react'
import MindElixir from 'mind-elixir'
import { generateUuidV4 } from '@/app/lib/config'

export function Mindmap({ data, isMindMap }: { data: any; isMindMap?: boolean }) {
  const { mindmap: mindMap = {}, episodeTitle } = data || {}
  const [isLoad, setIsLoad]: any = useState(false)
  let options = {
    el: '#mindMap', // or HTMLDivElement
    data: {
      nodeData: { id: generateUuidV4(), topic: mindMap?.description, children: mindMap?.children?.map(changeNode) },
    },
    editable: false,
    scaleVal: 0.8,
  }
  function changeNode(node: any) {
    const { description, children } = node
    return {
      ...node,
      id: generateUuidV4(),
      topic: description,
      children: children.map(changeNode),
    }
  }
  useEffect(() => {
    const mind = new MindElixir(options)
    mind?.init(options.data)
    mind?.refresh()
    // const data = MindElixir.new('new topic')
    if (isMindMap) {
      setTimeout(() => {
        const toCenter: any = document.getElementById('toCenter')
        toCenter.click()
        console.log(toCenter, 'toCenter')
      }, 50)
    }
  }, [isMindMap])
  return (
    <div key="Mindmap" className={`p-[12px]`}>
      <div id="mindMap" className={`h-[450px] bg-hbg`}></div>
    </div>
  )
}
