'use client'
import { useEffect, useState, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { delay, free, summarized, summarizing } from '@/app/lib/config'
import { useMyContext } from '@/context/MyContext'
import { useUserInfo } from '@/context/UserInfo'

export function Tab({ tabList = [], data }: { tabList: any[]; data: any }) {
  const {
    enclosureUrl = '',
    showTitle = '',
    showNotes = '',
    coverUrl = '',
    episodeTitle = '',
    episodeId = '',
    episodeStatus = '',
  } = data || {}
  const audioInfo = { enclosureUrl, showTitle, showNotes, coverUrl, episodeTitle, episodeId }
  const [activeTab, setActiveTab] = useState(tabList[0].key)
  const [activeTime, setActiveTime] = useState(0)
  const { setData, setIsPlaying, setStepTime } = useMyContext()
  const { userInfo } = useUserInfo()
  const [topNum, setTopNum] = useState(57)
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
    setData(audioInfo)
    setTimeout(() => {
      setStepTime(t)
      setIsPlaying(true)
    }, 300)
    // setActiveTime(t)
  }

  useEffect(() => {
    const box: any = document.querySelector('.episode-item')
    const titleBar: any = document.querySelector('.episodeDetail')
    const cTop = tabList.find((i) => i.key === activeTab)?.top || 0
    const tNum = titleBar?.offsetHeight || 0
    box.scrollTop = cTop
    if (tNum > topNum) {
      setTopNum(tNum)
    }
  }, [activeTab])
  const {
    email = '',
    role = '',
    billingCycle = '',
    viewQuota = 0,
    startQuota = 0,
    extraStartQuota = 0,
    hasBalance = false,
  } = userInfo || {}
  //是否已登录
  const isLogin = !!email
  //是否免费用户
  const isFree = role === free
  //是否爱处理过
  const isSummarized = episodeStatus === summarized
  const showNots = tabList.at(-1)
  // const sortTabList = isSummarized ? tabList
  return (
    <div className={`flex flex-col`}>
      <Tabs value={activeTab} className={``}>
        <TabsList
          className={`flex tab_scroll sticky bg-white mb-[15px] z-10 dark:bg-black border-b-[1px] border-[#FFE1D3] dark:border-play rounded-[0px]`}
          style={{ top: `${topNum}px` }}
        >
          {tabList.map((item: any) => (
            <TabsTrigger value={item.key} key={item.key} className={`flex-1`} onClick={() => tabChange(item.key)}>
              <h2>{item.title}</h2>
            </TabsTrigger>
          ))}
        </TabsList>
        {/*{tabList.map((item: any) => (*/}
        {/*  <TabsContent value={item.key} key={item.key}></TabsContent>*/}
        {/*))}*/}
        <div className={`text-md text-fontGry-600 flex-1 overflow-hidden`}>
          {tabList.map((tab) => (
            <div key={tab.key} style={{ display: activeTab === tab.key ? 'block' : 'none' }}>
              {tab.com({ data, activeTab, goThisTime })}
            </div>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
