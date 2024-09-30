// import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'
import { getPodShow } from '@/app/lib/service'
import { POPULARITY, getCurrentLocalTime } from '@/app/lib/utils'

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

export default async function PopularPodcasts({ title, type }: { title: string; type: string }) {
  const isPopularity = POPULARITY === type
  const payload = {
    sortBy: type,
    pageNum: 1,
    pageSize: 10,
    levelCategoryId: '',
  }
  const {
    data: { resultList },
  } = await getPodShow(payload)
  return (
    <div className={`bg-gray-1000 rounded-10px py-[18px] px-[25px] mb-24px`}>
      <div className={`mb-[16px] text-max text-fontGry-600 flex items-center font-bold cursor-pointer`}>
        <span className={`${styles.hoverBBorder}`}>{title}</span>
        <ChevronRightIcon className={`ml-[10px] w-[20px]`} />
      </div>
      <div className={`flex flex-wrap`}>
        {resultList.map((item: any) => (
          <Card key={item.showId} {...item} isPopularity={isPopularity} />
        ))}
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
}: {
  coverUrl: string
  showTitle: string
  gmtLastUpdate: any
  isPopularity: boolean
  itunesAuthor: string
}) {
  return (
    <div className="rounded-10px w-[170px] mr-[25px] mb-[18px] overflow-hidden cursor-pointer hover:shadow-md hover:translate-y-[-10px] transition-all">
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
      <div className={`text-md overflow-hidden text-ellipsis line-clamp-2 text-fontGry-600`} title={showTitle}>
        {showTitle || '-'}
      </div>
    </div>
  )
}
