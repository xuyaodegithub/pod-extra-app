'use client'
import { usePathname } from 'next/navigation'
import { links } from '@/app/ui/home/nav-links'
import Breadcrumb from '@/app/ui/breadcrumb'
import { useRef } from 'react'
import useScrollRestoration from '@/hooks/useScrollRestoration'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = links.find((link) => link.href === pathname)?.name || '-'
  const scrollRef = useRef(null)
  useScrollRestoration(scrollRef)
  return (
    <main className={`h-[100%] flex flex-col`}>
      <Breadcrumb title={title} />
      <section className={`flex-1 overflow-auto`} ref={scrollRef}>
        {children}
      </section>
    </main>
  )
}
