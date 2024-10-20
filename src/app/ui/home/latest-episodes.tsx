// import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'
import { getPodEpisode } from '@/app/lib/service'
// import { formatDateToLocal } from '@/app/lib/utils'
import { Card } from '@/app/ui/home/episodes-card'
import Link from 'next/link'
import { POPULARITY, PUB_DATE, TRANSCRIPT_TIME } from '@/app/lib/utils'
export default async function LatestEpisodes({ title, type }: { title: string; type: string }) {
  const payload = {
    sortBy: type,
    pageNum: 1,
    pageSize: 8,
  }
  const {
    data: { resultList },
  } = await getPodEpisode(payload)
  const urlObj: any = {
    [PUB_DATE]: '/new-latest-episodes',
    [TRANSCRIPT_TIME]: '/latest-ai-processed-episodes',
  }
  return resultList.length ? (
    <div className={`bg-gray-1000 rounded-10px py-[11px] px-[15px] mb-24px dark:bg-bgDark`}>
      <div className={`mb-[16px] text-max text-fontGry-600 flex items-center font-bold cursor-pointer`}>
        <Link href={urlObj[type]} className={`${styles.hoverBBorder} dark:text-white`}>
          {title}
        </Link>
        <ChevronRightIcon className={`ml-[10px] w-[20px] dark:text-white`} />
      </div>
      <div className={`flex flex-wrap`}>
        {resultList.map((item: any) => {
          return <Card key={item?.episodeId} {...item} isHome={true} />
        })}
      </div>
    </div>
  ) : null
}
