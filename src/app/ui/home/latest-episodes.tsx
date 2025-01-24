// import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'
import { getPodEpisode } from '@/app/lib/service'
import { Card } from '@/app/ui/home/episodes-card'
import tagCardItem from '@/app/ui/ladingPage/tagCardItem'
import Link from 'next/link'
import { POPULARITY, PUB_DATE, SUMMARIZE_TIME, TRANSCRIPT_TIME } from '@/app/lib/utils'
import TagCardItem from '@/app/ui/ladingPage/tagCardItem'
export default async function LatestEpisodes({ title, type, params }: { title: string; type: string; params: any }) {
  const payload = {
    sortBy: type,
    ...params,
  }
  const {
    data: { resultList },
  } = await getPodEpisode(payload)
  const urlObj: any = {
    [PUB_DATE]: '/new-latest-episodes',
    [SUMMARIZE_TIME]: '/latest-ai-processed-episodes',
  }
  return resultList.length ? (
    <div className={`plus:bg-gray-1000 rounded-10px py-[11px] px-[15px] mb-24px dark:bg-bgDark`}>
      <div
        className={`mb-[16px] text-msd plus:text-max0 text-fontGry-600 plus:ml-[10px] flex pt-[8px] items-center font-bold cursor-pointer`}
      >
        <Link href={urlObj[type]} className={`${styles.hoverBBorder} dark:text-white`}>
          {title}
        </Link>
        <ChevronRightIcon className={`ml-[10px] w-[0.16rem] plus:w-[20px] dark:text-white`} />
      </div>
      <div className={`flex flex-wrap max-plus:hidden`}>
        {resultList.map((item: any, ind: number) => {
          const { coverUrl, episodeTitle, gmtPubDate, showTitle, showNotes, episodeId, duration, episodeUrl = '', episodeStatus } = item
          const cardItem = {
            coverUrl,
            episodeTitle,
            gmtPubDate,
            showTitle,
            showNotes,
            episodeId,
            duration,
            episodeUrl,
            episodeStatus,
          }
          return <Card key={item?.episodeId} {...cardItem} isHome={true} noMb={ind >= resultList.length - 2} />
        })}
      </div>
      <div className={`plus:hidden`}>
        {resultList.map((item: any, ind: number) => {
          return <TagCardItem card={item} key={item.episodeId} isLast={ind === resultList?.length - 1} />
        })}
      </div>
    </div>
  ) : null
}
