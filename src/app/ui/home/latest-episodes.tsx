import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'
import { getPodEpisode } from '@/app/lib/service'
// import { formatDateToLocal } from '@/app/lib/utils'
import { Card } from '@/app/ui/home/episodes-card'
export default async function LatestEpisodes({ title, type }: { title: string; type: string }) {
  const payload = {
    sortBy: type,
    pageNum: 1,
    pageSize: 10,
    levelCategoryId: '',
  }
  const {
    data: { resultList },
  } = await getPodEpisode(payload)
  return (
    <div className={`bg-bgGray rounded-10px py-[21px] px-[25px] mb-24px`}>
      <div className={`mb-[16px] text-max text-fontGry-600 flex items-center font-bold cursor-pointer`}>
        <span className={`${styles.hoverBBorder}`}>{title}</span>
        <ChevronRightIcon className={`ml-[10px] w-[20px]`} />
      </div>
      <div className={`flex flex-wrap`}>
        {resultList.map((item: any) => (
          <Card key={item?.episodeId} {...item} />
        ))}
      </div>
    </div>
  )
}
