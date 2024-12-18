'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export function OverView({ data }: { data: any }) {
  const [showMore, setShowMore] = useState(true)
  const [boxHeight, setBoxHeight] = useState('auto')
  const { summary = '' } = data || {}
  const boxRef = useRef<any>(null)
  const list = [
    'The discussion centers on the future of AI-assisted programming, emphasizing the use of React for web design and the role of AI agents in automating tasks. Key points include the importance of speed through cache management, the challenges of bug detection, and the potential for formal verification in coding. The conversation highlights the balance between user intent and AI capabilities in programming environments.',
    'The discussion centers on the future of AI-assisted programming, emphasizing the use of React for web design and the role of AI agents in automating tasks. Key points include the importance of speed through cache management, the challenges of bug detection, and the potential for formal verification in coding. The conversation highlights the balance between user intent and AI capabilities in programming environments.',
    'The discussion centers on the future of AI-assisted programming, emphasizing the use of React for web design and the role of AI agents in automating tasks. Key points include the importance of speed through cache management, the challenges of bug detection, and the potential for formal verification in coding. The conversation highlights the balance between user intent and AI capabilities in programming environments.',
    'The discussion centers on the future of AI-assisted programming, emphasizing the use of React for web design and the role of AI agents in automating tasks. Key points include the importance of speed through cache management, the challenges of bug detection, and the potential for formal verification in coding. The conversation highlights the balance between user intent and AI capabilities in programming environments.',
    'The discussion centers on the future of AI-assisted programming, emphasizing the use of React for web design and the role of AI agents in automating tasks. Key points include the importance of speed through cache management, the challenges of bug detection, and the potential for formal verification in coding. The conversation highlights the balance between user intent and AI capabilities in programming environments.',
    'The discussion centers on the future of AI-assisted programming, emphasizing the use of React for web design and the role of AI agents in automating tasks. Key points include the importance of speed through cache management, the challenges of bug detection, and the potential for formal verification in coding. The conversation highlights the balance between user intent and AI capabilities in programming environments.The discussion centers on the future of AI-assisted programming, emphasizing the use of React for web design and the role of AI agents in automating tasks. Key points include the importance of speed through cache management, the challenges of bug detection, and the potential for formal verification in coding. The conversation highlights the balance between user intent and AI capabilities in programming environments.',
  ]
  useEffect(() => {
    const h = boxRef.current.offsetHeight
    setBoxHeight(h)
  }, [])
  return (
    <div className={`text-fontGry-600 dark:text-homehbg`} key="OverView">
      <h3 className={`font-bold mb-[20px] text-play flex items-center`}>
        <span className={`h-[20px] w-[5px] bg-play rounded-[3px] mr-[10px]`}></span>AI Summary
      </h3>
      <div className={`mb-[20px]`}>{summary}</div>
      <div className={`overflow-hidden transition-all`} ref={boxRef} style={{ height: showMore ? 0 : boxHeight + 'px' }}>
        {list?.map((i) => (
          <div className={`flex items-center mb-[20px]`}>
            <span className={`w-[4px] h-[4px] bg-fontGry-600 dark:bg-homehbg rounded self-start mt-[12px] mx-[10px]`}></span>
            <span className={`flex-1`}>{i}</span>
          </div>
        ))}
      </div>
      <div
        className={`mb-[40px] bg-white text-min px-[10px] py-[2px] text-fontGry-c8 rounded-[8px] border border-fontGry-c8 cursor-pointer w-[85px] dark:bg-bgDark dark:text-homehbg`}
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? 'show more' : 'show less'}
      </div>
      <div>
        <h3 className={`font-bold mb-[20px] text-play flex items-center`}>
          <span className={`h-[20px] w-[5px] bg-play rounded-[3px] mr-[10px]`}></span>Takeaways
        </h3>
      </div>
    </div>
  )
}
