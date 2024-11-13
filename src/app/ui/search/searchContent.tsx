'use client'
import { useMyContext } from '@/context/MyContext'
import { searchTabs } from '@/app/lib/config'
import { useState } from 'react'
import { clsx } from 'clsx'
import SearchTabs from './search-tabs'
import SearchPodcasts from '@/app/ui/search/search-podcasts'
import SearchEpisodes from '@/app/ui/search/search-episodes'

export default function SearchContent({ data, className }: { data: any; className?: string }) {
  const [activeTab, setActiveTab] = useState(searchTabs[0].key)
  const { isDark } = useMyContext()
  const { podcasts, episodes } = data
  return (
    <div>
      <SearchTabs className={``} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab !== searchTabs[2].key && <SearchPodcasts podcasts={podcasts} activeTab={activeTab} setActiveTab={setActiveTab} />}
      {activeTab !== searchTabs[1].key && <SearchEpisodes episodes={episodes} activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  )
}
