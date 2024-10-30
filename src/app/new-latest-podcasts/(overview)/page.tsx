import Pagination from '@/app/ui/pagination'
import { getPodShow } from '@/app/lib/service'
import { getNoTagText, PUB_DATE, getCurrentLocalTime, getMetaData } from '@/app/lib/utils'
import Link from 'next/link'
import CateItem from '@/app/ui/categories/cateItem'

import { Metadata } from 'next'
const y = new Date().getFullYear()
export const metadata: Metadata = getMetaData({
  title: `The Latest Podcasts episodes of ${y - 1}-${y} ｜PodExtra.AI`,
  description:
    'PodExtra keeps you up-to-date with the latest podcasts from across the web in real-time, offering comprehensive tools like transcripts, mind maps, summaries, keywords, highlights, and shownotes to enrich your listening experience.',
  keywords: '',
})
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    pageSize?: string
    page?: string
  }
}) {
  const pageSize = searchParams?.pageSize || 50
  const pageNum = searchParams?.page || 1
  const {
    data: { resultList, total },
  } = await getPodShow({ pageSize, pageNum, sortBy: PUB_DATE })
  const totalPages = Math.ceil(+total / +pageSize)
  return (
    <main className={`flex flex-col relative`}>
      <div className={`sticky top-0 bg-white dark:bg-black pb-[22px]`}>
        <Pagination totalPages={totalPages} total={total} title="podcasts" />
      </div>
      <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[15px]  pb-[80px] dark:border-fontGry-600`}>
        {resultList.map(({ coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate }: any) => {
          const [title, des] = [getNoTagText(showTitle) || '-', getNoTagText(showDescription) || '-']
          return (
            <Link href={`/podcast/${encodeURIComponent(showTitle)}-podcast-${showId}`} key={showId} className={`w-[50%]`}>
              <div
                className={`flex cursor-pointer overflow-hidden  hover:bg-hbg dark:hover:bg-darkHomeBg transition-all p-[10px] rounded-10px`}
              >
                <img src={coverUrl} alt="" className={`w-[110px] h-[110px] object-cover rounded-10px`} />
                <div className={`flex-1 ml-[10px] overflow-hidden`}>
                  <div className={`flex mb-[6px]`}>{categoryList?.map((item: any) => <CateItem {...item} key={item.categoryId} />)}</div>
                  <div className={`overflow-hidden text-ellipsis whitespace-nowrap text-fontGry-600 text-md dark:text-white`} title={title}>
                    {title}
                  </div>
                  <div className={`text-sm text-fontGry-100 flex items-center`} title={des}>
                    <span className={`max-w-[50%] overflow-hidden text-ellipsis whitespace-nowrap`} title={itunesAuthor}>
                      {itunesAuthor}
                    </span>
                    <span>（{`Update ${getCurrentLocalTime(gmtLastUpdate)}`}）</span>
                    {/*{itunesAuthor}（{`Update ${getCurrentLocalTime(gmtLastUpdate)}`}）*/}
                  </div>
                  <div className={`text-sm overflow-hidden text-ellipsis line-clamp-2 text-fontGry-100`} title={des}>
                    {des}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
