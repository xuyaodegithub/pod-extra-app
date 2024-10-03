import {
  HomeIcon,
  SignalIcon,
  MicrophoneIcon,
  NewspaperIcon,
  StarIcon,
  Squares2X2Icon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export const links = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  {
    name: 'Popular Podcasts',
    href: '/popular-top-best-podcasts',
    icon: SignalIcon,
  },
  { name: 'Latest Podcasts', href: '/new-latest-podcasts', icon: MicrophoneIcon },
  { name: 'Latest Episodes', href: '/new-latest-episodes', icon: NewspaperIcon },
  { name: 'Latest AI-processed', href: '/latest-ai-processed-episodes', icon: StarIcon },
  { name: 'Categories', href: '/podcasts-categories', icon: Squares2X2Icon },
]

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex px-[14px] h-[48px] items-center transition duration-200 rounded-md text-md hover:bg-accent hover:text-accent-foreground`}
          >
            <LinkIcon className="w-[20px] mr-[10px]" />
            <p>{link.name}</p>
            <ChevronRightIcon className={`ml-auto w-[20px]`} />
          </Link>
        )
      })}
    </>
  )
}
