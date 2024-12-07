import { getSkuList } from '@/app/lib/service'
import { getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
import UserPlan from '@/app/ui/userPlan'
import PlanSku from '@/app/ui/userPlan/planSku'

const y = new Date().getFullYear()
export const metadata: Metadata = getMetaData({
  title: `Plan & Pricing | PodExtra.AI`,
  description: `Check out our plans and prices here. You can view your current subscribed plan and remaining usage quota. Tailor your choice for an enhanced podcast experience.`,
  keywords: '',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/plan-pricing`,
  },
})
export default async function Page({ searchParams }: { searchParams?: { pageSize?: string; page?: string } }) {
  const payload = {
    page: searchParams?.page || '1',
    pageSize: searchParams?.pageSize || '10',
  }
  const {
    data: { memberPlan, quota },
  } = await getSkuList(payload)
  return (
    <main className="">
      <div className={`mb-[67px]`}>
        <UserPlan quotaList={quota} />
      </div>
      <div className={`text-max3 text-[#c9c9c9] text-center mb-[20px] font-bold`}>Choose the plan you like</div>
      <PlanSku skuList={memberPlan} />
      <div className={`flex`}></div>
    </main>
  )
}
