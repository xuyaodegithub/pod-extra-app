'use client'
import { useMyContext } from '@/context/MyContext'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'
import SearchEpisodesCard from '@/app/ui/search/search-episodes-card'
import { searchTabs } from '@/app/lib/config'
import Pagination from '@/app/ui/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SearchEpisodes({ episodes, tab }: { episodes: any; tab: string }) {
  const { isDark, tabsPage, setTabsPage } = useMyContext()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const { push } = useRouter()
  const { resultList, total } = episodes
  const pageSize = searchParams.get('pageSize') || 10
  const totalPages = Math.ceil(+total / +pageSize)

  function changeTab(key: string) {
    const params = new URLSearchParams(searchParams)
    const page = tabsPage.get(key) || 1
    params.set('tab', key)
    params.set('page', page)
    setTabsPage(tabsPage.set(tab, currentPage))
    params.set('tab', key)
    push(`${pathname}?${params.toString()}`)
  }
  return (
    <div>
      {tab === searchTabs[2].key ? (
        <div className={`pb-[20px] pt-[22px] sticky top-[36px] bg-white dark:bg-darkBody z-[99]`}>
          <Pagination totalPages={totalPages} total={total} />
        </div>
      ) : (
        <div
          className={`mt-[22px] flex items-center mb-[12px] text-lg text-fontGry-600 ml-[24px] font-bold cursor-pointer`}
          onClick={() => changeTab(searchTabs[2].key)}
        >
          <div className={`${styles.hoverBBorder} dark:text-white`}>Episodes</div>
          <ChevronRightIcon className={`ml-[10px] w-[20px] dark:text-white`} />
        </div>
      )}
      <div className={`border-[1px] border-bgGray rounded-[10px] p-[14px] dark:border-fontGry-600`}>
        {resultList.map((item: any, ind: number) => {
          const { coverUrl, episodeTitle, gmtPubDate, showTitle, showCoverUrl, showNotes, episodeId, duration, episodeUrl, enclosureUrl } =
            item
          const noMb = ind >= episodes.length - 1
          return (
            <SearchEpisodesCard
              item={{
                coverUrl,
                episodeTitle,
                gmtPubDate,
                showTitle,
                showCoverUrl,
                showNotes,
                episodeId,
                duration,
                episodeUrl,
                enclosureUrl,
              }}
              noMb={noMb}
              key={episodeId}
            />
          )
        })}
      </div>
      {total > 10 && tab === searchTabs[0].key && (
        <div
          className="border-[1px] border-bgGray dark:border-fontGry-600 rounded-[6px] w-[160px] flex items-center justify-center text-sm text-fontGry-600 py-[6px] px-[10px] mt-[20px] mx-auto cursor-pointer dark:text-white"
          onClick={() => changeTab(searchTabs[2].key)}
        >
          <span>show all podcasts</span>
          <ChevronRightIcon className={`w-[14px] dark:text-white`} />
        </div>
      )}
    </div>
  )
}
