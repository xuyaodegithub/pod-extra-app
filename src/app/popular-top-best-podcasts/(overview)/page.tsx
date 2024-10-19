import Pagination from '@/app/ui/pagination'
import { getPodShow } from '@/app/lib/service'
import { getCurrentLocalTime, getNoTagText, POPULARITY, getMetaData } from '@/app/lib/utils'
import CateItem from '@/app/ui/categories/cateItem'
import { Metadata } from 'next'
const y = new Date().getFullYear()
import Link from 'next/link'
export const metadata: Metadata = getMetaData({
  title: `The Best Popular Podcasts episodes of ${y - 1}-${y} ｜PodExtra.AI`,
  description: `Gather the best popular podcasts from across the web in ${y - 1}-${y}, presenting your favorite podcasts with AI-powered transcripts and summaries to enhance your listening experience.`,
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
  console.time()
  const {
    data: { resultList, total },
  } = await getPodShow({ pageSize, pageNum, sortBy: POPULARITY })
  const totalPages = Math.ceil(+total / +pageSize)
  console.timeEnd()
  return (
    <main className={`flex flex-col overflow-hidden h-[100%]`}>
      <Pagination totalPages={totalPages} total={total} />
      <div
        className={`flex flex-wrap border border-gray-1000 rounded-10px p-[15px] mt-[22px] overflow-auto pb-[100px] dark:border-fontGry-600`}
      >
        {resultList.map(({ coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate }: any) => {
          const [title, des] = [getNoTagText(showTitle) || '-', getNoTagText(showDescription) || '-']
          return (
            <Link href={`/podcast/${encodeURIComponent(showTitle)}-podcast-${showId}`} key={showId} className={`w-[50%]`}>
              <div
                className={`flex cursor-pointer p-[10px] rounded-10px overflow-hidden hover:bg-hbg dark:hover:bg-darkHomeBg transition-all`}
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
