'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page({ categoryName, categoryId }: { categoryName: string; categoryId: string }) {
  const { push } = useRouter()
  function goCaategory(e: any) {
    e.preventDefault()
    push(`/podcasts-categories/${encodeURIComponent(categoryName)}-podcasts?categoryId=${categoryId}`)
  }
  return (
    <div
      className={`cursor-pointer text-white mr-[6px] text-min px-[6px] rounded-10px bg-[#c8c8c8] hover:bg-play transition-all dark:bg-bgDark dark:text-fontGry-100`}
      onClick={goCaategory}
    >
      {categoryName}
    </div>
  )
}
