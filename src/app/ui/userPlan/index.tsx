'use client'
import UserHead from '@/app/ui/home/userHead'
import { useUserInfo } from '@/context/UserInfo'
import { formatDate } from '@/app/lib/utils'
export default async function UserPlan() {
  const isVip = true
  const { userInfo } = useUserInfo()
  return (
    <div className={`flex justify-between`}>
      <div className={`mr-[10px] px-[26px] py-[20px] bg-hbg rounded-[5px] flex-1 text-fontGry-600 shadow-planShow`}>
        <div className={`flex items-center mb-[12px]`}>
          <UserHead name={userInfo?.name?.slice(0, 1)} className={`w-[60px] h-[60px] text-max leading-[60px]`} />
          <div className={`text-md text-fontGry-600 leading-[22px] ml-[10px] flex-1 overflow-hidden`}>
            <div className={`font-semibold overflow-hidden text-ellipsis whitespace-nowrap dark:text-white`}>{userInfo?.name}</div>
            <div className={`text-sm overflow-hidden text-ellipsis whitespace-nowrap dark:text-homehbg`}>{userInfo?.email}</div>
          </div>
        </div>
        {/*Current plan*/}
        <div className={`font-semibold text-lg mb-[10px]`}>Current plan: Standard (Monthly)</div>
        <div className={`flex items-center text-sm`}>
          <img src="/plan/info-circle.svg" alt="" className={`mr-[10px]`} />
          <span className={`text-[#bbbbbb]`}>
            {isVip ? 'Automatically renew on the 15th of each month.' : `Join date: ${formatDate(Date.now())}`}
          </span>
        </div>
        {/*Manage on Stripe*/}
        {isVip && (
          <div className={`inline-block text-md mt-[15px] leading-[40px] px-[12px] rounded-[5px] bg-[#E5E5E5] font-semibold`}>
            Manage on Stripe
          </div>
        )}
      </div>
      <div className={`px-[26px] py-[20px] bg-hbg rounded-[5px] flex-1 text-fontGry-600 shadow-planShow`}>
        <div className={`text-lg mb-[10px]`}>
          <span className={`text-play font-semibold`}>Remaining quotas</span> for AI content
        </div>
        <div className={'relative mb-[10px]'}>
          <div className={`flex items-center text-md mb-[5px]`}>
            <img src="/plan/eye.svg" alt="" className={`mr-[10px]`} />
            view： <span className={`text-play font-semibold`}> Unlimited episodes</span>
          </div>
          <div className={`flex items-center text-sm`}>
            <img src="/plan/info-circle.svg" alt="" className={`mr-[10px] self-start mt-[4px] ml-[3px]`} />
            <span className={`text-[#bbbbbb]`}>
              Only episodes that have already been AI-processed. Reset to 4 on the 15th of each month.
            </span>
          </div>
          <div className={`w-[333px] border-b-[1px] border-homehbg mt-[10px]`}></div>
        </div>
        <div className={'relative mb-[10px]'}>
          <div className={`flex items-center text-md mb-[5px]`}>
            <img src="/plan/diamond.svg" alt="" className={`mr-[10px]`} />
            Monthly initiate AI processing：<span className={`text-play font-semibold`}> 20 episodes</span>
          </div>
          <div className={`flex items-center text-sm`}>
            <img src="/plan/info-circle.svg" alt="" className={`mr-[10px] self-start mt-[4px] ml-[3px]`} />
            <span className={`text-[#bbbbbb]`}>According to the plan. Reset to 20 on the 15th of each month.</span>
          </div>
          <div className={`w-[333px] border-b-[1px] border-homehbg mt-[10px]`}></div>
        </div>
        <div className={'relative mb-[15px]'}>
          <div className={`flex items-center text-md mb-[5px]`}>
            <img src="/plan/diamond-play.svg" alt="" className={`mr-[10px]`} />
            Extra initiate AI processing：<span className={`text-play font-semibold`}> 0 episodes</span>
          </div>
          <div className={`flex items-center text-sm`}>
            <img src="/plan/info-circle.svg" alt="" className={`mr-[10px] self-start mt-[4px] ml-[3px]`} />
            <span className={`text-[#bbbbbb]`}>Never expire. Extra quota consumed only after monthly quota used up.</span>
          </div>
        </div>
        <div className={`inline-block cursor-pointer text-white text-md leading-[40px] px-[18px] bg-play rounded-[5px]`}>
          Purchase extra quotas
        </div>
      </div>
    </div>
  )
}
