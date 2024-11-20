import Pagination from '@/app/ui/pagination'
import { getEpisodeDetail, getPodShow } from '@/app/lib/service'
import { getNoTagText, PUB_DATE, POPULARITY, getCurrentLocalTime, getMetaData, timeFormat, capitalizeFirstLetter } from '@/app/lib/utils'
import { Metadata, ResolvingMetadata } from 'next'
const y = new Date().getFullYear()
import Link from 'next/link'
import CateItem from '@/app/ui/categories/cateItem'
import { ClientSub } from '@/app/ui/clientDispatch'
export async function generateMetadata({ params, searchParams }: any, parent: ResolvingMetadata): Promise<Metadata> {
  const pageSize = searchParams?.pageSize || 5
  const pageNum = searchParams?.page || 1
  const categoryId = searchParams?.categoryId || ''
  const {
    data: { requestCategoryList },
  } = await getPodShow({ pageSize, pageNum, sortBy: PUB_DATE, categoryId })
  const breadcrumbsTitle = requestCategoryList.map(({ categoryName }: any) => categoryName || '-').join(' / ') + ' podcasts'
  const { categoryName = '' } = params
  return getMetaData({
    title: `The best ${breadcrumbsTitle} of ${y - 1}-${y} | PodExtra.AI`,
    description: `Discover the best ${breadcrumbsTitle} with PodExtra. With AI-powered transcription and summarization, it elevates your listening experience.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/podcasts-categories/${categoryName}?categoryId=${categoryId}`,
    },
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
    data: {
      pageQueryResponse: { resultList = [], total = 0 },
      requestCategoryList,
    },
  } = await getPodShow({ pageSize, pageNum, sortBy: PUB_DATE, categoryId })
  const totalPages = Math.ceil(+total / +pageSize)
  const breadcrumbsTitle = requestCategoryList.map(({ categoryName }: any) => categoryName || '-').join(' / ') + ' Podcasts'
  return (
    <main className={`flex flex-col`}>
      <ClientSub val={breadcrumbsTitle} />
      <div className={`sticky top-[57px] bg-white dark:bg-black pb-[22px]`}>
        <Pagination totalPages={totalPages} total={total} title="podcasts" />
      </div>
      <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[15px]`}>
        {resultList.map(({ coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate, showUrl }: any) => {
          const [title, des] = [getNoTagText(showTitle) || '-', getNoTagText(showDescription) || '-']
          return (
            <Link href={showUrl} key={showId} className={`w-[50%]`}>
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
