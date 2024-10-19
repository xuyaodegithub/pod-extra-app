'use client'
import Image from 'next/image'
import { useMyContext } from '@/context/MyContext'

export default function AcmeLogo() {
  const { isDark } = useMyContext()
  return (
    <div className={``}>
      <Image
        src={`/images/${isDark ? 'darkLogo' : 'logo'}.svg`}
        width={200}
        height={36}
        className="hidden md:block"
        alt="pod-extra-front_logo"
      />
    </div>
  )
}
