import Pagination from '@/app/ui/pagination'
import { getPodShow } from '@/app/lib/service'
import { getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
import UserHead from '@/app/ui/home/userHead'
import UserPlan from '@/app/ui/userPlan'

const y = new Date().getFullYear()
export const metadata: Metadata = getMetaData({
  title: `The Latest Episodes of  ${y - 1}-${y} | PodExtra.AI`,
  description: `PodExtra keeps a close eye on Latest Episodes, bringing you updates on popular Episodes as soon as they're available, ensuring that you can transcribe and summarize the content right away.`,
  keywords: '',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/plan-pricing`,
  },
})
export default async function Page() {
  return (
    <main className="">
      <UserPlan />
    </main>
  )
}
