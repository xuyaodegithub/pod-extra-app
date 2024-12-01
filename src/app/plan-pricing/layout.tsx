'use client'
import { useParams, usePathname } from 'next/navigation'
import Breadcrumb from '@/app/ui/breadcrumb'
import { Suspense, useRef } from 'react'
import SaveScroll from '@/app/ui/save-scroll'
import { LoadingLine } from '@/app/ui/skeletons'
import { splitStringFromLastDash } from '@/app/lib/utils'
import { planPrice } from '@/app/ui/home/nav-links'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingLine num={12} />}>
      <SaveScroll>
        <main>
          {/*<Breadcrumb title={planPrice.name} />*/}
          <section className={``}>{children}</section>
        </main>
      </SaveScroll>
    </Suspense>
  )
}
