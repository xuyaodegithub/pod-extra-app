'use client'
import { useRouter } from 'next/navigation'

export function Keywords({ data }: { data: any }) {
  const { keywords = [] } = data || {}
  return (
    <div key="Keywords">
      {keywords?.map((keyword: any) => (
        <div className={`pb-[12px] border-b-[1px] border-e8e mb-[15px]`} key={keyword.keyword}>
          <div className={`text-lg mb-[14px] mb-[9px] flex items-center`}>
            <span className={`w-[5px] h-[30px] rounded-[3px] bg-play mr-[13px]`}></span>
            <span className={`text-play`}>{keyword.keyword}</span>
          </div>
          <div className={`text-md`}>{keyword.description}</div>
        </div>
      ))}
    </div>
  )
}
