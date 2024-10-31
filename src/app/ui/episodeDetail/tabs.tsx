'use client'
import { useEffect, useState, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { delay } from '@/app/lib/config'
export function Tab({ tabList = [], data }: { tabList: any[]; data: any }) {
  const [activeTab, setActiveTab] = useState(tabList[0].key)
  const [activeTime, setActiveTime] = useState(0)
  function tabChange(key: string) {
    if (activeTab === key) return
    const box: any = document.querySelector('.episode-item')
    const top = box?.scrollTop
    const ind = tabList.findIndex((i) => i.key === activeTab)
    if (ind > -1) tabList[ind].top = top
    setActiveTab(key)
  }
  async function goThisTime(t: number) {
    const box: any = document.querySelector('.episode-item')
    const item: any = tabList.find((i) => i.key === 'TRANSCRIPT')
    setActiveTab(item?.key)
    await delay(200)
    setActiveTime(t)
  }

  useEffect(() => {
    const box: any = document.querySelector('.episode-item')
    const cTop = tabList.find((i) => i.key === activeTab)?.top || 0
    box.scrollTop = cTop
  }, [activeTab])
  useEffect(() => {
    const box: any = document.querySelector('.episode-item')
    if (activeTime > 0) {
      const el: any = document.querySelector(`.active_${((activeTime || '') + '').replace(/\./g, '_')}`)
      // const parseEl: any = el.parentNode
      const top = el?.offsetTop - 100
      console.log('activeTime', activeTime, `.active_${((activeTime || '') + '').replace(/\./g, '_')}`, el, top, activeTab)
      // box.scrollTo({})
      box.scrollTop = top
      el.classList.add('flash')
      setActiveTime(0)
    }
  }, [activeTime])
  return (
    <div className={`flex flex-col`}>
      <Tabs value={activeTab} className={``}>
        <TabsList
          className={`flex sticky top-[57px] bg-white mb-[22px] z-10 dark:bg-black border-b-[1px] border-[#FFE1D3] dark:border-play rounded-[0px]`}
        >
          {tabList.map((item: any) => (
            <TabsTrigger value={item.key} key={item.key} className={`flex-1`} onClick={() => tabChange(item.key)}>
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {/*{tabList.map((item: any) => (*/}
        {/*  <TabsContent value={item.key} key={item.key}></TabsContent>*/}
        {/*))}*/}
        <div className={`text-md text-fontGry-600 flex-1 overflow-hidden`}>
          {tabList.map((tab) => (
            <div key={tab.key} style={{ display: activeTab === tab.key ? 'block' : 'none' }}>
              {tab.com({ data, isMindMap: activeTab === tabList[2].key, goThisTime })}
            </div>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
