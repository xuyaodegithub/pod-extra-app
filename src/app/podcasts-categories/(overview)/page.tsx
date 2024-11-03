import { getPodCategory, getPodEpisode } from '@/app/lib/service'
import styles from '@/app/ui/home.module.scss'
import { Metadata } from 'next'
import Link from 'next/link'
import { getMetaData } from '@/app/lib/utils'
const y = new Date().getFullYear()
export const metadata: Metadata = getMetaData({
  title: `Discover all the best podcasts of ${y - 1}-${y} ｜PodExtra.AI`,
  description: `Discover all the best podcasts of ${y - 1}-${y}  on PodExtra, covering Society & Culture, True Crime, Comedy, History, News, Business, Education, Health & Fitness, Technology, etc.`,
  keywords: '',
})
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
    <main className={`flex flex-col`}>
      <div className={`border border-gray-1000 rounded-10px p-[25px] flex-1 mt-[22px]`}>
        {resultList.map(({ categoryName, children, categoryId }: any) => {
          return (
            <div className={`mb-[25px]`} key={categoryId}>
              <h3 className={`inline-block cursor-pointer text-max1 mb-[4px] relative group ${styles.hoverPlayBorder}`}>
                <Link href={`/podcasts-categories/${encodeURIComponent(categoryName)}-podcasts?categoryId=${categoryId}`}>
                  <span>{categoryName}</span>
                  <span
                    className={`absolute top-0 left-0 text-play w-0 transition-all group-hover:w-[100%] overflow-hidden whitespace-nowrap`}
                  >
                    {categoryName}
                  </span>
                </Link>
              </h3>
              <div className={`flex flex-wrap text-sm text-fontGry-600`}>
                {children?.map(({ categoryName: childName, categoryId: childId }: any): any => (
                  <div className={`relative group mr-[15px] cursor-pointer mb-[4px] ${styles.hoverPlayBorder}`} key={childId}>
                    <Link
                      href={`/podcasts-categories/${encodeURIComponent(categoryName)}/${encodeURIComponent(childName)}-podcasts?childId=${childId}`}
                    >
                      <span className={`dark:text-homehbg`}>{childName}</span>
                      <span
                        className={`absolute top-0 left-0 mr-[15px] text-play w-0 transition-all group-hover:w-[100%] overflow-hidden whitespace-nowrap`}
                        key={childId}
                      >
                        {childName}
                      </span>
                    </Link>
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
