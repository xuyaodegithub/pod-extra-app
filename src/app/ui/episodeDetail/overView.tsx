'use client'
import { useRouter } from 'next/navigation'

export function OverView({ data }: { data: any }) {
  const { summary = '' } = data || {}
  return (
    <div className={`text-fontGry-600`} key="OverView">
      <div className={`font-bold mb-[10px]`}>AI Summary</div>
      <div>{summary}</div>
    </div>
  )
}
