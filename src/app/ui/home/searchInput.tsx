'use client'
import { Input } from '@/components/ui/input'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce' //useThrottledCallback
export default function SearchInput({ ...props }: {}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace, back } = useRouter()
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
    console.log(term, params.toString(), back)
  }, 300)
  return (
    <Input
      className={`w-[280px] h-[40px]`}
      value={searchParams.get('query')?.toString()}
      {...props}
      placeholder="Search"
      onChange={(e) => {
        handleSearch(e.target.value)
      }}
    />
  )
}
