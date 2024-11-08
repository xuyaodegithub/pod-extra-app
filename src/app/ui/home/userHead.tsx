export default function UserHead({ name, open }: { name: string; open?: any }) {
  return (
    <div
      className={`text-md leading-[40px] text-center w-[40px] h-[40px] rounded-[50%] bg-play dark:bg-bgDark text-white`}
      onClick={(event) => open && open(event)}
    >
      {name}
    </div>
  )
}
