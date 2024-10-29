import Link from 'next/link'
import NavLinks from '@/app/ui/home/nav-links'
import AcmeLogo from '@/app/ui/acme-logo'
import { PowerIcon } from '@heroicons/react/24/outline'

export default function SideNav() {
  return (
    <div className="flex h-full flex-col w-[260px]">
      <Link className="mb-[32px]" href="/">
        <AcmeLogo />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        {/*<form>*/}
        {/*  <button className="w-100 px-[14px] flex h-[48px] items-center rounded-md text-md hover:bg-accent hover:text-accent-foreground">*/}
        {/*    <PowerIcon className="w-[20px] mr-[10px]" />*/}
        {/*    <div className="hidden md:block">Sign Out</div>*/}
        {/*  </button>*/}
        {/*</form>*/}
      </div>
    </div>
  )
}
