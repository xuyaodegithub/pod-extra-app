'use client'
import { getNoTagText } from '@/app/lib/utils'

export function Shownotes({ data }: { data: any }) {
  const { showNotes = '' } = data || {}
  return (
    <div key="Shownotes">
      <div className={`text-min text-homehbg pb-[12px] border-b-[1px] border-e8e mb-[15px]`}>
        Shownotes are provided by podcaster, not generated by AI.
      </div>
      <div className={`text-md text-fontGry-600`}>{getNoTagText(showNotes)}</div>
    </div>
  )
}
