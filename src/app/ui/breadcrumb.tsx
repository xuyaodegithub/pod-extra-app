// import Image from 'next/image'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'

export default function Breadcrumb({ title }: { title: string }) {
  return (
    <div className={`flex items-center text-[#646464]`}>
      <ArrowLeftCircleIcon className={`w-[30px] h-[30px] mr-[12px]`} />
      <span className={`text-max2`}>{title}</span>
    </div>
  )
}
