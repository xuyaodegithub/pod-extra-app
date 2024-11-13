'use client'
import { Suspense, useRef } from 'react'
import { LoadingLine } from '@/app/ui/skeletons'
import SaveScroll from '@/app/ui/save-scroll'
import Breadcrumb from '@/app/ui/breadcrumb'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingLine num={12} />}>
      <SaveScroll>
        <main>
          {/*<Breadcrumb title="More Friends" />*/}
          <section>{children}</section>
        </main>
      </SaveScroll>
    </Suspense>
  )
}
