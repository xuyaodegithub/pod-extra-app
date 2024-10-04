import { getPodCategory, getPodEpisode } from '@/app/lib/service'
import styles from '@/app/ui/home.module.scss'

export default async function Page() {
  const payload = {
    pageNum: 1,
    pageSize: 50,
    parentAliasCategoryId: '',
  }
  const {
    data: { resultList },
  } = await getPodCategory(payload)
  return (
    <main className={`overflow-hidden h-[100%] flex flex-col`}>
      <div className={`border border-gray-1000 rounded-10px p-[25px] flex-1 mt-[22px] overflow-auto pb-[100px]`}>
        {resultList.map(({ categoryName, children, categoryId }: any) => {
          return (
            <div className={`mb-[25px]`} key={categoryId}>
              <h3 className={`text-max1 mb-[4px]`}>{categoryName}</h3>
              <div className={`flex flex-wrap text-sm text-fontGry-600`}>
                {children?.map(({ categoryName: childName, categoryId: childId }: any): any => (
                  <div className={`relative group mr-[15px] cursor-pointer mb-[4px] ${styles.hoverPlayBorder}`} key={childId}>
                    <span>{childName}</span>
                    <span
                      className={`absolute top-0 left-0 mr-[15px] text-play w-0 transition-all group-hover:w-[100%] overflow-hidden whitespace-nowrap`}
                      key={childId}
                    >
                      {childName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
