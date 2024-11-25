'use client'
export default function FlowStart({ item }: { item: any }) {
  const { episodeId } = item
  function followEpiosde(e: any) {
    e.preventDefault()
  }
  return (
    <div className={`bg-hbg dark:bg-bgDark rounded-[50%] p-[5px]`} onClick={(e: any) => followEpiosde(e)}>
      <img src="/icons/star.svg" alt="" />
    </div>
  )
}
