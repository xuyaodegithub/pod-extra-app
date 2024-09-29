import Image from 'next/image'
// import styles from '@/app/ui/home.module.css';
// import clsx from 'clsx';
// import { fetchRevenue } from '@/app/lib/data'
export default async function Home() {
  // const revenue = await fetchRevenue();
  // console.log(revenue,'------')
  return (
    <div className="bg-white py-24 sm:py-32">
      customers.tsx
      <Image
        src="/woman-9009013_1280.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      />
    </div>
  )
}
