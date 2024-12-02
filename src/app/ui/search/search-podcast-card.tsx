'use client'
import { useMyContext } from '@/context/MyContext'
import { useState } from 'react'
import Link from 'next/link'
import { getCurrentLocalTime, getNoTagText } from '@/app/lib/utils'
import { clsx } from 'clsx'
import CateItem from '@/app/ui/categories/cateItem'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'
import Image from '@/app/ui/Image'

export default function SearchPodcastCard({ item, noMb }: { item: any; noMb: boolean }) {
  const { isDark } = useMyContext()
  const [showUnFlower, setShowUnFlower] = useState(false)
  const [loading, setLoading] = useState(false)
  const { coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate, showUrl } = item
  const [title, des] = [getNoTagText(showTitle) || '-', getNoTagText(showDescription) || '-']
  function confirmUnflow() {}
  function flowThisItem() {
    setShowUnFlower(true)
  }
  return (
    <div className={` relative ${noMb ? '' : 'pb-[5px] mb-[5px]'} w-[100%]`}>
      <Link href={showUrl} key={showId} className={`w-[100%] inline-block`}>
        <div className={`flex cursor-pointer overflow-hidden  hover:bg-hbg dark:hover:bg-darkHomeBg transition-all p-[10px] rounded-10px`}>
          <Image src={coverUrl} alt="" className={`w-[120px] h-[120px] object-cover rounded-10px`} />
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
      {!noMb && <div className={`border-b-[1px] border-bgGray absolute left-[10px] bottom-0 right-[10px] dark:border-fontGry-600`}></div>}
      <div
        className={`text-sm text-white py-[4px] px-[15px] bg-play absolute top-[10px] right-[10px] flex items-center rounded-[14px] cursor-pointer`}
        onClick={flowThisItem}
      >
        <img src="/icons/plus.svg" alt="" className={`mr-[3px] w-[20px] h-[20px]`} />
        <span>Follow</span>
      </div>
      <Dialog open={showUnFlower} onOpenChange={(val: boolean) => setShowUnFlower(val)}>
        <DialogContent className={`w-[640px] bg-white dark:bg-bgDark rounded-[20px] pb-[29px]`}>
          <DialogHeader>
            <DialogTitle className={`font-bold text-[20px] leading-[1] py-[12px] mb-[12px] text-fontGry-600 dark:text-white px-[20px]`}>
              Unfollow the podcast
            </DialogTitle>
            <DialogDescription className={``}>
              <div className={`text-md text-fontGry-600 mb-[40px] px-[20px] pb-[30px] dark:text-homehbg font-normal`}>
                Sure to unfollow this podcast?
              </div>
              <div className={`flex items-center justify-between px-[20px]`}>
                <div
                  className={`cursor-pointer w-[140px] text-md leading-[40px] text-[#bbbbbb] text-center bg-hbg rounded-[5px] dark:text-fontGry-100 dark:bg-darkHomeBg`}
                  onClick={() => setShowUnFlower(false)}
                >
                  Cancel
                </div>
                <div
                  className={`flex items-center justify-center cursor-pointer w-[140px] text-md leading-[40px] text-white text-center bg-play rounded-[5px]`}
                  onClick={confirmUnflow}
                >
                  {loading && <Loader2 className="animate-spin mr-[8px]" />}
                  Unfollow
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
