'use client'
import { useMyContext } from '@/context/MyContext'
import Image from '@/app/ui/Image'

export default function Icon({ path }: { path: string }) {
  const { isDark } = useMyContext()
  return <Image src={`/images/${path}${isDark ? '-dark' : ''}.svg`} alt="" className={`mr-[4px]`} />
}
