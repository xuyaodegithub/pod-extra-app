import Image from 'next/image'
export default function AcmeLogo() {
  return (
    <div className={``}>
      <Image src="/images/logo.svg" width={200} height={36} className="hidden md:block" alt="pod-extra-front_logo" />
    </div>
  )
}
