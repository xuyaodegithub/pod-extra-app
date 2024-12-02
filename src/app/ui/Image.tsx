'use client'
import Image from 'next/image'
import { useMyContext } from '@/context/MyContext'

export default function AcmeLogo() {
  const { isDark } = useMyContext()
  return (
    <div className={`ml-24px mt-[6px]`}>
      <Image
        src={`/images/${isDark ? 'darkLogo' : 'logo'}.svg`}
        width={188}
        height={26}
        className="hidden md:block"
        alt="pod-extra-front_logo"
      />
    </div>
  )
}
