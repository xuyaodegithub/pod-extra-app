'use client'
import { planTab, monthly, yearly, free, standard, pro } from '@/app/lib/config'
import { useState, useEffect } from 'react'
import { useUserInfo } from '@/context/UserInfo'
import { useMyContext } from '@/context/MyContext'
import { createOrder } from '@/app/lib/service'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function PlanSku({ skuList }: { skuList: any[] }) {
  const { userInfo } = useUserInfo()
  const [activeTab, setActiveTab] = useState(yearly)
  const [loadingSkuId, setLoadingSkuId] = useState('')
  const { isDark } = useMyContext()
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
  return (
    <div>
      <div
        className={`w-[320px] mx-auto rounded-[22px] mb-[30px] font-bold text-[15px] text-fontGry-600 flex justify-center leading-[45px] bg-hbg dark:bg-bgDark dark:text-white`}
      >
        {planTab.map((item) => (
          <div
            key={item.val}
            className={`flex items-center justify-center cursor-pointer w-[160px] rounded-[22px] text-center transition-colors ${activeTab === item.val ? 'bg-play text-white' : ''}`}
            onClick={() => setActiveTab(item.val)}
          >
            {item.label}
            {item.val === yearly && (
              <span
                className={`ml-[4px] rounded-[10px] text-min px-[8px] ${activeTab === yearly ? 'text-[#D64300] bg-[#FFE1D3]' : 'text-hbg bg-[#c9c9c9]'}`}
              >
                {+percent * 100}% OFF
              </span>
            )}
          </div>
        ))}
      </div>
      <div className={`flex mb-[20px]`}>
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
              className={`shadow-planShow rounded-[26px] w-[320px] py-[50px] px-[30px] bg-hbg  dark:bg-bgDark dark:text-white ${isStandard ? 'bg-play text-white mx-[20px] dark:bg-play dark:text-white' : 'text-fontGry-600'}`}
              key={planCode}
            >
              <div
                className={`flex text-[17px] leading-[23px] ${activeTab === monthly ? 'mb-[20px]' : ''} ${isFree ? (activeTab === monthly ? 'mb-[20px]' : 'mb-[40px]') : ''}`}
              >
                <span className={`text-[36px] leading-[46px] font-bold`}>{isFree ? 'USD 0' : `${currency} ${price}`}</span>
                <span className={`self-end ml-[5px]`}>/month</span>
              </div>
              {!isMonth && !isFree && (
                <div
                  className={`rounded-[13px] ${isStandard ? 'text-white bg-[#DB4500]' : 'text-play bg-[#FFE1D3]'} text-sm font-bold leading-[27px] w-[150px] text-center mb-[13px]`}
                >
                  {`${currency} ${skuForYear.unitPrice} yearly`}
                </div>
              )}
              <div className={`font-semibold text-[28px] leading-[38px] mb-[10px]`}>{planName}</div>
              <div className={`text-[15px] leading-[20px] mb-[20px]`}>{planDescription}</div>
              <div
                className={`flex items-center justify-center font-semibold cursor-pointer text-[15px] leading-[45px] mb-[22px] rounded-[24px] ${dis ? 'bg-he5 text-fontGry-100 cursor-not-allowed dark:bg-darkHomeBg dark:text-fontGry-100' : 'bg-[#FFE1D3] text-play'} ${isCurrent ? 'text-fontGry-600 dark:text-fontGry-100 dark:bg-he5' : ''}`}
                onClick={() => createNewOrder(item, dis, showLoading)}
              >
                {showLoading && <Loader2 className="animate-spin mr-[8px]" />}
                {label}
              </div>
              <div className={`text-[15px] leading-[20px]`}>
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
      <div className={`text-[15px] leading-[25px] text-[#C3C3C3] px-[20px] dark:text-fontGry-600`}>
        <div>
          <span className={`inline-block mr-[8px]`}>*</span> Only episodes that have already been AI-processed.
        </div>
        <div className={`flex items-center`}>
          <img src={`/plan/${isDark ? 'robot-white' : 'robot'}.svg`} alt="" className={`mr-[8px]`} />
          We will automatically process the episodes of top podcasts with AI.
        </div>
        <div className={`flex items-center`}>
          <img src={`/plan/emoji-smile${isDark ? '-dark' : ''}.svg`} alt="" className={`mr-[8px]`} />
          We offer a 7-day full refund service. For details, see our{' '}
          <Link className={`ml-[4px]`} href="/refund-policy.html" target="_blank">
            {' '}
            refund policy.
          </Link>
        </div>
      </div>
    </div>
  )
}
