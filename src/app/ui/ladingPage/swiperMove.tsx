'use client'
import { useMyContext } from '@/context/MyContext'

export default function SwiperMove({ icon, className, scrollId }: { icon: string; className?: string; scrollId: string }) {
  const stepNum = 5
  const { isDark } = useMyContext()
  const isLeft = icon === 'left-circle'
  function toScroll(type: boolean) {
    const scrollDom: any = document.getElementById(scrollId)
    const dom: any = scrollDom?.querySelector('.podcastSwiper-item')
    const scrollLeft = scrollDom?.scrollLeft
    const distance = dom?.offsetWidth * stepNum * (!!type ? 1 : -1)
    scrollDom.scrollTo({
      left: scrollLeft + distance, // 目标高度，可以根据需求更改
      behavior: 'smooth', // 平滑滚动
    })
  }

  return (
    <img
      src={`/images/landing/${icon}${isDark ? '-dark' : ''}.svg`}
      alt=""
      className={`cursor-pointer ${className}`}
      onClick={() => toScroll(!isLeft)}
    />
  )
}
