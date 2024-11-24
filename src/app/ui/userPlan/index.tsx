'use client'
import UserHead from '@/app/ui/home/userHead'
import { useUserInfo } from '@/context/UserInfo'
import { formatDate } from '@/app/lib/utils'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'

export default function UserPlan({ quotaList }: { quotaList: any[] }) {
  const [showQuotas, setShowQuotas] = useState(false)
  const [showOrder, setShowOrder] = useState(false)
  const [quotaId, setQuotaId] = useState('')
  const searchParams = useSearchParams()
  const orderId = searchParams?.get('orderId')
  const isVip = true
  const { userInfo } = useUserInfo()
  const list = [
    {
      skuId: 'quota-10',
      unitPrice: 6.9,
      currency: 'USD',
      skuName: '10 episodes',
      tag: '',
      isDefault: false,
      billingCycle: 'once',
    },
    {
      skuId: 'quota-20',
      unitPrice: 9.9,
      currency: 'USD',
      skuName: '20 episodes',
      tag: '',
      isDefault: true,
      billingCycle: 'once',
    },
    {
      skuId: 'quota-50',
      unitPrice: 19.9,
      currency: 'USD',
      skuName: '50 episodes',
      tag: '',
      isDefault: false,
      billingCycle: 'once',
    },
  ]
  function checkQuote(skuId: string) {
    console.log(skuId, 'skuId')
    setQuotaId(skuId)
  }
  function confirmQuota() {}
  useEffect(() => {
    const defaultSku = list.find((item) => item.isDefault) || list[0]
    setQuotaId(defaultSku?.skuId)
  }, [])
  useEffect(() => {
    if (orderId) {
      setShowOrder(true)
    }
  }, [orderId])
  return (
    <div className={`flex justify-between relative`}>
      <div
        className={`mr-[10px] px-[26px] py-[20px] bg-hbg rounded-[5px] flex-1 text-fontGry-600 shadow-planShow dark:bg-bgDark dark:text-white`}
      >
        <div className={`flex items-center mb-[12px]`}>
          <UserHead name={userInfo?.name?.slice(0, 1)} className={`text-max0 w-[60px] h-[60px] leading-[60px]`} />
          <div className={`text-md text-fontGry-600 leading-[22px] ml-[10px] flex-1 overflow-hidden`}>
            <div className={`font-semibold overflow-hidden text-ellipsis whitespace-nowrap dark:text-white`}>{userInfo?.name}</div>
            <div className={`text-sm overflow-hidden text-ellipsis whitespace-nowrap dark:text-homehbg`}>{userInfo?.email}</div>
          </div>
        </div>
        {/*Current plan*/}
        <div className={`font-semibold text-lg mb-[10px]`}>Current plan: Standard (Monthly)</div>
        <div className={`flex items-center text-sm dark:text-fontGry-600`}>
          <img src="/plan/info-circle.svg" alt="" className={`mr-[10px]`} />
          <span className={`text-[#bbbbbb] dark:text-fontGry-600`}>
            {isVip ? 'Automatically renew on the 15th of each month.' : `Join date: ${formatDate(Date.now())}`}
          </span>
        </div>
        {/*Manage on Stripe*/}
        {isVip && (
          <div
            className={`inline-block text-md mt-[15px] leading-[40px] px-[12px] rounded-[5px] bg-[#E5E5E5] font-semibold cursor-pointer dark:bg-darkHomeBg dark:text-fontGry-100`}
          >
            Manage on Stripe
          </div>
        )}
      </div>
      <div className={`px-[26px] py-[20px] bg-hbg rounded-[5px] flex-1 text-fontGry-600 shadow-planShow dark:bg-bgDark dark:text-white`}>
        <div className={`text-lg mb-[10px]`}>
          <span className={`text-play font-semibold`}>Remaining quotas</span> for AI content
        </div>
        <div className={'relative mb-[10px] dark:text-homehbg'}>
          <div className={`flex items-center text-md mb-[5px]`}>
            <img src="/plan/eye.svg" alt="" className={`mr-[10px]`} />
            view： <span className={`text-play font-semibold`}> Unlimited episodes</span>
          </div>
          <div className={`flex items-center text-sm`}>
            <img src="/plan/info-circle.svg" alt="" className={`mr-[10px] self-start mt-[4px] ml-[3px]`} />
            <span className={`text-[#bbbbbb] dark:text-fontGry-600`}>
              Only episodes that have already been AI-processed. Reset to 4 on the 15th of each month.
            </span>
          </div>
          <div className={`w-[333px] border-b-[1px] border-homehbg mt-[10px]`}></div>
        </div>
        <div className={'relative mb-[10px] dark:text-homehbg'}>
          <div className={`flex items-center text-md mb-[5px]`}>
            <img src="/plan/diamond.svg" alt="" className={`mr-[10px]`} />
            Monthly initiate AI processing：<span className={`text-play font-semibold`}> 20 episodes</span>
          </div>
          <div className={`flex items-center text-sm`}>
            <img src="/plan/info-circle.svg" alt="" className={`mr-[10px] self-start mt-[4px] ml-[3px]`} />
            <span className={`text-[#bbbbbb] dark:text-fontGry-600`}>According to the plan. Reset to 20 on the 15th of each month.</span>
          </div>
          <div className={`w-[333px] border-b-[1px] border-homehbg mt-[10px]`}></div>
        </div>
        <div className={'relative mb-[15px] dark:text-homehbg'}>
          <div className={`flex items-center text-md mb-[5px]`}>
            <img src="/plan/diamond-play.svg" alt="" className={`mr-[10px]`} />
            Extra initiate AI processing：<span className={`text-play font-semibold`}> 0 episodes</span>
          </div>
          <div className={`flex items-center text-sm`}>
            <img src="/plan/info-circle.svg" alt="" className={`mr-[10px] self-start mt-[4px] ml-[3px]`} />
            <span className={`text-[#bbbbbb] dark:text-fontGry-600`}>
              Never expire. Extra quota consumed only after monthly quota used up.
            </span>
          </div>
        </div>
        <div
          className={`inline-block cursor-pointer text-white text-md leading-[40px] px-[18px] bg-play rounded-[5px]`}
          onClick={() => setShowQuotas(!showQuotas)}
        >
          Purchase extra quotas
        </div>
      </div>
      <Dialog open={showQuotas} onOpenChange={(val: boolean) => setShowQuotas(val)}>
        <DialogContent className={`w-[640px] bg-white dark:bg-bgDark rounded-[20px] pb-[29px]`}>
          <DialogHeader>
            <DialogTitle className={`font-bold text-[20px] leading-[1] mb-[20px] py-[12px] text-fontGry-600 dark:text-white px-[20px]`}>
              Purchase extra quotas For AI processing
            </DialogTitle>
            <DialogDescription className={``}>
              <div className={`px-[20px]`}>
                {list?.map((item) => {
                  const { skuId, unitPrice, currency, skuName, isDefault, billingCycle } = item
                  const isCheck = item.skuId === quotaId
                  return (
                    <div
                      className={`cursor-pointer flex items-center text-lg text-[#252A31] p-[16px] mb-[15px] rounded-[6px] border-2 ${isCheck ? ' border-play' : 'shadow-quotaShadow border-[rgba(0,0,0,0)]'}`}
                      onClick={() => checkQuote(skuId)}
                      key={skuId}
                    >
                      <img src="/plan/diamond-play.svg" alt="" className={`mr-[5px]`} />
                      <span className={`font-normal mr-[14px] dark:text-fontGry-100`}>{skuName}</span>
                      <span className={`font-light text-[#4F5E71] text-sm dark:text-homehbg`}>
                        {currency} {(unitPrice / 10).toFixed(2)} per time
                      </span>
                      <span className={`ml-auto text-play font-semibold leading-[24px] flex items-center`}>
                        <span className={`${isCheck ? 'text-play' : 'text-[#252A31] dark:text-homehbg'}`}>
                          {currency} {unitPrice}
                        </span>
                        <img src={`/plan/${isCheck ? 'Radio' : 'Radio2'}.svg`} alt="" className={`ml-[8px]`} />
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className={`flex text-sm text-[#bbbbbb] mb-[29px] px-[20px]`}>
                <img src="/plan/info-circle.svg" alt="" className={`mr-[10px] self-start mt-[4px] dark:text-fontGry-600`} />
                <span className={`tracking-[0.42px] dark:text-fontGry-600`}>
                  Extra quotas never expire. Extra quotas consumed only after monthly quotas used up.
                </span>
              </div>
              <div className={`flex items-center justify-between`}>
                <div
                  className={`cursor-pointer w-[140px] text-md leading-[40px] text-[#bbbbbb] text-center bg-hbg rounded-[5px] dark:text-fontGry-100 dark:bg-darkHomeBg`}
                  onClick={() => setShowQuotas(false)}
                >
                  Cancel
                </div>
                <div
                  className={`cursor-pointer w-[140px] text-md leading-[40px] text-white text-center bg-play rounded-[5px]`}
                  onClick={confirmQuota}
                >
                  Purchase
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={showOrder} onOpenChange={(val: boolean) => setShowOrder(val)}>
        <DialogContent className={`w-[640px] bg-white dark:bg-bgDark rounded-[20px] pb-[29px]`}>
          <DialogHeader>
            <DialogTitle className={`font-bold text-[20px] leading-[1] py-[12px] mb-[12px] text-fontGry-600 dark:text-white px-[20px]`}>
              Payment successful
            </DialogTitle>
            <DialogDescription className={``}>
              <div className={`text-md text-fontGry-600 mb-[29px] px-[20px] dark:text-homehbg font-normal`}>
                <span className={`font-bold`}>Congratulations！</span>
                <br />
                The payment was successful.
                <br /> Thank you for your trust and support in PodExtra. Please feel free to contact us if you have any questions.
                <br />
                Enjoy!
              </div>
              <div className={`flex items-center`}>
                <div
                  className={`cursor-pointer w-[140px] text-md leading-[40px] text-white text-center bg-play rounded-[5px] ml-auto`}
                  onClick={confirmQuota}
                >
                  OK
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
