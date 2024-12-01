// import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'
import { getPodShow } from '@/app/lib/service'
import { POPULARITY, PUB_DATE, getCurrentLocalTime } from '@/app/lib/utils'
import Link from 'next/link'

// {
//   title,
//     list,
//     type,
// }: {
//   title: string
//   list: any[]
//   type: 'invoices' | 'customers' | 'pending' | 'collected'
// }
// const cardItem: any = {
//   imgUrl: '/woman-9009013_1280.png',
//   title: 'A beautiful and respected teacher',
//   des: 'A beautiful and respected teacher, she comes from the beautiful city of Hangzhou, China, and her name is Little Cute,',
// }
// const list: any[] = Array.from({ length: 10 }, () => cardItem)
// export async function getServerSideProps(){}

export default async function PopularPodcasts({ title, type, params }: { title: string; type: string; params: any }) {
  const isPopularity = POPULARITY === type
  const payload = {
    sortBy: type,
    ...params,
  }
  const {
    data: { resultList },
  } = await getPodShow(payload)
  const urlObj: any = {
    [POPULARITY]: '/popular-top-best-podcasts',
    [PUB_DATE]: '/new-latest-podcasts',
  }
  return (
    <div className={`bg-gray-1000 dark:bg-bgDark rounded-10px py-[11px] px-[15px] mb-24px`}>
      <div className={`mb-[16px] text-max0 text-fontGry-600 ml-[10px] flex pt-[8px] items-center font-bold cursor-pointer`}>
        <Link href={urlObj[type]} className={`${styles.hoverBBorder} dark:text-white`}>
          {title}
        </Link>
        <ChevronRightIcon className={`ml-[10px] w-[20px] dark:text-white`} />
      </div>
      <div className={`flex flex-wrap`}>
        {resultList.map((item: any, ind: number) => {
          const { showId, showTitle, showUrl, coverUrl, itunesAuthor, gmtLastUpdate } = item
          return (
            <Link href={showUrl} key={showId}>
              <Card {...{ showTitle, coverUrl, itunesAuthor, gmtLastUpdate }} isPopularity={isPopularity} noMr={(ind + 1) % 5 === 0} />
            </Link>
          )
        })}
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
      className={`rounded-10px w-[190px] box-border p-[10px] ${noMr ? '' : 'mr-[5px]'} overflow-hidden cursor-pointer hover:bg-homehbg dark:hover:bg-darkHomeBg transition-all`}
    >
      <img
        src={coverUrl}
        title={showTitle}
        alt={showTitle}
        className={`mb-[8px] rounded-10px w-[170px] h-[170px] object-cover`}
        width={170}
        height={170}
      />
      {!isPopularity && (
        <div className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis text-fontGry-100`}>
          Update {getCurrentLocalTime(gmtLastUpdate)}
        </div>
      )}
      <div className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis text-fontGry-100`} title={itunesAuthor}>
        {itunesAuthor}
      </div>
      <div className={`text-md overflow-hidden text-ellipsis line-clamp-2 text-fontGry-600 dark:text-white`} title={showTitle}>
        {showTitle || '-'}
      </div>
    </div>
  )
}
