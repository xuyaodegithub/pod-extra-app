'use client'
import { useMyContext } from '@/context/MyContext'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'
import SearchPodcastCard from './search-podcast-card'
import { searchTabs } from '@/app/lib/config'
import { useSearchParams } from 'next/navigation'
import Pagination from '@/app/ui/pagination'

export default function SearchPodcasts({ podcasts, setActiveTab, activeTab }: { podcasts: any; setActiveTab: any; activeTab: string }) {
  const { isDark } = useMyContext()
  return (
    <div className={`mb-[20px]`}>
      {activeTab === searchTabs[1].key ? (
        <div className={`pb-[20px] pt-[22px] sticky top-[36px] dark:bg-darkBody z-[99]`}>
          <Pagination totalPages={podcasts.length} total={podcasts.length} title="podcasts" />
        </div>
      ) : (
        <div
          className={`mt-[22px] flex items-center mb-[12px] text-lg text-fontGry-600 ml-[24px] font-bold cursor-pointer`}
          onClick={() => setActiveTab(searchTabs[1].key)}
        >
          <div className={`${styles.hoverBBorder} dark:text-white`}>Podcasts</div>
          <ChevronRightIcon className={`ml-[10px] w-[20px] dark:text-white`} />
        </div>
      )}

      <div className={`border-[1px] border-bgGray rounded-[10px] p-[14px] dark:border-fontGry-600`}>
        {podcasts.map((item: any, ind: number) => {
          const { coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate, showUrl } = item
          const noMb = ind >= podcasts.length - 1
          return (
            <SearchPodcastCard
              item={{ coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate, showUrl }}
              noMb={noMb}
              key={showId}
            />
          )
        })}
      </div>
      {podcasts.length > 4 && activeTab === searchTabs[0].key && (
        <div
          className="border-[1px] border-bgGray dark:border-fontGry-600 rounded-[6px] w-[160px] flex items-center justify-center text-sm text-fontGry-600 py-[6px] px-[10px] mt-[20px] mx-auto cursor-pointer dark:text-white"
          onClick={() => setActiveTab(searchTabs[1].key)}
        >
          <span>show all podcasts</span>
          <ChevronRightIcon className={`w-[14px] dark:text-white`} />
        </div>
      )}
    </div>
  )
}
