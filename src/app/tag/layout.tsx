'use client'
import { usePathname } from 'next/navigation'
import Breadcrumb from '@/app/ui/breadcrumb'
import { useParams } from 'next/navigation'
import { Suspense, useRef } from 'react'
import { useMyContext } from '@/context/MyContext'
import { LoadingLine } from '@/app/ui/skeletons'
import SaveScroll from '@/app/ui/save-scroll'
import { splitStringFromLastDash } from '@/app/lib/utils'
export default function Layout({ children }: { children: React.ReactNode }) {
  const { title } = useMyContext()
  //这个代码不能去
  const pathname = usePathname()
  const { tagId }: { tagId: string } = useParams()
  const [tagName, tagIdNum] = splitStringFromLastDash(decodeURIComponent(tagId))
  return (
    <Suspense fallback={<LoadingLine num={12} />}>
      <SaveScroll>
        <main>
          <Breadcrumb title={`# ${tagName}`} tagDes={`Related Episodes`} className={`podcast-detail pb-[20px]`} />
          <section className={``}>{children}</section>
        </main>
      </SaveScroll>
    </Suspense>
  )
}
