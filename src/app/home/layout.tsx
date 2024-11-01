'use client'
import Breadcrumb from '@/app/ui/breadcrumb'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { links } from '@/app/ui/home/nav-links'
import { useRef } from 'react'
import useScrollRestoration from '@/hooks/useScrollRestoration'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
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
