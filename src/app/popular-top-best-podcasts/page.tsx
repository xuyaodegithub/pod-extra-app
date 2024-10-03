import { Card } from '@/app/ui/dashboard/cards'
// import RevenueChart from '@/app/ui/dashboard/revenue-chart'
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data'

export default async function Page() {
  const revenue = await fetchRevenue()
  // const latestInvoices = await fetchLatestInvoices()
  const { numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices } = await fetchCardData()
  return <main></main>
}
