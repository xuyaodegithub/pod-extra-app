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
      className={`episodeDetail flex text-[#646464] pb-[17px] font-bold bg-white dark:text-white dark:bg-[#0a0a0a] sticky top-0 z-[99] ${className} max-plus:px-[15px] max-plus:pt-[12px]`}
    >
      <ArrowLeftCircleIcon className={`w-[30px] h-[30px] mr-[12px] cursor-pointer mt-[5px] shrink-0 max-plus:hidden`} onClick={toback} />
      <img src="/images/cateIcon/chevron-left.svg" alt="" className={`plus:hidden mr-[5px]`} onClick={toback} />
      {tagDes ? (
        <h1 className={`flex items-center text-msd plus:text-max2 max-plus:justify-center max-plus:flex-1`}>
          <span
            className={`max-plus:max-w-[2rem] max-plus:overflow-hidden max-plus:whitespace-nowrap max-plus:text-ellipsis h-[0.24rem] plus:h-[30px] leading-[0.24rem] plus:leading-[30px] bg-bgGray rounded-[0.12rem] plus:rounded-[15px] px-[0.1rem] plus:px-[15px] mr-[10px] dark:bg-bgDark `}
          >
            {title}
          </span>
          <span>{tagDes}</span>
        </h1>
      ) : (
        <h1 className={`text-msd plus:text-max2 max-plus:text-center max-plus:flex-1`}>{title}</h1>
      )}
    </div>
  )
}
