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
  { bg: '#FFE1D3', color: '#FF5A0F' },
  { bg: '#C0E1FF', color: '#00527C' },
  { bg: '#FBCFFB', color: '#791A79' },
  { bg: '#38FAA3', color: '#0C5132' },
  { bg: '#92EDDE', color: '#095346' },
  { bg: '#FED1DD', color: '#8D0448' },
  { bg: '#FFFC58', color: '#7D7A00' },
  { bg: '#D3FED1', color: '#046200' },
  { bg: '#FFC0C1', color: '#BC0005' },
]
