import Pagination from '@/app/ui/pagination'
import { getPodShow } from '@/app/lib/service'
import { getCurrentLocalTime, getNoTagText, POPULARITY, getMetaData } from '@/app/lib/utils'
import CateItem from '@/app/ui/categories/cateItem'
import { Metadata } from 'next'
const y = new Date().getFullYear()
import Link from 'next/link'
import Image from '@/app/ui/Image'
export const metadata: Metadata = getMetaData({
  title: `The Best Popular Podcasts episodes of ${y - 1}-${y} | PodExtra.AI`,
  description: `Gather the best popular podcasts from across the web in ${y - 1}-${y}, presenting your favorite podcasts with AI-powered transcripts and summaries to enhance your listening experience.`,
  keywords: '',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/popular-top-best-podcasts`,
  },
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
    data: {
      pageQueryResponse: { resultList = [], total = 0 },
      requestCategoryList,
    },
  } = await getPodShow({ pageSize, pageNum, sortBy: POPULARITY })
  const totalPages = Math.ceil(+total / +pageSize)
  return (
    <main className={`flex flex-col`}>
      <div className={`sticky top-[57px] bg-white dark:bg-black pb-[22px]`}>
        <Pagination totalPages={totalPages} total={total} title="podcasts" />
      </div>
      <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[15px] dark:border-fontGry-600`}>
        {resultList.map((item: any, ind: number) => {
          const { coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate, showUrl } = item
          const [title, des] = [getNoTagText(showTitle) || '-', getNoTagText(showDescription) || '-']
          const noMb = ind >= resultList.length - 2
          return (
            <Link href={showUrl} key={showId} className={`w-[50%]`}>
              <div
                className={`flex cursor-pointer ${noMb ? '' : 'mb-[5px]'} p-[10px] rounded-10px overflow-hidden hover:bg-hbg dark:hover:bg-darkHomeBg transition-all`}
              >
                <Image src={coverUrl} alt="" className={`w-[110px] h-[110px] object-cover rounded-10px`} />
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
