import Pagination from '@/app/ui/pagination'
import { getPodShow } from '@/app/lib/service'
import { getNoTagText, POPULARITY } from '@/app/lib/utils'
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
  } = await getPodShow({ pageSize, pageNum, sortBy: POPULARITY, levelCategoryId: '' })
  const totalPages = Math.ceil(+total / +pageSize)
  return (
    <main className={`flex flex-col overflow-hidden h-[100%]`}>
      <Pagination totalPages={totalPages} total={total} />
      <div className={`flex flex-wrap border border-gray-1000 rounded-10px p-[25px] mt-[22px] flex-1 overflow-auto pb-[100px]`}>
        {resultList.map(({ coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription }: any) => {
          const [title, des] = [getNoTagText(showTitle) || '-', getNoTagText(showDescription) || '-']
          return (
            <div className={`flex mb-24px cursor-pointer w-[50%] pr-[14px] overflow-hidden`} key={showId}>
              <img src={coverUrl} alt="" className={`w-[110px] h-[110px] object-cover rounded-10px`} />
              <div className={`flex-1 ml-[10px] overflow-hidden`}>
                <div className={`flex mb-[6px]`}>
                  {categoryList?.map(({ categoryName, categoryId }: any) => (
                    <div
                      className={`text-white mr-[6px] text-min px-[6px] rounded-10px bg-[#c8c8c8] hover:bg-play transition-all`}
                      key={categoryId}
                    >
                      {categoryName}
                    </div>
                  ))}
                </div>
                <div className={`overflow-hidden text-ellipsis whitespace-nowrap text-fontGry-600 text-md`} title={title}>
                  {title}
                </div>
                <div className={`text-sm overflow-hidden text-ellipsis line-clamp-3 text-fontGry-100`} title={des}>
                  {des}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
