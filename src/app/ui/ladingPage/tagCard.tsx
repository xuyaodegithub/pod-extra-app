'use client'
import { useState } from 'react'
import { useMyContext } from '@/context/MyContext'
import Link from 'next/link'
import TagCardItem from './tagCardItem'
import { summarized } from '@/app/lib/config'
import { useEffect, useRef } from 'react'
import { getLandingTagEpisodeByClient } from '@/app/lib/service'
const dataMap: any = new Map()

export default function TagCard({ tags, firstTagEpisodes }: { tags: any[]; firstTagEpisodes: any[] }) {
  const { isDark } = useMyContext()
  const [resultList, setResultList] = useState<any[]>([...firstTagEpisodes])
  const [activeTag, setActiveTag] = useState(tags[0] || {})
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fetchData = async () => {
      const payload = { pageNum: 1, pageSize: 20 }
      const {
        data: { resultList },
      } = await getLandingTagEpisodeByClient(activeTag.tagId, payload)
      setResultList(resultList)
      dataMap.set(activeTag.tagId, resultList)
    }
    if (dataMap.has(activeTag?.tagId) || activeTag?.tagId === tags[0]?.tagId) {
      setResultList(dataMap.get(activeTag.tagId) || firstTagEpisodes)
    } else {
      fetchData()
    }
  }, [activeTag])
  async function getTagEpisodes() {
    if (!activeTag?.tagId) return
    const payload = { pageNum: 1, pageSize: 20 }
    const {
      data: { resultList },
    } = await getLandingTagEpisodeByClient(activeTag.tagId, payload)
    dataMap.set(activeTag.tagId, resultList)
  }
  useEffect(() => {
    // const timer = setInterval(() => {
    //   const box: any = scrollRef.current
    //   const list = [...document.querySelectorAll('.tagCardItem')]
    //   const { top } = box.getBoundingClientRect()
    //   const current: any = list.find((i) => {
    //     const rect = i.getBoundingClientRect()
    //     return rect.top - top >= 0
    //   })
    //   if (current) {
    //     const { top: t } = current.getBoundingClientRect()
    //     const { scrollHeight, scrollTop, offsetHeight } = box
    //     const maxScrollTop = scrollHeight - offsetHeight
    //     const endScrollTop = scrollTop + current?.offsetHeight + t - top
    //     box.scrollTo({ top: endScrollTop > maxScrollTop ? 0 : endScrollTop, behavior: 'smooth' })
    //   }
    // }, 3000)
    // return () => {
    //   clearInterval(timer)
    // }
  }, [])
  return (
    <div className={``}>
      <div
        className={`flex flex-wrap max-h-[86px] overflow-hidden plus:max-h-none sticky z-[33] bg-white dark:bg-darkBody py-[10px] top-[56px] plus:relative plus:top-0`}
      >
        {tags.map((tab: any, index: number) => (
          <div
            className={`cursor-pointer text-sm px-[5px] mr-[10px] mb-[10px] py-[4px] rounded-5px ${isDark ? 'bg-bgDark text-white' : 'bg-bgGray text-fontGry-600'} ${activeTag.tagId === tab?.tagId ? 'bg-play text-white' : ''}`}
            key={tab.tagId}
            onClick={() => setActiveTag(tab)}
          >
            {tab?.tagName || '-'}
          </div>
        ))}
      </div>
      <div className={`plus:min-h-[200px]`}>
        <div className={`plus:max-h-[500px] overflow-auto relative`} ref={scrollRef}>
          {resultList
            ?.slice(0, 5)
            ?.map((card: any, index: number) => <TagCardItem card={card} key={card.episodeId} isLast={index === resultList?.length - 1} />)}
        </div>
        <Link
          href={`${activeTag.tagUrl}`}
          className={`sticky plus:static top-[182px] mt-[20px] block text-center w-[88px] mx-auto text-sm text-fontGry-600 py-[4px] border-[1px] rounded-[8px] border-[#D9D9D9] dark:bg-bgDark dark:border-darkHomeBg dark:text-fontGry-c8`}
        >
          view all
        </Link>
      </div>
    </div>
  )
}
