'use client'
import { Input } from '@/components/ui/input'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce' //useThrottledCallback
import { useMyContext } from '@/context/MyContext'
import { useRef } from 'react'

export default function SearchInput({ ...props }: {}) {
  const refInput = useRef<any>(null)
  const { isDark } = useMyContext()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace, back, push } = useRouter()
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    params.set('pageSize', '10')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    push(`/search?${params.toString()}`)
    console.log(term, params.toString(), back)
  }, 100)
  return (
    <div className={`px-[15px] border-[1px] border-[#D9D9D9] rounded-[20px] w-[360px] flex dark:bg-bgDark dark:border-darkHomeBg`}>
      <Input
        ref={refInput}
        className={`w-[280px] h-[40px] border-none flex-1 dark:bg-bgDark`}
        defaultValue={searchParams.get('query')?.toString()}
        {...props}
        placeholder="Search"
        onKeyPress={(e) => {
          e.key === 'Enter' && handleSearch(e.currentTarget.value)
        }}
      />
      <div
        className={`border-l-[1px] border-[#D9D9D9] flex items-center justify-center pl-[15px] cursor-pointer  dark:border-darkHomeBg`}
        onClick={(e) => handleSearch(refInput.current.value)}
      >
        <img src={`/icons/${isDark ? 'darkSearch' : 'search'}.svg`} alt="" />
      </div>
    </div>
  )
}
