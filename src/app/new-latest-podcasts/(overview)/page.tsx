// import { Card } from '@/app/ui/dashboard/cards'
import CardWrapper from '@/app/ui/dashboard/cards'
import RevenueChart from '@/app/ui/dashboard/revenue-chart'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import { Suspense } from 'react'
import { LoadingLine } from '@/app/ui/skeletons'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'dashboard',
}
export default async function Page() {
  console.log(process.env.NODE_ENV, 'env', process.env.NEXT_PUBLIC_API_URL)
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>{process.env.NEXT_PUBLIC_MODE}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<LoadingLine />}>
          <CardWrapper />
        </Suspense>
        {/*<Card title="Collected" value={totalPaidInvoices} type="collected" />*/}
        {/*<Card title="Pending" value={totalPendingInvoices} type="pending" />*/}
        {/*<Card title="Total Invoices" value={numberOfInvoices} type="invoices" />*/}
        {/*<Card title="Total Customers" value={numberOfCustomers} type="customers" />*/}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/*<RevenueChart revenue={revenue} />*/}
        <Suspense fallback={<LoadingLine />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LoadingLine />}>
          <LatestInvoices />
        </Suspense>
        {/*<LatestInvoices latestInvoices={latestInvoices} />*/}
      </div>
    </main>
  )
}
