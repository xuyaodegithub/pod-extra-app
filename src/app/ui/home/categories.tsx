// import { fetchCardData } from '@/app/lib/data'
import clsx from 'clsx'
import styles from '@/app/ui/home.module.scss'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

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
const list: any[] = Array.from({ length: 19 }, (_: any, ind: number) => ({
  title: 'a cate name',
  type: ind,
}))
export default async function Categories({ title }: { title: string }) {
  return (
    <div className={`bg-bgGray rounded-10px py-[21px] px-[25px] mb-24px`}>
      <div className={`mb-[16px] text-max text-fontGry-600 flex items-center font-bold cursor-pointer`}>
        <span className={`${styles.hoverBBorder}`}>{title}</span>
        <ChevronRightIcon className={`ml-[10px] w-[20px]`} />
      </div>
      <div className={`flex flex-wrap`}>
        {list.map((item, index) => (
          <Cate key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export function Cate({ title, type }: { title: string; value: number | string; type: number }) {
  const color = iconMap[type]
  console.log(color, '----')

  return (
    <div
      className={`rounded-5px mb-24px cursor-pointer mr-24px w-[168px] h-[100px] leading-[100px] text-center text-white`}
      style={{ backgroundColor: color }}
    >
      {title}
    </div>
  )
}
