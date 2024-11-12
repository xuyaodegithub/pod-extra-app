import { POPULARITY, PUB_DATE, SUMMARIZE_TIME, TRANSCRIPT_TIME, getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import SearchTabs from '@/app/ui/search/search-tabs'
import SearchPodcasts from '@/app/ui/search/search-podcasts'
import SearchEpisodes from '@/app/ui/search/search-episodes'

export const metadata: Metadata = getMetaData({
  title: 'Search | PodExtra.AI',
  description: '',
  keywords: '',
})
export default async function Search({
  searchParams,
}: {
  searchParams?: {
    pageSize?: string
    page?: string
    query?: string
  }
}) {
  const { pageSize, page, query } = searchParams || {}
  console.log(pageSize, page, query, '-----')

  return (
    <main className={`flex flex-col`}>
      <SearchTabs className={`mb-[22px]`} />
      <SearchPodcasts />
      <SearchEpisodes />
    </main>
  )
}
