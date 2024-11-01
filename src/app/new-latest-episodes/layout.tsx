'use client'
import Breadcrumb from '@/app/ui/breadcrumb'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { links } from '@/app/ui/home/nav-links'
import { useRef } from 'react'
import useScrollRestoration from '@/hooks/useScrollRestoration'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = links.find((link) => link.href === pathname)?.name || '-'
  const scrollRef = useRef(null)
  useScrollRestoration(scrollRef)
  return (
    <main className={`h-[100%] flex flex-col overflow-auto relative pb-[100px]`} ref={scrollRef}>
      <Breadcrumb title={title} />
      <section className={``}>{children}</section>
    </main>
  )
}
