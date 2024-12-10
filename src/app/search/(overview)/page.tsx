import { POPULARITY, PUB_DATE, SUMMARIZE_TIME, TRANSCRIPT_TIME, getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import SearchTabs from '@/app/ui/search/search-tabs'
import { searchTabs } from '@/app/lib/config'
import SearchPodcasts from '@/app/ui/search/search-podcasts'
import SearchEpisodes from '@/app/ui/search/search-episodes'
import { getSearchList } from '@/app/lib/service'
import { createServerAxios } from '@/app/lib/serveFetch'

export const metadata: Metadata = getMetaData({
  title: 'Search | PodExtra.AI',
  description: '',
  keywords: '',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/search`,
  },
})
export default async function Search({
  searchParams,
}: {
  searchParams?: {
    pageSize?: string
    page?: string
    word?: string
    tab?: string
  }
}) {
  const { pageSize, page, word = '', tab = searchTabs[0].key } = searchParams || {}
  const payload = {
    keyword: decodeURIComponent(word || ''),
    searchType: tab,
    pageNum: page,
    pageSize: pageSize,
  }
  const { instance } = await createServerAxios()
  const {
    data: {
      data: { podcasts = {}, episodes = {} },
    },
  } = await instance.post(`/v1/search`, payload)
  console.log(podcasts, episodes, '——————搜索详情')

  // const {
  //   data: { podcasts = {}, episodes = {} },
  // } = await getSearchList(payload)
  return (
    <main className={`flex flex-col`}>
      <SearchTabs className={``} tab={tab} />
      {tab !== searchTabs[2].key && <SearchPodcasts podcasts={podcasts} tab={tab} />}
      {tab !== searchTabs[1].key && <SearchEpisodes episodes={episodes} tab={tab} />}
    </main>
  )
}
