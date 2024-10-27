'use client'
import { useRouter } from 'next/navigation'

export function Keywords({ data }: { data: any }) {
  const { keywords = [] } = data || {}
  return (
    <div key="Keywords">
      {keywords?.map((keyword: any, ind: number) => (
        <div className={`pb-[12px] border-b-[1px] border-e8e mb-[15px] dark:border-fontGry-600`} key={`${keyword.title}-${ind}`}>
          <div className={`text-lg mb-[14px] mb-[9px] flex items-center`}>
            <span className={`w-[5px] h-[30px] rounded-[3px] bg-play mr-[13px] dark:bg-white`}></span>
            <span className={`text-play dark:text-white`}>{keyword.title}</span>
          </div>
          <div className={`text-md dark:text-homehbg`}>{keyword.description}</div>
        </div>
      ))}
    </div>
  )
}
