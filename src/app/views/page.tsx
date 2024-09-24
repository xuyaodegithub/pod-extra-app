import Image from "next/image";
import styles from '@/app/ui/home.module.css';
import clsx from 'clsx';

export default function Home() {
  return (
      <div className="bg-white py-24 sm:py-32">
        views Page
        <Image
            src="/woman-9009013_1280.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
        />
        <Image
            src="/woman-9009013_1280.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
        />
      </div>
  );
}
