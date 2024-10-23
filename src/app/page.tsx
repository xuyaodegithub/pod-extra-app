// import Image from 'next/image'
// import styles from '@/app/ui/home.module.css'
// import clsx from 'clsx'
import { redirect } from 'next/navigation'
import type { Metadata, Viewport } from 'next'
import SearchInput from '@/app/ui/home/searchInput'
import PopularPodcasts from '@/app/ui/home/popular-podcasts'
import { Suspense } from 'react'
import { LoadingLine } from '@/app/ui/skeletons'
import { getMetaData } from '@/app/lib/utils'
import Link from 'next/link'
export const metadata: Metadata = getMetaData()
export default function IndexPage() {
  const tools: any[] = [
    {
      img: '/images/overflow.svg',
      title: 'Overview',
      desc: 'PodExtra generates summaries with AI, enabling you to grasp the key content of any podcast in just minutes.',
    },
    {
      img: '/images/mindmap.svg',
      title: 'Mindmap',
      desc: 'Present podcast content in the form of mind maps to help you easily capture the overall structure and key points of the content.',
    },
    {
      img: '/images/listen.svg',
      title: 'Listen',
      desc: 'Listen to specific podcast content based on the transcription. Support listening by advancing or rewinding sentence by sentence.',
    },
    {
      img: '/images/transcript.svg',
      title: 'Transcript',
      desc: 'Accurate and comprehensive full transcripts of podcasts, supporting the distinction of speakers.',
    },
    {
      img: '/images/highlights.svg',
      title: 'Highlights',
      desc: "AI extracts the highlight quotes from podcast episode so that you won't miss the wonderful moments.",
    },
    {
      img: '/images/takeaways.svg',
      title: 'Takeaways',
      desc: 'Generate takeaways for your podcasts without having to listen to the entire content.\n',
    },
  ]
  // redirect('/home') // 重定向到 /home
  return (
    <main className={`landing`}>
      <div className={`w-1280 mx-auto`}>
        <div className={`flex justify-between pt-[24px] items-center mb-[124px]`}>
          <img src="/images/logo.svg" alt="" />
          <Link href={'/home'} className={`text-md py-[10px] px-[16px] text-play bg-[#FFF0D7] rounded-[5px] font-bold`}>
            Get Started
          </Link>
        </div>
        <div className={`relative mb-[146px]`}>
          <h1
            className={`text-[65px] font-bold space-x-[-3px] text-[#02073E] w-[753px] mb-[30px] leading-[80px]`}
            style={{ fontFamily: 'Tilt Warp' }}
          >
            Unleash the power of podcast with AI
          </h1>
          <div className={`text-[30px] leading-[45px] mb-[30px]`}>
            Transcripts, Summaries, Mind maps,
            <br /> Outlines, Highlights and Takeaways
          </div>
          <Link
            href={'/home'}
            className={`text-[23px] inline-block leading-[40px] p-[10px]  text-white bg-play rounded-[5px] font-bold mb-[50px]`}
          >
            Get Started for free
          </Link>
          <div className={`flex text-md leading-[42px]`}>
            <span className={`mr-[17px]`}>Powered by:</span>
            <img src="/images/openai.svg" className={`mr-[26px] w-[40px] h-[40px]`} alt="" />
            <img src="/images/Podcast.svg" className={`mr-[26px] w-[40px] h-[40px]`} alt="" />
            <img src="/images/spotify.svg" className={`mr-[26px] w-[40px] h-[40px]`} alt="" />
          </div>
          <div className={`absolute right-0 top-0 w-[644px]`}>
            <img src="/images/people.png" alt="" />
          </div>
        </div>
        <div className={`mb-[84px]`}>
          <div className={`text-center text-[60px] font-extrabold leading-[80px] mb-[80px] space-x-[-3px]`}>
            <span className={`text-play`}>An advanced AI tool </span>for
            <br /> podcast listening and knowledge acquisition
          </div>
          <div className={`flex flex-wrap justify-between`}>
            {tools.map((item: any, ind: number) => {
              const { title, desc, img } = item
              return (
                <div
                  className={`w-[420px] bg-[#F6F8FB] ${(ind + 1) % 3 === 0 ? '' : 'mr-[10px]'} mb-[30px] rounded-[8px] py-[22px] px-[26px] text-md leading-[32px]`}
                >
                  <div className={`flex mb-[15px]`}>
                    <img src={img} className={`w-[66px] h-[66px] mr-[22px]`} alt="" />
                    <h2 className={`text-[40px] leading-[1] self-end`}>{title}</h2>
                  </div>
                  <div>{desc}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={`relative flex flex-wrap`}>
          <div className={`w-[50%]`}>
            <h2>Summarize podcasts with AI</h2>
            <div></div>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </main>
  )
}
