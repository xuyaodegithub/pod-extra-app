'use client'
// import Image from 'next/image'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function Breadcrumb({ title }: { title: string }) {
  const { back, push } = useRouter()
  function toback() {
    if (history.length <= 1 || document.referrer === '') {
      push('/home')
    } else back()
  }
  return (
    <div className={`flex text-[#646464] mb-[17px] font-bold dark:text-white`}>
      <ArrowLeftCircleIcon className={`w-[30px] h-[30px] mr-[12px] cursor-pointer mt-[5px]`} onClick={toback} />
      <span className={`text-max2`}>{title}</span>
    </div>
  )
}
