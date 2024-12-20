'use client'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { generatePagination } from '@/app/lib/utils'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
const volumeList: any[] = [50, 100, 150, 200]
export default function Pagination({ totalPages, total, title }: { totalPages: number; total: number; title?: string }) {
  // NOTE: Uncomment this code in Chapter 11
  // const [pageSize, setPageSize] = useState(50)
  const { replace, back, push } = useRouter()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const pageSize = Number(searchParams.get('pageSize')) || 50
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }
  const allPages = generatePagination(currentPage, totalPages)
  const selectChange = (v: any) => {
    const params = new URLSearchParams(searchParams)
    params.set('pageSize', v)
    params.set('page', '1')
    push(`${pathname}?${params.toString()}`)
  }
  const inputBlur = (v: any) => {
    if (v < 1 || v > totalPages) return
    const params = new URLSearchParams(searchParams)
    params.set('page', v)
    push(`${pathname}?${params.toString()}`)
  }
  return (
    <>
      {/*  NOTE: Uncomment this code in Chapter 11 */}

      <div className="flex items-center dark:text-fontGry-dark9b">
        <span className={`mr-[16px] text-sm`}>{`Total ${total || 0} ${title || 'episodes'}`}</span>
        <PaginationArrow direction="left" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />

        <div className="flex ">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined

            if (index === 0) position = 'first'
            if (index === allPages.length - 1) position = 'last'
            if (allPages.length === 1) position = 'single'
            if (page === '...') position = 'middle'

            return (
              <PaginationNumber
                isLast={index === allPages.length - 1}
                key={`${page}-${index}`}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            )
          })}
        </div>

        <PaginationArrow direction="right" href={createPageURL(currentPage + 1)} isDisabled={currentPage >= totalPages} />
        <Select onValueChange={(e: any) => selectChange(e)} defaultValue={`${pageSize}`} disabled>
          <SelectTrigger className="w-auto h-[32px] bg-transparent rounded-[10px] border shadow-none focus:ring-0 focus:ring-offset-0 ml-[16px] cursor-default">
            <span className={` py-[2px] text-min rounded-10px  cursor-default`}>{pageSize || 50} / page</span>
          </SelectTrigger>
          <SelectContent>
            {volumeList.map((item: number) => {
              return (
                <SelectItem value={`${item}`} key={item} className={`data-[state=checked]:bg-play data-[state=checked]:text-white`}>
                  {item}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        {totalPages > 1 && (
          <div className={`flex items-center`}>
            <span className={`mx-[10px] inline-block leading-[30px]`}> Go to </span>
            <Input
              className={`w-[60px] h-[32px] rounded-[10px]`}
              value={searchParams.get('query')?.toString()}
              placeholder=""
              onBlur={(e: any) => inputBlur(e.target?.value || '')}
              onKeyUp={(e: any) => e.key === 'Enter' && inputBlur(e.target?.value || '')}
            />
          </div>
        )}
      </div>
    </>
  )
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
  isLast = false,
}: {
  page: number | string
  href: string
  position?: 'first' | 'last' | 'middle' | 'single'
  isActive: boolean
  isLast: boolean
}) {
  const className = clsx('flex h-10 w-10 items-center justify-center text-sm border w-[32px] h-[32px]', {
    'rounded-[10px]': true,
    'z-10 bg-blue-600 border-active text-active': isActive,
    'hover:bg-gray-1000': !isActive && position !== 'middle',
    'border-none': page === '...',
    'text-gray-300': position === 'middle',
    'mr-0': isLast,
    'mr-[8px]': !isLast,
  })

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  )
}

function PaginationArrow({ href, direction, isDisabled }: { href: string; direction: 'left' | 'right'; isDisabled?: boolean }) {
  const className = clsx('flex h-10 w-10 items-center justify-center border w-[32px] h-[32px] rounded-[10px]', {
    'pointer-events-none text-gray-300': isDisabled,
    'hover:bg-gray-1000': !isDisabled,
    'mr-[8px] ': direction === 'left',
    'ml-[8px] ': direction === 'right',
  })

  const icon = direction === 'left' ? <ChevronLeftIcon className="w-4" /> : <ChevronRightIcon className="w-4" />

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  )
}
