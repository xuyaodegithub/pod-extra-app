// Loading animation
import { Skeleton } from '@/components/ui/skeleton'
// const shimmer =
//   'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'

export function LoadingLine({ num = 4 }: { num?: number }) {
  const arr: any[] = Array.from({ length: num })
  return (
    <div className={`relative overflow-hidden rounded-xl bg-white p-24px mb-24px border border-accent`}>
      {arr.map((item, ind) => (
        <Skeleton key={ind} className="h-24px mb-24px" style={{ width: ((ind + 1) / num) * 100 + '%' }} />
      ))}
      {/*<Skeleton className="h-24px w-[30%] mb-24px" />*/}
      {/*<Skeleton className="h-24px w-[50%] mb-24px" />*/}
      {/*<Skeleton className="h-24px w-[80%] mb-24px" />*/}
      {/*<Skeleton className="h-24px w-[100%]" />*/}
    </div>
  )
}
