import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'
// import { formatDateToLocal } from '@/app/lib/utils'
import { Card } from '@/app/ui/home/episodes-card'
const cardItem: any = {
  imgUrl: '/woman-9009013_1280.png',
  title: 'A beautiful and respected teacher',
  des: 'A beautiful and respected teacher,A beautiful and respected teacher,A beautiful and respected teacher,A beautiful and respected teacher,A beautiful and respected teacher,A beautiful and respected teacher, she comes from the beautiful city of Hangzhou, China, and her name is Little Cute,',
}
const list: any[] = Array.from({ length: 10 }, (_: any, ind: number) =>
  ind % 2 === 0
    ? cardItem
    : { ...cardItem, title: 'A beautiful and respected teacherA beautiful and respected teacherA beautiful and respected teacher' }
)

export default async function LatestEpisodes({ title }: { title: string }) {
  return (
    <div className={`bg-bgGray rounded-10px py-[21px] px-[25px] mb-24px`}>
      <div className={`mb-[16px] text-max text-fontGry-600 flex items-center font-bold cursor-pointer`}>
        <span className={`${styles.hoverBBorder}`}>{title}</span>
        <ChevronRightIcon className={`ml-[10px] w-[20px]`} />
      </div>
      <div className={`flex flex-wrap`}>
        {list.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
