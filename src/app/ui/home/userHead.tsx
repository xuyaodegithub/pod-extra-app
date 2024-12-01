import clsx from 'clsx'
export default function UserHead({ name, open, className }: { name: string; open?: any; className?: string }) {
  return (
    <div
      className={clsx(`text-md leading-[40px] text-center w-[40px] h-[40px] rounded-[50%] bg-play text-white shrink-0`, className)}
      onClick={(event) => open && open(event)}
    >
      {name}
    </div>
  )
}
