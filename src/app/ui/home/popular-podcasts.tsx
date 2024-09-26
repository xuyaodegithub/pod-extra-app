import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
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
const list: any[] = Array.from({ length: 10 }, (_) => cardItem)

export default async function PopularPodcasts({ title }: { title: string }) {
  return (
    <div className={`bg-bgGray rounded-10px py-[18px] px-[25px] cursor-pointer`}>
      <div className={`mb-[16px] text-max text-[#646464] flex items-center font-bold`}>
        {title}
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
    <div className="rounded-10px w-[170px] mr-[25px] mb-[8px] overflow-hidden">
      <Image src={imgUrl} title={title} alt={title} className={`mb-[8px]`} width={170} height={170} />
      <div className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis text-[#B4B4B4]`}>{title}</div>
      <div className={`text-md overflow-hidden text-ellipsis line-clamp-2 text-[#646464]`}>{des}</div>
    </div>
  )
}
