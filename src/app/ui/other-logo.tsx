'use client'
import Image from 'next/image'
import { useMyContext } from '@/context/MyContext'

export default function OtherLogo() {
  const { isDark } = useMyContext()
  const list = isDark
    ? ['X-Logo-1.svg', 'Logo-Instagram-1.svg', 'Logo-YouTube-1.svg', 'Facebook-1.svg']
    : ['XLogo.svg', 'LogoInstagram.svg', 'LogoYouTube.svg', 'Facebook.svg']
  return (
    <div className={`flex w-[260px]`}>
      {list.map((item, index) => (
        <Image key={index} src={`/images/speakBox/${item}`} width={24} height={24} alt={item} className={`mr-[20px]`} />
      ))}
    </div>
  )
}
