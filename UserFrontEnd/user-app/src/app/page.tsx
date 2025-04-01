'use client';
import { CategoryList } from '@/components/categories/Categories';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { AuthProvider } from '@/hooks/auth-context';
import Image from 'next/image';
export default function Home() {
  return (
    <AuthProvider>
      {' '}
      <div className="bg-[#282828]">
        <Header />
        <Image
          src="/images/poster.png"
          alt="Food Delivery"
          width={2300}
          height={570}
          className="object-cover rounded-[30px] w-full"
        />
        <CategoryList />
        <Footer />
      </div>
    </AuthProvider>
  );
}
