// import clsx from 'clsx'
import styles from '@/app/ui/home.module.scss'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { getPodCategory } from '@/app/lib/service'
import Link from 'next/link'

const iconMap = [
  'rgb(132,183,57)',
  'rgb(106,177,72)',
  'rgb(242,166,67)',
  'rgb(216,84,165)',
  'rgb(232,112,63)',
  'rgb(193,89,206)',
  'rgb(66,120,247)',
  'rgb(84,177,188)',
  'rgb(229,100,142)',
  'rgb(77,163,85)',
  'rgb(212,76,66)',
  'rgb(239,141,56)',
  'rgb(84,177,188)',
  'rgb(68,98,246)',
  'rgb(222,94,98)',
  'rgb(77,167,156)',
  'rgb(74,136,247)',
  'rgb(72,73,245)',
  'rgb(119,107,229)',
]
const iconList = [
  '/images/cateIcon/Arts.svg',
  '/images/cateIcon/Business.svg',
  '/images/cateIcon/Comedy.svg',
  '/images/cateIcon/Education.svg',
  '/images/cateIcon/Fiction.svg',
  '/images/cateIcon/Government.svg',
  '/images/cateIcon/HealthFitness.svg',
  '/images/cateIcon/History.svg',
  '/images/cateIcon/KidsFamily.svg',
  '/images/cateIcon/LeisureLeisure.svg',
  '/images/cateIcon/music.svg',
  '/images/cateIcon/News.svg',
  '/images/cateIcon/ReligionSpirituality.svg',
  '/images/cateIcon/Science.svg',
  '/images/cateIcon/SocietyCulture.svg',
  '/images/cateIcon/Sports.svg',
  '/images/cateIcon/film-fill.svg',
  '/images/cateIcon/Technology.svg',
  '/images/cateIcon/TrueCrime.svg',
]
export default async function Categories({ title }: { title: string }) {
  const payload = {
    pageNum: 1,
    pageSize: 20,
    parentAliasCategoryId: '',
  }
  const {
    data: { resultList },
  } = await getPodCategory(payload)
  return (
    <div className={`bg-gray-1000 rounded-10px py-[25px] px-[25px] pt-[19px] mb-[100px] dark:bg-bgDark`}>
      <div className={`mb-[22px] text-max text-fontGry-600 flex items-center font-bold cursor-pointer`}>
        <Link href={`/podcasts-categories`} className={`${styles.hoverBBorder} dark:text-white`}>
          {title}
        </Link>
        <ChevronRightIcon className={`ml-[10px] w-[20px] dark:text-white`} />
      </div>
      <div className={`flex flex-wrap`}>
        {resultList?.map((item: any, index: number) => (
          <Cate key={item.categoryId} {...item} ind={index} noMd={index >= resultList.length - 4} noMr={(index + 1) % 5 === 0} />
        ))}
      </div>
    </div>
  )
}

export function Cate({
  categoryName,
  ind,
  categoryId,
  noMd,
  noMr,
}: {
  categoryName: string
  ind: number
  categoryId: string
  noMd: boolean
  noMr: boolean
}) {
  const color = iconMap[ind]
  const url = iconList[ind]
  return (
    <Link href={`/podcasts-categories/${encodeURIComponent(categoryName)}-podcasts?categoryId=${categoryId}`}>
      <div
        className={`hover:opacity-80 relative transition-all rounded-5px ${noMd ? '' : 'mb-24px'} cursor-pointer ${noMr ? '' : 'mr-24px'} w-[170px] h-[100px] leading-[100px] text-white`}
        style={{ backgroundColor: color }}
      >
        <span className={`absolute top-[10px] left-[10px] text-sm`}>{categoryName}</span>
        <img src={url} alt="" className={`absolute top-[50%] right-[10px] translate-y-[-50%]`} />
      </div>
    </Link>
  )
}
