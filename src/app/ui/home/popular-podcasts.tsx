// import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'
import { getPodShow } from '@/app/lib/service'
import { POPULARITY, PUB_DATE, getCurrentLocalTime } from '@/app/lib/utils'
import Link from 'next/link'
import Image from '@/app/ui/Image'
import { cookies } from 'next/headers'
import { getCookieStore } from '@/app/lib/utils'

export default async function PopularPodcasts({ title, type, params }: { title: string; type: string; params: any }) {
  const isPopularity = POPULARITY === type
  const isMobile = getCookieStore(cookies)
  const payload = {
    sortBy: type,
    ...params,
  }
  const {
    data: {
      pageQueryResponse: { resultList = [], total = 0 },
      requestCategoryList,
    },
  } = await getPodShow(payload)
  const top15 = resultList?.slice(0, 15)
  const last15 = resultList?.slice(resultList.length / 2)
  const urlObj: any = {
    [POPULARITY]: '/popular-top-best-podcasts',
    [PUB_DATE]: '/new-latest-podcasts',
  }
  return (
    <div className={`plus:bg-gray-1000 plus:dark:bg-bgDark rounded-10px py-[11px] px-[15px] mb-24px max-plus:overflow-hidden`}>
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
          const { showId, showTitle, showUrl, coverUrl, itunesAuthor, gmtLastUpdate } = item
          return (
            <Link href={showUrl} key={showId}>
              <Card {...{ showTitle, coverUrl, itunesAuthor, gmtLastUpdate }} isPopularity={isPopularity} noMr={(ind + 1) % 5 === 0} />
            </Link>
          )
        })}
      </div>
      <div className={`plus:hidden overflow-x-auto relative`}>
        <div className={`p-[5px] flex flex-nowrap w-auto`} id={type}>
          {top15.map((item: any, ind: number) => {
            const { showId, showTitle, showUrl, coverUrl, itunesAuthor, gmtLastUpdate } = item
            return (
              <Link href={showUrl} key={showId} className={'shrink-0'}>
                <Card {...{ showTitle, coverUrl, itunesAuthor, gmtLastUpdate }} isPopularity={isPopularity} noMr={(ind + 1) % 5 === 0} />
              </Link>
            )
          })}
        </div>
        <div className={`p-[5px] flex flex-nowrap w-auto`} id={type}>
          {last15.map((item: any, ind: number) => {
            const { showId, showTitle, showUrl, coverUrl, itunesAuthor, gmtLastUpdate } = item
            return (
              <Link href={showUrl} key={showId} className={'shrink-0'}>
                <Card {...{ showTitle, coverUrl, itunesAuthor, gmtLastUpdate }} isPopularity={isPopularity} noMr={(ind + 1) % 5 === 0} />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function Card({
  coverUrl,
  showTitle,
  itunesAuthor,
  gmtLastUpdate,
  isPopularity,
  noMr = false,
}: {
  coverUrl: string
  showTitle: string
  gmtLastUpdate: any
  isPopularity: boolean
  itunesAuthor: string
  noMr: boolean
}) {
  return (
    <div
      className={`rounded-10px w-[1rem] plus:w-[190px] box-border plus:p-[10px] ${noMr ? '' : 'mr-[5px]'} overflow-hidden cursor-pointer hover:bg-homehbg dark:hover:bg-darkHomeBg transition-all`}
    >
      <Image
        src={coverUrl}
        title={showTitle}
        alt={showTitle}
        className={`mb-[8px] rounded-10px w-[1rem] plus:w-[170px] h-[1rem] plus:h-[170px] object-cover`}
      />
      {!isPopularity && (
        <div className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis text-fontGry-100`}>
          Update {getCurrentLocalTime(gmtLastUpdate)}
        </div>
      )}
      <div className={`text-min plus:text-sm whitespace-nowrap overflow-hidden text-ellipsis text-fontGry-100`} title={itunesAuthor}>
        {itunesAuthor}
      </div>
      <div
        className={`text-rsm plus:text-md overflow-hidden text-ellipsis line-clamp-2 text-fontGry-600 dark:text-white break-all`}
        title={showTitle}
      >
        {showTitle || '-'}
      </div>
    </div>
  )
}
