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

const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  {
    name: 'Popular Podcasts',
    href: '/popularPodcasts',
    icon: SignalIcon,
  },
  { name: 'Latest Podcasts', href: '/latestPodcasts', icon: MicrophoneIcon },
  { name: 'Latest Episodes', href: '/latestEpisodes', icon: NewspaperIcon },
  { name: 'Latest AI-processed', href: '/latestAi-processed', icon: StarIcon },
  { name: 'Categories', href: '/categorise', icon: Squares2X2Icon },
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
            className={`flex px-[14px] h-[48px] items-center rounded-md text-md hover:bg-accent hover:text-accent-foreground`}
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
