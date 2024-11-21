'use client'
import { Input } from '@/components/ui/input'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce' //useThrottledCallback
import { useMyContext } from '@/context/MyContext'
import { useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function SearchInput({ ...props }: {}) {
  const refInput = useRef<any>(null)
  const { isDark } = useMyContext()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace, back, push } = useRouter()
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    params.set('pageSize', '50')
    if (term) {
      params.set('word', term)
      console.log(params, 'aaaaaa')
    } else {
      return
      params.delete('word')
    }
    refInput.current.blur()
    const searchString = params.toString()?.replace(/\+/g, '%20')
    push(`/search?${searchString}`)
  }, 100)
  function clearInput(e: any) {
    e.preventDefault()
    refInput.current.value = ''
    refInput.current.focus()
  }
  return (
    <div className={`px-[15px] border-[1px] border-[#D9D9D9] rounded-[20px] w-[360px] flex dark:bg-bgDark dark:border-darkHomeBg relative`}>
      <Input
        ref={refInput}
        className={`w-[280px] h-[40px] border-none flex-1 dark:bg-bgDark`}
        defaultValue={decodeURIComponent(searchParams.get('word') || '')}
        {...props}
        placeholder="Search"
        onKeyPress={(e) => {
          e.key === 'Enter' && handleSearch(e.currentTarget.value)
        }}
      />
      {refInput?.current?.value && (
        <XMarkIcon
          className={`w-[20px] h-[20px] absolute top-[50%] right-[66px] translate-y-[-50%] cursor-pointer`}
          onClick={(e) => clearInput(e)}
        />
      )}
      <div
        className={`border-l-[1px] border-[#D9D9D9] flex items-center justify-center pl-[15px] cursor-pointer  dark:border-darkHomeBg`}
        onClick={(e) => handleSearch(refInput.current.value)}
      >
        <img src={`/icons/${isDark ? 'darkSearch' : 'search'}.svg`} alt="" />
      </div>
    </div>
  )
}
