'use client'
import { useMyContext } from '@/context/MyContext'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'
import SearchEpisodesCard from '@/app/ui/search/search-episodes-card'
import { searchTabs } from '@/app/lib/config'
import Pagination from '@/app/ui/pagination'

export default function SearchEpisodes({ episodes, activeTab, setActiveTab }: { episodes: any; activeTab: string; setActiveTab: any }) {
  const { isDark } = useMyContext()
  return (
    <div>
      {activeTab === searchTabs[2].key ? (
        <div className={`pb-[20px] pt-[22px] sticky top-[36px] dark:bg-darkBody z-[99]`}>
          <Pagination totalPages={episodes.length} total={episodes.length} />
        </div>
      ) : (
        <div
          className={`mt-[22px] flex items-center mb-[12px] text-lg text-fontGry-600 ml-[24px] font-bold cursor-pointer`}
          onClick={() => setActiveTab(searchTabs[2].key)}
        >
          <div className={`${styles.hoverBBorder} dark:text-white`}>Episodes</div>
          <ChevronRightIcon className={`ml-[10px] w-[20px] dark:text-white`} />
        </div>
      )}
      <div className={`border-[1px] border-bgGray rounded-[10px] p-[14px] dark:border-fontGry-600`}>
        {episodes.map((item: any, ind: number) => {
          const { coverUrl, episodeTitle, gmtPubDate, showTitle, showCoverUrl, showNotes, episodeId, duration, episodeUrl } = item
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
              }}
              noMb={noMb}
              key={episodeId}
            />
          )
        })}
      </div>
      {episodes.length > 4 && activeTab === searchTabs[0].key && (
        <div
          className="border-[1px] border-bgGray dark:border-fontGry-600 rounded-[6px] w-[160px] flex items-center justify-center text-sm text-fontGry-600 py-[6px] px-[10px] mt-[20px] mx-auto cursor-pointer dark:text-white"
          onClick={() => setActiveTab(searchTabs[2].key)}
        >
          <span>show all podcasts</span>
          <ChevronRightIcon className={`w-[14px] dark:text-white`} />
        </div>
      )}
    </div>
  )
}
