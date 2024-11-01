import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
const scrollPositions: any = {}
const SaveScroll = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const currentUrl = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`
    const savedScrollY = scrollPositions[currentUrl] || 0

    if (ref.current) {
      ref.current.scrollTo(0, savedScrollY + 109)
    }

    const handleScroll = () => {
      if (ref.current) {
        scrollPositions[currentUrl] = ref.current.scrollTop
      }
    }

    const container = ref.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [pathname, searchParams])

  return (
    <div ref={ref} className={`h-[100%] flex flex-col overflow-auto relative pb-[100px]`}>
      {children}
    </div>
  )
}

export default SaveScroll
