'use client'
import { useState } from 'react'
import { flowPodcast, unFlowPodcast } from '@/app/lib/service'
import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'

export default function FlowBtn({ item, noPosition }: { item: any; noPosition?: boolean }) {
  const { showId, followed = false } = item
  const [isFlow, setIsFlow] = useState(followed)
  const [loading, setLoading] = useState(false)
  const [showUnFlower, setShowUnFlower] = useState(false)
  const { refresh } = useRouter()

  async function flowThisItem() {
    if (loading) return
    if (isFlow) {
      setShowUnFlower(true)
    } else {
      setLoading(true)
      try {
        await flowPodcast(showId)
        setIsFlow(true)
      } catch (e) {}
      setLoading(false)
      refresh()
    }
  }
  async function confirmUnflow() {
    setLoading(true)
    try {
      await unFlowPodcast(showId)
      setIsFlow(false)
      setShowUnFlower(false)
    } catch (e) {}
    setLoading(false)
    refresh()
  }
  return (
    <div>
      <div
        className={`text-sm text-white py-[4px] w-[100px] bg-play ${noPosition ? '' : 'absolute top-[10px] right-[10px]'} flex justify-center items-center rounded-[14px] cursor-pointer ${isFlow ? 'opacity-80' : ''}`}
        onClick={flowThisItem}
      >
        {loading ? (
          <Loader2 className="animate-spin mr-[8px] h-[20px]" />
        ) : (
          <img src={`/icons/${isFlow ? 'check-large' : 'plus'}.svg`} alt="" className={`mr-[3px] w-[20px] h-[20px]`} />
        )}

        <span>{isFlow ? 'Followed' : 'Follow'}</span>
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
                  {loading && <Loader2 className="animate-spin mr-[8px] h-[20px]" />}
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
