// import { Card } from '@/app/ui/dashboard/cards'
// import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data'
import { Suspense, lazy } from 'react'
import { LoadingLine } from '@/app/ui/skeletons'
// import SearchInput from '@/app/ui/home/searchInput'
const PopularPodcasts = lazy(() => import('@/app/ui/home/popular-podcasts')) //import PopularPodcasts from '@/app/ui/home/popular-podcasts'
const LatestEpisodes = lazy(() => import('@/app/ui/home/latest-episodes')) //import LatestEpisodes from '@/app/ui/home/latest-episodes'
const Categories = lazy(() => import('@/app/ui/home/categories')) //import Categories from '@/app/ui/home/categories'
import { POPULARITY, PUB_DATE, SUMMARIZE_TIME, TRANSCRIPT_TIME, getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
export const metadata: Metadata = getMetaData({
  title: 'PodExtra.AI - Best Podcast Tool With AI Podcast Transcript and Summary',
  description:
    'PodExtra is your ultimate podcast tool , using AI to transcribe, summarize, and create mind maps for your favorite podcasts, making it easy for you to quickly access structured knowledge and save time.',
  keywords: 'AI transcribe,summarize,AI-processed,mind maps,latest podcasts,Latest Episodes,Popular Podcasts',
})
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
          <LatestEpisodes title={`Latest AI-processed`} type={TRANSCRIPT_TIME} />
        </Suspense>
        <Suspense fallback={<LoadingLine />}>
          <Categories title={`Categories`} />
        </Suspense>
      </div>
    </main>
  )
}
