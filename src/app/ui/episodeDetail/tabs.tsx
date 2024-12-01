'use client'
import { useEffect, useState, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { delay, free, summarized, summarizing, standard, pro, yearly } from '@/app/lib/config'
import { useMyContext } from '@/context/MyContext'
import { useUserInfo } from '@/context/UserInfo'
import { formatDate, monthsUntilEnd, timeFormat, capitalizeFirstLetter } from '@/app/lib/utils'
import { useRouter } from 'next/navigation'
import { getEpisodeSummarize, getEpisodeTranscript, createSummarizeTask } from '@/app/lib/service'
import { Spin } from 'antd'
import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getNextResetTimeString } from '@/lib/utils'

export function Tab({ tabList = [], data }: { tabList: any[]; data: any }) {
  const {
    enclosureUrl = '',
    showTitle = '',
    showNotes = '',
    coverUrl = '',
    episodeTitle = '',
    episodeId = '',
    // episodeStatus = '',
    // hasViewed = false,
    // summarizedByMe = false,
  } = data || {}
  const audioInfo = { enclosureUrl, showTitle, showNotes, coverUrl, episodeTitle, episodeId }
  const [activeTab, setActiveTab] = useState(tabList[0].key)
  const [tabs, setTabs] = useState(tabList)
  const { setData, setIsPlaying, setStepTime, isDark } = useMyContext()
  const { userInfo, setShowDialog, loading, initUserInfo } = useUserInfo()
  const [dataWithAi, setDataWithAi] = useState({})
  const [topNum, setTopNum] = useState(57)
  const [loadData, setLoadData] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [hasViewed, setHasViewed] = useState(data?.hasViewed || false)
  const [summarizedByMe, setSummarizedByMe] = useState(data?.summarizedByMe || false)
  const [episodeStatus, setEpisodeStatus] = useState(data?.episodeStatus || '')
  const { push, refresh } = useRouter()
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
  }
  function sortArray(list: any[], key: number) {
    const last = list.pop()
    list.splice(key, 0, last)
    return list.map((item, ind) => ({ ...item, disable: ind > key }))
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
    gmtSubscriptionEnd,
    gmtSubscriptionStart,
    gmtSignUp,
  } = userInfo || {}
  //是否已登录
  const isLogin = !!email
  //是否免费用户
  const isFree = role === free
  //付费用户
  const isVip = role !== free && role
  //是否ai处理过
  const isSummarized = episodeStatus === summarized
  //处理中
  const isSummarizing = episodeStatus === summarizing
  // free  且 没view次数了
  const isFreeNoViewNum = isFree && viewQuota < 1
  //refresh day
  const refreshDay = new Date(gmtSubscriptionStart).getDay()
  async function fetchData() {
    setLoadData(true)
    try {
      const [res1, res2] = await Promise.all([getEpisodeSummarize(episodeId), getEpisodeTranscript(episodeId)])
      const summery = res1.data
      const paragraphs = res2.data?.paragraphs || []
      setDataWithAi({ ...summery, paragraphs })
    } catch (e) {}
    setLoadData(false)
    if (isFree && !hasViewed) {
      initUserInfo()
    }
    setHasViewed(true)
  }
  useEffect(() => {
    if (isSummarized) {
      if ((isFree && !hasViewed) || !isLogin) {
        setTabs(sortArray([...tabList], 1))
      } else {
        setTabs(tabList)
      }
    } else {
      setTabs(sortArray([...tabList], 0))
      setActiveTab(tabList.at(-1)?.key)
    }
  }, [setTabs, isSummarized, hasViewed, setActiveTab, isFree])
  useEffect(() => {
    console.log(hasViewed, 'hasViewed', data)
    if (isSummarized && isLogin && hasViewed) {
      fetchData()
    }
  }, [isLogin, isSummarized])
  function viewOrLogin() {
    if (isFreeNoViewNum) return
    if (isLogin) {
      fetchData()
      refresh()
    } else {
      setShowDialog(true)
    }
  }
  function toPringPage() {
    if (isLogin) {
      push('/plan-pricing')
    } else {
      setShowDialog(true)
    }
  }
  async function confirmToAi() {
    if (confirmLoading) return
    setConfirmLoading(true)
    try {
      const { data } = await createSummarizeTask(episodeId)
      setShowConfirm(false)
      setConfirmLoading(false)
      setSummarizedByMe(true)
      setEpisodeStatus(summarizing)
      initUserInfo()
      refresh()
    } catch (e) {
      setConfirmLoading(false)
    }
  }
  function runAiTask() {
    setShowConfirm(true)
  }
  return (
    <div className={`flex flex-col`}>
      {(loading || loadData) && (
        <Loader2 className="animate-spin absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-play" />
      )}
      <Tabs value={activeTab}>
        <TabsList
          className={`flex tab_scroll sticky bg-white mb-[15px] z-10 dark:bg-black border-b-[1px] border-[#FFE1D3] dark:border-play rounded-[0px]`}
          style={{ top: `${topNum}px` }}
        >
          {tabs.map((item: any) => (
            <TabsTrigger
              value={item.key}
              key={item.key}
              disabled={item.disable}
              className={`flex-1 ${item.disable ? 'text-fontGry-100 cursor-not-allowed dark:text-fontGry-600' : ''}`}
              onClick={() => tabChange(item.key)}
            >
              <h2>{item.title}</h2>
            </TabsTrigger>
          ))}
        </TabsList>
        {/*{tabList.map((item: any) => (*/}
        {/*  <TabsContent value={item.key} key={item.key}></TabsContent>*/}
        {/*))}*/}
        {/*free用户 || 未登录 且ai处理过的*/}
        <div className={` ${loading || loadData ? 'hidden' : ''}`}>
          {((isFree && !hasViewed) || !isLogin) && isSummarized && (
            <div className={`rounded-[5px] bg-hbg p-[20px] mb-[15px] dark:bg-bgDark dark:text-homehbg`}>
              <div className={`text-sm text-fontGry-100 mb-[16px] dark:text-homehbg`}>
                <p>Free users can view 4 episodes that have already been processed by AI.</p>
                <p>
                  {isLogin
                    ? `${viewQuota || 0} episodes left. Reset to 4 on ${getNextResetTimeString(gmtSignUp)}`
                    : 'Please sign in to view.'}
                </p>
              </div>
              <div
                className={`cursor-pointer text-sm leading-[28px] ${isLogin ? 'w-[200px]' : 'w-[90px]'} text-center rounded-[5px] text-white mb-[28px] ${isFreeNoViewNum ? 'bg-[#c8c8c8] dark:bg-darkHomeBg dark:text-fontGry-100' : 'bg-play'}`}
                onClick={viewOrLogin}
              >
                {isLogin ? 'View AI-processed content' : 'Sign in'}
              </div>
              <div
                className={`cursor-pointer inline-block text-sm text-fontGry-100 border-b-[1px] dark:text-fontGry-600`}
                onClick={toPringPage}
              >
                Want unlimited viewing? Subscribe &nbsp;
              </div>
            </div>
          )}
          {/*ai未处理过的*/}
          {!isSummarized && (
            <div>
              {(isFree || !isLogin) && (
                <div className={`rounded-[5px] bg-hbg p-[20px] mb-[15px] dark:bg-bgDark dark:text-homehbg`}>
                  {isLogin ? (
                    <div className={`text-sm text-fontGry-600 mb-[16px] dark:text-homehbg`}>
                      This episode isn't AI-processed yet.
                      <br />
                      Free users can view 4 episodes that have already been processed by AI.
                      <p className={`mb-[15px] mt-[16px] text-fontGry-100 dark:text-fontGry-600 cursor-pointer`} onClick={toPringPage}>
                        Want to initiate AI processing of episodes, or view unlimited AI contents?
                      </p>
                    </div>
                  ) : (
                    <div className={`text-sm text-fontGry-600 mb-[16px] dark:text-homehbg`}>
                      Free users can view 4 episodes that have already been processed by AI.
                      <br />
                      Please sign in to view.
                    </div>
                  )}
                  <div
                    className={`cursor-pointer text-sm leading-[28px] ${isLogin ? 'w-[200px]' : 'w-[90px]'} text-center rounded-[5px] text-white mb-[10px] bg-play`}
                    onClick={toPringPage}
                  >
                    {isLogin ? 'Subscribe' : 'Sign in'}
                  </div>
                  {!isLogin && (
                    <div
                      className={`cursor-pointer inline-block text-sm text-fontGry-100 border-b-[1px] dark:text-fontGry-100`}
                      onClick={toPringPage}
                    >
                      Want unlimited viewing? Subscribe &nbsp;
                    </div>
                  )}
                </div>
              )}
              {/*付费用户显示*/}
              {!isFree && isLogin && (
                <div className={`text-sm text-fontGry-600 dark:text-homehbg`}>
                  {isSummarizing ? (
                    <div className={`rounded-[5px] bg-hbg p-[20px] mb-[15px] dark:bg-bgDark dark:text-homehbg`}>
                      <div className={`flex items-center`}>
                        <img src={`/plan/${isDark ? 'robot' : 'robot-white'}.svg`} alt="" className={`mr-[4px]`} /> This episode is on AI
                        processing...
                      </div>
                      <div className={`text-fontGry-100 pb-[20px]`}>
                        {summarizedByMe
                          ? 'We will notify you by email after it is completed.'
                          : 'You can come back later to see if it is completed.'}
                      </div>
                    </div>
                  ) : (
                    <div className={`rounded-[5px] bg-hbg p-[20px] mb-[15px] dark:bg-bgDark dark:text-homehbg`}>
                      <div>
                        <span>This episode isn't AI-processed yet.</span>
                        <br />
                        <span className={`text-fontGry-100 dark:text-fontGry-100`}>
                          {capitalizeFirstLetter(role.toLowerCase())} plan users can initiate AI processing of {role === standard ? 20 : 50}{' '}
                          episodes per month.
                        </span>
                      </div>
                      <div className={`text-fontGry-100 mb-[10px]`}>
                        {startQuota || 0} monthly quotas left. Reset to {role === standard ? 20 : 50} on{' '}
                        {getNextResetTimeString(gmtSubscriptionStart)}
                        <br />
                        {extraStartQuota || 0} extra quotas left.
                      </div>
                      <div
                        className={`mb-[10px] cursor-pointer text-sm leading-[28px] w-[200px] text-center rounded-[5px] text-white ${!hasBalance ? 'bg-[#c8c8c8]' : 'bg-play'}`}
                        onClick={runAiTask}
                      >
                        Initiate AI processing
                      </div>
                      <div className={`cursor-pointer inline-block text-sm text-fontGry-100 border-b-[1px]`} onClick={toPringPage}>
                        Want more quotas? Purchase &nbsp;
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <div className={`text-md text-fontGry-600 flex-1 overflow-hidden`}>
            {tabList.map((tab) => (
              <div key={tab.key} style={{ display: activeTab === tab.key ? 'block' : 'none' }}>
                {tab.com({ data: { ...data, ...dataWithAi }, activeTab, goThisTime })}
              </div>
            ))}
          </div>
        </div>
      </Tabs>
      <Dialog open={showConfirm} onOpenChange={(val: boolean) => setShowConfirm(val)}>
        <DialogContent className={`w-[640px] bg-white dark:bg-bgDark rounded-[20px] pb-[29px]`}>
          <DialogHeader>
            <DialogTitle className={`font-bold text-[20px] leading-[1] py-[12px] mb-[12px] text-fontGry-600 dark:text-white px-[20px]`}>
              Initiate AI processing
            </DialogTitle>
            <DialogDescription className={``}>
              <div className={`text-md text-fontGry-600 mb-[40px] px-[20px] dark:text-homehbg font-normal`}>
                One {startQuota > 0 ? 'monthly' : 'extra'} quota will be deducted after the AI-process of the episode is completed. Click
                "run" to start the process.
              </div>
              <div className={`flex items-center justify-between px-[20px]`}>
                <div
                  className={`cursor-pointer w-[140px] text-md leading-[40px] text-[#bbbbbb] text-center bg-hbg rounded-[5px] dark:text-fontGry-100 dark:bg-darkHomeBg`}
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </div>
                <div
                  className={`flex items-center justify-center cursor-pointer w-[140px] text-md leading-[40px] text-white text-center bg-play rounded-[5px]`}
                  onClick={confirmToAi}
                >
                  {confirmLoading && <Loader2 className="animate-spin mr-[8px]" />}
                  Run
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
