import Link from 'next/link'
import styles from '@/app/ui/home.module.scss'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { POPULARITY, PUB_DATE } from '@/app/lib/utils'
import Image from '@/app/ui/Image'
import { getPodShow } from '@/app/lib/service'
import SwiperMove from './swiperMove'
import { cookies } from 'next/headers'

export default async function PodcastSwiper({ type, params }: { type: string; params: any }) {
  const cookieStore: any = cookies()
  const isMobile = cookieStore.get('x-is-mobile')?.value === 'true'
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
  const fifty = resultList?.slice(0, resultList.length / 2)
  const lastty = resultList?.slice(resultList.length / 2)
  const title = POPULARITY === type ? 'Popular Podcasts' : 'Latest Podcasts'
  const urlObj: any = {
    [POPULARITY]: '/popular-top-best-podcasts',
    [PUB_DATE]: '/new-latest-podcasts',
  }
  return (
    <div>
      <div className={` mb-[10px] text-md text-fontGry-600 ml-[15px] plus:ml-[90px] flex pt-[8px] items-center font-bold cursor-pointer`}>
        <Link href={`${urlObj[type]}`} className={`${styles.hoverBBorder} dark:text-white`}>
          {title}
        </Link>
        <ChevronRightIcon className={`ml-[10px] w-[20px] dark:text-white`} />
      </div>
      <div className={`flex items-center px-[5px] plus:px-[20px]`}>
        <SwiperMove icon={`left-circle`} className={`cursor-pointer max-plus:hidden`} scrollId={type} />
        <div className={`overflow-hidden flex-1 plus:mx-[20px] plus:bg-hbg plus:dark:bg-bgDark rounded-[10px]`}>
          <div className={`p-[5px] overflow-auto flex flex-nowrap relative ${isMobile && 'hidden'}`} id={type}>
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
          <div className={`${isMobile ? 'block' : 'hidden'} overflow-x-auto relative`}>
            <div className={`p-[5px] flex flex-nowrap w-auto`} id={type}>
              {fifty?.map((item: any, index: number) => (
                <Link
                  href={item.showUrl}
                  className={`podcastSwiper-item p-[5px] hover:bg-homehbg dark:hover:bg-darkHomeBg rounded-[10px]`}
                  key={item?.showId}
                >
                  <Image src={item.coverUrl} className={`w-[100px] h-[100px] rounded-[10px] shadow-cardShow`}></Image>
                  <div className={`text-min text-fontGry-600 w-[100px] overflow-hidden text-ellipsis line-clamp-2 dark:text-white`}>
                    {item.showTitle}
                  </div>
                </Link>
              ))}
            </div>
            <div className={`p-[5px] flex flex-nowrap w-auto`} id={type}>
              {lastty?.map((item: any, index: number) => (
                <Link
                  href={item.showUrl}
                  className={`podcastSwiper-item p-[5px] hover:bg-homehbg dark:hover:bg-darkHomeBg rounded-[10px]`}
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
        </div>
        <SwiperMove icon={`right-circle`} className={`cursor-pointer max-plus:hidden`} scrollId={type} />
      </div>
    </div>
  )
}
