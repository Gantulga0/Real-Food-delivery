'use client';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Image from 'next/image';
export default function Home() {
  
  return (
    <div>
      <Header />
      <Image
        src="/images/poster.png"
        alt="Food Delivery"
        width={2300}
        height={570}
        className="object-cover rounded-[30px] w-full"
      />

      <Footer />
    </div>
  );
}
