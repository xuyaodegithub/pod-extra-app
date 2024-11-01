'use client'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import useScrollRestoration from '@/hooks/useScrollRestoration'

export default function Layout({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef(null)
  useScrollRestoration(scrollRef)
  return (
    <main className={`h-[100%] flex flex-col`}>
      <section className={`h-[100%] overflow-auto`} ref={scrollRef}>
        {children}
      </section>
    </main>
  )
}
