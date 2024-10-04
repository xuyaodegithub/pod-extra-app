'use client'
// import Image from 'next/image'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function Breadcrumb({ title }: { title: string }) {
  const { back } = useRouter()
  return (
    <div className={`flex items-center text-[#646464] mb-[17px]`}>
      <ArrowLeftCircleIcon className={`w-[30px] h-[30px] mr-[12px] cursor-pointer`} onClick={back} />
      <span className={`text-max2`}>{title}</span>
    </div>
  )
}
