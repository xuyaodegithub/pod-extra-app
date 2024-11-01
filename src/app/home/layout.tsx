'use client'
import { usePathname } from 'next/navigation'
import { Suspense, useRef } from 'react'
import { LoadingLine } from '@/app/ui/skeletons'
import SaveScroll from '@/app/ui/save-scroll'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingLine num={12} />}>
      <SaveScroll>
        <main>
          <section>{children}</section>
        </main>
      </SaveScroll>
    </Suspense>
  )
}
