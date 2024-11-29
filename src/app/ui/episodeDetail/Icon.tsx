'use client'
import { useMyContext } from '@/context/MyContext'

export default function Icon({ path }: { path: string }) {
  const { isDark } = useMyContext()
  return <img src={`/images/${path}${isDark ? '-dark' : ''}.svg`} alt="" className={`mr-[2px]`} />
}
