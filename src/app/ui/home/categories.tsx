// import { fetchCardData } from '@/app/lib/data'
// import clsx from 'clsx'
import styles from '@/app/ui/home.module.scss'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { getPodCategory } from '@/app/lib/service'

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
export default async function Categories({ title }: { title: string }) {
  const payload = {
    pageNum: 1,
    pageSize: 20,
    parentAliasCategoryId: '',
  }
  const {
    data: { resultList },
  } = await getPodCategory(payload)
  console.log('isPopularity', resultList)

  return (
    <div className={`bg-bgGray rounded-10px py-[21px] px-[25px] mb-24px`}>
      <div className={`mb-[16px] text-max text-fontGry-600 flex items-center font-bold cursor-pointer`}>
        <span className={`${styles.hoverBBorder}`}>{title}</span>
        <ChevronRightIcon className={`ml-[10px] w-[20px]`} />
      </div>
      <div className={`flex flex-wrap`}>
        {resultList?.map((item: any, index: number) => <Cate key={item.categoryId} {...item} ind={index} />)}
      </div>
    </div>
  )
}

export function Cate({ categoryName, ind }: { categoryName: string; ind: number }) {
  const color = iconMap[ind]
  return (
    <div
      className={`rounded-5px mb-24px cursor-pointer mr-24px w-[170px] h-[100px] leading-[100px] text-center text-white`}
      style={{ backgroundColor: color }}
    >
      {categoryName}
    </div>
  )
}
