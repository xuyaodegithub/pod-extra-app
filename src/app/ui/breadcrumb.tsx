'use client'
// import Image from 'next/image'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function Breadcrumb({ title, className, tagDes }: { title: string; className?: string; tagDes?: string }) {
  const { back, push } = useRouter()
  function toback() {
    if (history.length <= 2) {
      push('/home')
    } else back()
  }
  return (
    <div
      className={`episodeDetail flex text-[#646464] pb-[17px] font-bold bg-white dark:text-white dark:bg-[#0a0a0a] sticky top-0 z-[99] ${className}`}
    >
      <ArrowLeftCircleIcon className={`w-[30px] h-[30px] mr-[12px] cursor-pointer mt-[5px] shrink-0`} onClick={toback} />
      {tagDes ? (
        <h1 className={`flex items-center text-max2`}>
          <span className={`h-[30px] leading-[30px] bg-bgGray rounded-[15px] px-[15px] mr-[10px] dark:bg-bgDark `}>{title}</span>
          {tagDes}
        </h1>
      ) : (
        <h1 className={`text-max2`}>{title}</h1>
      )}
    </div>
  )
}
