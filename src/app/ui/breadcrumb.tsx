'use client'
// import Image from 'next/image'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function Breadcrumb({ title }: { title: string }) {
  const { back, push } = useRouter()
  function toback() {
    if (history.length <= 2) {
      push('/home')
    } else back()
  }
  return (
    <div className={`flex text-[#646464] pb-[17px] font-bold bg-white dark:text-white dark:bg-[#0a0a0a] sticky top-0 z-[999]`}>
      <ArrowLeftCircleIcon className={`w-[30px] h-[30px] mr-[12px] cursor-pointer mt-[5px] shrink-0`} onClick={toback} />
      <span className={`text-max2`}>{title}</span>
    </div>
  )
}
