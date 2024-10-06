'use client'
import Breadcrumb from '@/app/ui/breadcrumb'
import { useSearchParams, usePathname, useRouter, useParams } from 'next/navigation'
import { links } from '@/app/ui/home/nav-links'
import { capitalizeFirstLetter } from '@/app/lib/utils'
// import { useMyContext } from '@/context/MyContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // const { data } = useMyContext()
  const params: any = useParams()
  const { categoryName = '', cateName = '' } = params
  const realCategoryName = decodeURIComponent(categoryName)
    .split('-')
    .map((i: string) => capitalizeFirstLetter(i))
    .join(' ')
  const realCateName = decodeURIComponent(cateName)
    .split('-')
    .map((i: string) => capitalizeFirstLetter(i))
    .join(' ')
  const realName = `${realCategoryName} ${realCateName ? '/ ' + realCateName : ''}`
  const title = links.find((link) => link.href === pathname)?.name || realName || '-'
  console.log(params, 'params')
  return (
    <main className={`h-[100%] flex flex-col`}>
      <Breadcrumb title={title} />
      <section className={`flex-1 overflow-hidden`}>{children}</section>
    </main>
  )
}
