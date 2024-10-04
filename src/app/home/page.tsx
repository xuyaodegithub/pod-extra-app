// import { Card } from '@/app/ui/dashboard/cards'
// import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data'
import { Suspense } from 'react'
import { LoadingLine } from '@/app/ui/skeletons'
import SearchInput from '@/app/ui/home/searchInput'
import PopularPodcasts from '@/app/ui/home/popular-podcasts'
import LatestEpisodes from '@/app/ui/home/latest-episodes'
import Categories from '@/app/ui/home/categories'
import { POPULARITY, PUB_DATE, SUMMARIZE_TIME } from '@/app/lib/utils'

export default async function Home() {
  return (
    <main>
      <div className={`mb-24px`}>
        <Suspense fallback={<LoadingLine />}>
          <PopularPodcasts title={`Popular Podcasts`} type={POPULARITY} key={POPULARITY} />
        </Suspense>
        <Suspense fallback={<LoadingLine />}>
          <PopularPodcasts title={`Latest Podcasts`} type={PUB_DATE} key={PUB_DATE} />
        </Suspense>
        <Suspense fallback={<LoadingLine />}>
          <LatestEpisodes title={`Latest Episodes`} type={PUB_DATE} />
        </Suspense>
        <Suspense fallback={<LoadingLine />}>
          <LatestEpisodes title={`Latest AI-processed`} type={SUMMARIZE_TIME} />
        </Suspense>
        <Suspense fallback={<LoadingLine />}>
          <Categories title={`Categories`} />
        </Suspense>
      </div>
    </main>
  )
}
