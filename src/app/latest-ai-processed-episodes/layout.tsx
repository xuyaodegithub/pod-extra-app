'use client'
import Breadcrumb from '@/app/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import { links } from '@/app/ui/home/nav-links'
import { Suspense, useRef } from 'react'
import SaveScroll from '@/app/ui/save-scroll'
import { LoadingLine } from '@/app/ui/skeletons'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = links.find((link) => link.href === pathname)?.name || '-'
  return (
    <Suspense fallback={<LoadingLine num={12} />}>
      <SaveScroll>
        <main>
          <Breadcrumb title={title} />
          <section className={``}>{children}</section>
        </main>
      </SaveScroll>
    </Suspense>
  )
}
