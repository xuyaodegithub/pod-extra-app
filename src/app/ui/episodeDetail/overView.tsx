'use client'
import { useRouter } from 'next/navigation'

export function OverView({ data }: { data: any }) {
  const { summary = '' } = data || {}
  return (
    <div className={`text-fontGry-600`} key="OverView">
      <h3 className={`font-bold mb-[10px] dark:text-white`}>AI Summary</h3>
      <div className={`dark:text-homehbg`}>{summary}</div>
    </div>
  )
}
