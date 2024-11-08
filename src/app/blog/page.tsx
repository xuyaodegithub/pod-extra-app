import { getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = getMetaData({
  title: 'PodExtra.AI - Best Podcast Tool With AI Podcast Transcript and Summary',
  description:
    'PodExtra is your ultimate podcast tool , using AI to transcribe, summarize, and create mind maps for your favorite podcasts, making it easy for you to quickly access structured knowledge and save time.',
  keywords: 'AI transcribe,summarize,AI-processed,mind maps,latest podcasts,Latest Episodes,Popular Podcasts',
})
export default async function Home() {
  // redirect('/home')
  return null
}
