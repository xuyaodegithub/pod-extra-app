import Link from 'next/link'
import styles from '@/app/ui/home.module.scss'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { POPULARITY, PUB_DATE } from '@/app/lib/utils'
import Image from '@/app/ui/Image'
import { getPodShow } from '@/app/lib/service'
import SwiperMove from './swiperMove'

export default async function PodcastSwiper({ type, params }: { type: string; params: any }) {
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
  const title = POPULARITY === type ? 'Popular Podcasts' : 'Latest Podcasts'
  const urlObj: any = {
    [POPULARITY]: '/popular-top-best-podcasts',
    [PUB_DATE]: '/new-latest-podcasts',
  }
  return (
    <div>
      <div className={` mb-[10px] text-md text-fontGry-600 ml-[90px] flex pt-[8px] items-center font-bold cursor-pointer`}>
        <Link href={`${urlObj[type]}`} className={`${styles.hoverBBorder} dark:text-white`}>
          {title}
        </Link>
        <ChevronRightIcon className={`ml-[10px] w-[20px] dark:text-white`} />
      </div>
      <div className={`flex items-center px-[20px]`}>
        <SwiperMove icon={`left-circle`} className={`cursor-pointer`} scrollId={type} />
        <div className={`overflow-hidden flex-1 mx-[20px] bg-hbg dark:bg-bgDark rounded-[10px]`}>
          <div className={`p-[5px] overflow-auto flex flex-nowrap relative`} id={type}>
            {resultList?.map((item: any, index: number) => (
              <Link
                href={item.showUrl}
                className={`podcastSwiper-item p-[5px] shrink-0 hover:bg-homehbg dark:hover:bg-darkHomeBg rounded-[10px]`}
                key={item?.showId}
              >
                <Image src={item.coverUrl} className={`w-[100px] h-[100px] rounded-[10px] shadow-cardShow`}></Image>
                <div className={`text-min text-fontGry-600 w-[100px] overflow-hidden text-ellipsis line-clamp-2 dark:text-white`}>
                  {item.showTitle}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <SwiperMove icon={`right-circle`} className={`cursor-pointer`} scrollId={type} />
      </div>
    </div>
  )
}
