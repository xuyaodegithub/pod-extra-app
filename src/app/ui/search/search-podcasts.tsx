'use client'
import { useMyContext } from '@/context/MyContext'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'
import SearchPodcastCard from './search-podcast-card'
import { searchTabs } from '@/app/lib/config'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Pagination from '@/app/ui/pagination'

export default function SearchPodcasts({ podcasts, tab }: { podcasts: any; tab: string }) {
  const { isDark, tabsPage, setTabsPage } = useMyContext()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const { push } = useRouter()
  const { resultList, total } = podcasts
  const pageSize = searchParams.get('pageSize') || 10
  const totalPages = Math.ceil(+total / +pageSize)
  const word = searchParams.get('word') || ''

  function changeTab(key: string) {
    const params = new URLSearchParams(searchParams)
    const page = tabsPage.get(key) || 1
    params.set('tab', key)
    params.set('page', page)
    setTabsPage(tabsPage.set(tab, currentPage))
    push(`${pathname}?${params.toString()}`)
  }
  return (
    <div className={`mb-[20px]`}>
      {tab === searchTabs[1].key ? (
        <div className={`pb-[20px] pt-[12px] sticky top-[36px] bg-white dark:bg-darkBody z-[99]`}>
          <Pagination totalPages={totalPages} total={total} title="podcasts" />
        </div>
      ) : (
        <div
          className={`mt-[12px] flex items-center mb-[12px] text-lg text-fontGry-600 ml-[24px] font-bold cursor-pointer`}
          onClick={() => changeTab(searchTabs[1].key)}
        >
          <div className={`${styles.hoverBBorder} dark:text-white`}>Podcasts</div>
          <ChevronRightIcon className={`ml-[10px] w-[20px] dark:text-white`} />
        </div>
      )}

      {resultList?.length ? (
        <div className={`border-[1px] border-bgGray rounded-[10px] p-[14px] dark:border-fontGry-600`}>
          {resultList.map((item: any, ind: number) => {
            const { coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate, showUrl } = item
            const noMb = ind >= resultList.length - 1
            return (
              <SearchPodcastCard
                item={{ coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate, showUrl }}
                noMb={noMb}
                key={showId}
              />
            )
          })}
        </div>
      ) : (
        <div
          className={`text-sm text-fontGry-600 leading-[100px] text-center border-[1px] border-bgGray rounded-[10px] dark:border-fontGry-600 dark:text-fontGry-100`}
        >
          No result found for "{decodeURIComponent(word)}"
        </div>
      )}
      {total > 10 && tab === searchTabs[0].key && (
        <div
          className="border-[1px] border-bgGray dark:border-fontGry-600 rounded-[6px] w-[160px] flex items-center justify-center text-sm text-fontGry-600 py-[6px] px-[10px] mt-[20px] mx-auto cursor-pointer dark:text-white"
          onClick={() => changeTab(searchTabs[1].key)}
        >
          <span>show all podcasts</span>
          <ChevronRightIcon className={`w-[14px] dark:text-white`} />
        </div>
      )}
    </div>
  )
}
