import { Highlights } from '@/app/ui/episodeDetail/highlights'
import { Keywords } from '@/app/ui/episodeDetail/keywords'
import { Mindmap } from '@/app/ui/episodeDetail/mindmap'
import { Outlines } from '@/app/ui/episodeDetail/outlines'
import { OverView } from '@/app/ui/episodeDetail/overView'
import { Shownotes } from '@/app/ui/episodeDetail/shownotes'
import { Transcript } from '@/app/ui/episodeDetail/transcript'
export const tabList = [
  { title: 'Overview', key: 'OVERVIEW', top: 0, com: OverView },
  { title: 'Outlines', key: 'OUTLINES', top: 0, com: Outlines },
  { title: 'Mindmap', key: 'MINDMAP', top: 0, com: Mindmap },
  { title: 'Transcript', key: 'TRANSCRIPT', top: 0, com: Transcript },
  { title: 'Keywords', key: 'KEYWORDS', top: 0, com: Keywords },
  { title: 'Highlights', key: 'HIGHLIGHTS', top: 0, com: Highlights },
  { title: 'Shownotes', key: 'SHOWNOTES', top: 0, com: Shownotes },
]
export const speakerList = [
  { bg: '#FFE1D3', color: '#FF5A0F', head: '/images/speakBox/Lavender1.svg' },
  { bg: '#C0E1FF', color: '#00527C', head: '/images/speakBox/Lavender2.svg' },
  { bg: '#FBCFFB', color: '#791A79', head: '/images/speakBox/Lavender3.svg' },
  { bg: '#38FAA3', color: '#0C5132', head: '/images/speakBox/Lavender4.svg' },
  { bg: '#92EDDE', color: '#095346', head: '/images/speakBox/Lavender5.svg' },
  { bg: '#FED1DD', color: '#8D0448', head: '/images/speakBox/Lavender6.svg' },
  { bg: '#FFFC58', color: '#7D7A00', head: '/images/speakBox/Lavender7.svg' },
  { bg: '#D3FED1', color: '#046200', head: '/images/speakBox/Lavender8.svg' },
  { bg: '#FFC0C1', color: '#BC0005', head: '/images/speakBox/Lavender9.svg' },
]
export function generateUuidV4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
export const audio_info = 'AUDIO_INFO'
//google那边的accessToken
export const googleAccessToken = 'GOOGLEACCESSTOKEN'
//google那边的idToken
export const googleIdToken = 'GOOGLEIDTOKEN'
//我们自己这边的token
export const BearerToken = 'BEARERTOKEN'
//过期时间
export const expiresIn = 'EXPIRES_IN'
//refresh
export const refreshToken = 'REFRESHTOKEN'
//loginTime
export const loginTime = 'LOGINTIME'
export const searchTabs = [
  { label: 'ALL', key: 'ALL' },
  { label: 'Podcasts', key: 'PODCAST' },
  { label: 'Episodes', key: 'EPISODE' },
]
export const cookiesOption = (data?: any) => {
  return {
    ...data,
    // httpOnly: true,
    secure: true,
    sameSite: 'strict',
  }
}
export const summarized = 'SUMMARIZED'
export const callbackPath = 'CALLBACKPATH'
export const monthly = 'MONTHLY'
export const yearly = 'YEARLY'
export const free = 'FREE'
export const standard = 'STANDARD'
export const pro = 'PRO'
export const planTab = [
  {
    label: monthly,
    val: monthly,
  },
  {
    label: yearly,
    val: yearly,
  },
]
