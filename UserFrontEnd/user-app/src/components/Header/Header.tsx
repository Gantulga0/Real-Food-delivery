'use client';

import Image from 'next/image';
import { UserSection } from './UserSection';

const Header = () => {
  return (
    <div className="w-full bg-black h-16 flex items-center justify-between px-80">
      <div className="flex items-center">
        <Image
          src="/images/logo.png"
          alt="Food Delivery"
          width={46}
          height={38}
          className="object-cover pr-3"
        />
        <div className="flex flex-col">
          <div className="flex justify-center">
            <p className="text-white text-xl font-semibold">Nom</p>
            <p className="text-red-500 text-xl font-semibold">Nom</p>
          </div>
          <p className="text-white text-xs">Swift Delivery</p>
        </div>
      </div>

      <UserSection />
    </div>
  );
};

export default Header;
