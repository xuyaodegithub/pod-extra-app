'use client'
import { planTab, monthly, yearly, free, standard, pro } from '@/app/lib/config'
import { useState, useEffect } from 'react'
import { useUserInfo } from '@/context/UserInfo'
import { useMyContext } from '@/context/MyContext'
import { createOrder } from '@/app/lib/service'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PlanSku({ skuList, isLanding }: { skuList: any[]; isLanding?: boolean }) {
  const { userInfo, setShowDialog } = useUserInfo()
  const [activeTab, setActiveTab] = useState(yearly)
  const [loadingSkuId, setLoadingSkuId] = useState('')
  const { isDark } = useMyContext()
  const { push } = useRouter()
  //FREE|STANDARD｜PRO  付费周期MONTHLY|YEAYLY
  let { role = free, billingCycle = monthly, gmtSubscriptionStart, gmtSubscriptionEnd } = userInfo || {}

  function UpgradePlan(planCode: string = 'FREE') {
    role = role || free
    const userIsFree = role === free
    const userIsStandard = role === standard
    const userIsPro = role === pro
    let obj: any = {
      [free]: { label: userIsFree ? 'Current Plan' : 'Unavailable', dis: true, isCurrent: userIsFree },
      [standard]: {
        label: userIsStandard ? 'Current Plan' : userIsFree ? 'Upgrade to this plan' : 'Unavailable',
        dis: !userIsFree,
        isCurrent: userIsStandard,
      },
      [pro]: {
        label: userIsPro ? 'Current Plan' : userIsFree ? 'Upgrade to this plan' : 'Unavailable',
        dis: !userIsFree,
        isCurrent: userIsPro,
      },
    }
    return obj[planCode] || obj[free]
  }
  const { skus } = skuList.find((item) => item.planCode === standard) || skuList[0]
  const skuForMonth: any = skus.find((sku: any) => sku.billingCycle === monthly) || {}
  const skuForYear: any = skus.find((sku: any) => sku.billingCycle === yearly) || {}
  const percent = ((skuForMonth.unitPrice - (skuForYear.unitPrice || 0) / 12) / skuForMonth.unitPrice).toFixed(2)
  async function createNewOrder(item: any, dis: boolean, loading: boolean) {
    if (dis || loading) return
    const { skus } = item
    const sku = skus.find((sku: any) => sku.billingCycle === activeTab)
    if (sku) {
      setLoadingSkuId(sku?.skuId)
      const {
        data: { checkoutUrl },
      } = await createOrder({ skuId: sku?.skuId })
      setLoadingSkuId('')
      if (checkoutUrl) window.location.href = checkoutUrl
    }
  }
  function previewPlan() {
    if (userInfo?.role) {
      push('/plan-pricing')
    } else {
      setShowDialog(true)
    }
  }
  return (
    <div>
      <div
        className={`w-[2.6rem] plus:w-[320px] mx-auto rounded-[22px] mb-[30px] font-bold text-[13px] plus:text-[15px] text-fontGry-600 flex plus:justify-center leading-[0.35rem] plus:leading-[45px] bg-hbg dark:bg-bgDark dark:text-white`}
      >
        {planTab.map((item) => (
          <div
            key={item.val}
            className={`flex items-center justify-center cursor-pointer w-[1.3rem] plus:w-[160px] rounded-[22px] text-center transition-colors ${activeTab === item.val ? 'bg-play text-white' : ''}`}
            onClick={() => setActiveTab(item.val)}
          >
            {item.label}
            {item.val === yearly && (
              <span
                className={`max-plus:leading-[18px] ml-[4px] rounded-[8px] plus:rounded-[10px] text-[10px] plus:text-min px-[0.05rem] plus:px-[8px] ${activeTab === yearly ? 'text-[#D64300] bg-[#FFE1D3]' : 'text-hbg bg-[#c9c9c9]'}`}
              >
                {+percent * 100}% OFF
              </span>
            )}
          </div>
        ))}
      </div>
      <div className={`flex mb-[20px] max-plus:px-[15px] max-plus:overflow-auto ${isLanding && 'plus:justify-center'}`}>
        {skuList.map((item) => {
          const { planName, planCode, planDescription, benefits, skus } = item
          const isFree = planCode === 'FREE'
          const skuForMonth: any = skus.find((sku: any) => sku.billingCycle === monthly) || {}
          const skuForYear: any = skus.find((sku: any) => sku.billingCycle === yearly) || {}
          const isMonth = activeTab === monthly
          const currency = isMonth ? skuForMonth.currency : skuForYear.currency
          const price = isMonth ? skuForMonth.unitPrice : ((skuForYear.unitPrice || 0) / 12).toFixed(1)
          const { label, dis, isCurrent } = UpgradePlan(planCode)
          const isStandard = planCode === 'STANDARD'
          const showLoading = skus.some((i: any) => i?.skuId === loadingSkuId)
          return (
            <div
              className={`shrink-0 shadow-planShow rounded-[26px] w-[2.6rem] plus:w-[320px] py-[0.4rem] px-[0.24rem] plus:py-[50px] plus:px-[30px] bg-hbg  dark:bg-bgDark dark:text-white ${isStandard ? `bg-play text-white ${isLanding ? 'mx-[0.4rem] plus:mx-[60px]' : 'mx-[20px]'} dark:bg-play dark:text-white` : 'text-fontGry-600'}`}
              key={planCode}
            >
              <div
                className={`flex text-min plus:text-[17px] pb-[8px] leading-[23px] ${activeTab === monthly ? 'mb-[20px]' : ''} ${isFree ? (activeTab === monthly ? 'mb-[20px]' : 'mb-[40px]') : ''}`}
              >
                <span className={`text-[0.24rem] plus:text-[36px] leading-[1] font-bold`}>{isFree ? 'USD 0' : `${currency} ${price}`}</span>
                <span className={`self-end ml-[5px]`}>/month</span>
              </div>
              {!isMonth && !isFree && (
                <div
                  className={`rounded-[13px] ${isStandard ? 'text-white bg-[#DB4500]' : 'text-play bg-[#FFE1D3]'} text-sm font-bold leading-[27px] w-[150px] text-center mb-[13px]`}
                >
                  {`${currency} ${skuForYear.unitPrice} yearly`}
                </div>
              )}
              <div className={`font-semibold text-[0.24rem] plus:text-[28px] leading-[0.3rem] plus:leading-[38px] mb-[10px]`}>
                {planName}
              </div>
              <div className={`text-min plus:text-[15px] plus:leading-[20px] mb-[20px]`}>{planDescription}</div>
              {!isLanding ? (
                <div
                  className={`flex items-center justify-center font-semibold cursor-pointer text-min plus:text-[15px] leading-[0.32rem] plus:leading-[45px] mb-[22px] rounded-[24px] ${dis ? 'bg-he5 text-fontGry-100 cursor-not-allowed dark:bg-darkHomeBg dark:text-fontGry-100' : 'bg-[#FFE1D3] text-play'} ${isCurrent ? 'text-fontGry-600 dark:text-fontGry-100 dark:bg-he5' : ''}`}
                  onClick={() => createNewOrder(item, dis, showLoading)}
                >
                  {showLoading && <Loader2 className="animate-spin mr-[8px]" />}
                  {label}
                </div>
              ) : (
                <div
                  className={`flex items-center justify-center font-semibold cursor-pointer text-min plus:text-[15px] leading-[0.36rem] plus:leading-[45px] mb-[0.16rem] plus:mb-[22px] rounded-[0.18rem] plus:rounded-[24px] bg-[#FFE1D3] text-play`}
                  onClick={previewPlan}
                >
                  Get Started
                </div>
              )}
              <div className={`text-min plus:text-[15px] plus:leading-[20px]`}>
                {benefits?.map((benefit: any) => (
                  <div className={`flex items-center mb-[5px] tracking-[-0.5px]`} key={benefit.content}>
                    <img src={`/plan/check-circle-${isStandard ? '2' : '1'}.svg`} alt="" className={`self-start mr-[10px]`} />
                    <span>{benefit.content}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div
        className={`text-min plus:text-[15px] plus:leading-[25px] text-[#C3C3C3] px-[17px] plus:px-[20px] dark:text-fontGry-600 ${isLanding && 'plus:pl-[100px]'}`}
      >
        <div>
          <span className={`inline-block mr-[8px]`}>*</span> Only episodes that have already been AI-processed.
        </div>
        <div className={`flex items-center`}>
          <img src={`/plan/${isDark ? 'robot-white' : 'robot'}.svg`} alt="" className={`mr-[8px] max-plus:self-start`} />
          We will automatically process the episodes of top podcasts with AI.
        </div>
        <div className={`flex items-center`}>
          <img src={`/plan/emoji-smile${isDark ? '-dark' : ''}.svg`} alt="" className={`mr-[8px] max-plus:self-start`} />
          <span>
            We offer a 7-day full refund service. For details, see our{' '}
            <Link className={`ml-[4px] underline`} href="/refund-policy.html" target="_blank">
              {' '}
              refund policy.
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
