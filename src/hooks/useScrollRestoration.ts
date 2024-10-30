// src/hooks/useScrollRestoration.js
'use client' // 确保这是一个客户端组件

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const scrollPositions: any = {}

const useScrollRestoration = (ref: any) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const currentUrl = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`

    // 恢复滚动位置
    const container = ref.current
    if (container) {
      const savedScrollY = scrollPositions[currentUrl] || 0
      container.scrollTo(0, savedScrollY)
    }

    // 监听滚动事件以保存滚动位置
    const handleScroll = () => {
      if (container) {
        scrollPositions[currentUrl] = container.scrollTop
      }
    }

    // 添加滚动事件监听器
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    // 清理函数
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [pathname, searchParams, ref])
}

export default useScrollRestoration
