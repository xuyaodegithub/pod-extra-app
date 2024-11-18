'use client'
import { useParams, usePathname } from 'next/navigation'
import Breadcrumb from '@/app/ui/breadcrumb'
import { Suspense, useRef } from 'react'
import SaveScroll from '@/app/ui/save-scroll'
import { LoadingLine } from '@/app/ui/skeletons'
import { splitStringFromLastDash } from '@/app/lib/utils'
import { loginAfterLogin } from '@/app/ui/home/nav-links'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = loginAfterLogin.find((link) => link.href === pathname)?.name || '-'

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
