'use client'
import Breadcrumb from '@/app/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import { links } from '@/app/ui/home/nav-links'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = links.find((link) => link.href === pathname)?.name || '-'
  return (
    <main className={`h-[100%] flex flex-col`}>
      <Breadcrumb title={title} />
      <section className={`flex-1 overflow-hidden`}>{children}</section>
    </main>
  )
}
