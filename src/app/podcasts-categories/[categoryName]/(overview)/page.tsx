import Pagination from '@/app/ui/pagination'
import { getEpisodeDetail, getPodShow } from '@/app/lib/service'
import { getNoTagText, PUB_DATE, POPULARITY, getCurrentLocalTime, getMetaData, timeFormat, capitalizeFirstLetter } from '@/app/lib/utils'
import { Metadata, ResolvingMetadata } from 'next'
const y = new Date().getFullYear()
import Link from 'next/link'
import CateItem from '@/app/ui/categories/cateItem'
export async function generateMetadata({ params }: any, parent: ResolvingMetadata): Promise<Metadata> {
  const { categoryName = '' } = params
  const realCategoryName = decodeURIComponent(categoryName)
    .split('-')
    .map((i: string) => capitalizeFirstLetter(i))
    .join(' ')
  return getMetaData({
    title: `The best ${realCategoryName} podcasts of ${y - 1}-${y} ｜PodExtra.AI`,
    description: `Discover the best ${realCategoryName} podcasts with PodExtra. With AI-powered transcription and summarization, it elevates your listening experience.`,
  })
}
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    pageSize?: string
    page?: string
    categoryId?: string
  }
}) {
  const pageSize = searchParams?.pageSize || 50
  const pageNum = searchParams?.page || 1
  const categoryId = searchParams?.categoryId || ''
  const {
    data: { resultList, total },
  } = await getPodShow({ pageSize, pageNum, sortBy: PUB_DATE, categoryId })
  const totalPages = Math.ceil(+total / +pageSize)
  console.log({ pageSize, pageNum, sortBy: PUB_DATE, categoryId }, resultList[0], '---')
  return (
    <main className={`flex flex-col overflow-hidden h-[100%]`}>
      <Pagination totalPages={totalPages} total={total} />
      <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[15px] mt-[22px] overflow-auto pb-[100px]`}>
        {resultList.map(({ coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate }: any) => {
          const [title, des] = [getNoTagText(showTitle) || '-', getNoTagText(showDescription) || '-']
          return (
            <Link href={`/podcast/${encodeURIComponent(title)}-podcast-${showId}`} key={showId} className={`w-[50%]`}>
              <div
                className={`flex mb-4px cursor-pointer overflow-hidden hover:bg-hbg transition-all p-[10px] rounded-10px dark:hover:bg-darkHomeBg`}
              >
                <img src={coverUrl} alt="" className={`w-[110px] h-[110px] object-cover rounded-10px`} />
                <div className={`flex-1 ml-[10px] overflow-hidden`}>
                  <div className={`flex mb-[6px]`}>{categoryList?.map((item: any) => <CateItem {...item} key={item.categoryId} />)}</div>
                  <div className={`overflow-hidden text-ellipsis whitespace-nowrap text-fontGry-600 text-md dark:text-white`} title={title}>
                    {title}
                  </div>
                  <div className={`text-sm text-fontGry-100 flex items-center`} title={des}>
                    <span className={`max-w-[50%] overflow-hidden text-ellipsis whitespace-nowrap`}>{itunesAuthor}</span>
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
