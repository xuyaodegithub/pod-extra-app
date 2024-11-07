import { POPULARITY, PUB_DATE, SUMMARIZE_TIME, TRANSCRIPT_TIME, getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = getMetaData({
  title: 'PodExtra.AI - Best Podcast Tool With AI Podcast Transcript and Summary',
  description:
    'PodExtra is your ultimate podcast tool , using AI to transcribe, summarize, and create mind maps for your favorite podcasts, making it easy for you to quickly access structured knowledge and save time.',
  keywords: 'AI transcribe,summarize,AI-processed,mind maps,latest podcasts,Latest Episodes,Popular Podcasts',
})
export default async function Home() {
  const resultList = [
    { name: 'ZJNav', href: 'https://www.zjnav.com/', title: 'ZJNav' },
    { name: 'ToolPilot AI', href: 'https://www.toolpilot.ai/', title: 'ToolPilot AI' },
    {
      name: 'https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png',
      href: 'https://dang.ai/',
      title: '',
      isImg: true,
    },
    { name: 'Bai.tools', href: 'https://bai.tools/', title: 'Best AI Tools Directory' },
    { name: 'ToolsFine', href: 'https://toolsfine.com/', title: 'ToolsFine' },
    { name: 'Directory Website Promote', href: 'https://www.promotebusinessdirectory.com/', title: 'Directory Website Promote' },
    { name: 'All in AI Tools', href: 'https://allinai.tools', title: 'The Best AI Tools' },
  ]
  return (
    <main className={`flex flex-col`}>
      <div className={`border border-gray-1000 rounded-10px p-[25px] flex-1 mt-[3px]`}>
        {resultList.map(({ name, title, href, isImg = false }: any) => {
          return (
            <div className={`mb-[25px]`} key={href}>
              <h3 className={`inline-block cursor-pointer text-max1 mb-[4px] relative group`}>
                <Link href={href} target="_blank" title={title || ''}>
                  {isImg ? <img src={name} alt="" className={`w-[150px] h-[54px]`} /> : <span>{name}</span>}
                </Link>
              </h3>
            </div>
          )
        })}
      </div>
    </main>
  )
}
