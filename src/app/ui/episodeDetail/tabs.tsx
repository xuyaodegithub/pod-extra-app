'use client'
import { useEffect, useState, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
export function Tab({ tabList = [], data }: { tabList: any[]; data: any }) {
  const [activeTab, setActiveTab] = useState(tabList[0].key)
  function tabChange(key: string) {
    if (activeTab === key) return
    const box: any = document.querySelector('.episode-item')
    const top = box?.scrollTop
    const ind = tabList.findIndex((i) => i.key === activeTab)
    if (ind > -1) tabList[ind].top = top
    setActiveTab(key)
  }
  useEffect(() => {
    const box: any = document.querySelector('.episode-item')
    const cTop = tabList.find((i) => i.key === activeTab)?.top || 0
    box.scrollTop = cTop
  }, [activeTab])
  return (
    <div className={`h-[100%] flex flex-col`}>
      <Tabs value={activeTab} className={`pb-[100px]`}>
        <TabsList className={`flex sticky top-0 bg-white mb-[22px] z-10`}>
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
              {tab.com({ data })}
            </div>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
