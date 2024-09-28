import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
// import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import styles from '@/app/ui/home.module.scss'

// {
//   title,
//     list,
//     type,
// }: {
//   title: string
//   list: any[]
//   type: 'invoices' | 'customers' | 'pending' | 'collected'
// }
const cardItem: any = {
  imgUrl: '/woman-9009013_1280.png',
  title: 'A beautiful and respected teacher',
  des: 'A beautiful and respected teacher, she comes from the beautiful city of Hangzhou, China, and her name is Little Cute,',
}
const list: any[] = Array.from({ length: 10 }, () => cardItem)

export default async function PopularPodcasts({ title }: { title: string }) {
  return (
    <div className={`bg-bgGray rounded-10px py-[18px] px-[25px] mb-24px`}>
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

export function Card({ imgUrl, title, des }: { imgUrl: string; title: string; des: string }) {
  return (
    <div className="rounded-10px w-[170px] mr-[25px] mb-[18px] overflow-hidden cursor-pointer">
      <Image src={imgUrl} title={title} alt={title} className={`mb-[8px] rounded-10px`} width={170} height={170} />
      <div className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis text-fontGry-100`} title={title}>
        {title}
      </div>
      <div className={`text-md overflow-hidden text-ellipsis line-clamp-2 text-fontGry-600`} title={des}>
        {des}
      </div>
    </div>
  )
}
