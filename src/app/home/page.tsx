// import { Card } from '@/app/ui/dashboard/cards'
// import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data'
import { Suspense } from 'react'
import { RevenueChartSkeleton } from '@/app/ui/skeletons'
import SearchInput from '@/app/ui/home/searchInput'
import PopularPodcasts from '@/app/ui/home/popular-podcasts'
import LatestEpisodes from '@/app/ui/home/latest-episodes'
import Categories from '@/app/ui/home/categories'

export default async function Home() {
  return (
    <main>
      <div className={`mb-24px`}>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <SearchInput />
        </Suspense>
      </div>
      <div className={`mb-24px`}>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <PopularPodcasts title={`Popular Podcasts`} />
        </Suspense>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <PopularPodcasts title={`Latest Podcasts`} />
        </Suspense>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <LatestEpisodes title={`Latest Episodes`} />
        </Suspense>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <Categories title={`Categories`} />
        </Suspense>
      </div>
    </main>
  )
}
