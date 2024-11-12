'use client'
import { useMyContext } from '@/context/MyContext'

export default function SearchResult() {
  const { isDark } = useMyContext()
  return <div className={`ml-24px`}></div>
}
