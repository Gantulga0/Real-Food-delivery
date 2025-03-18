'use client';

import React from 'react';
import Image from 'next/image';
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <div className="w-full bg-black h-[755px] pt-16">
      <div className="bg-red-500 w-full h-24 flex gap-7 items-center overflow-x whitespace-nowrap mb-20">
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
      </div>
      <div className="px-80 flex justify-between h-[248px] mb-28">
        <div className="flex flex-col">
          <Image
            src="/images/logo.png"
            alt="Food Delivery"
            width={46}
            height={38}
            className="object-cover"
          />
          <div className="flex flex-col">
            <div className="flex">
              <p className="text-white text-xl font-semibold">Nom</p>
              <p className="text-red-500 text-xl font-semibold">Nom</p>
            </div>
            <p className="text-white text-xs">Swift Delivery</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-gray-500">NOMNOM</div>
          <p className="text-white">Home</p>
          <p className="text-white">Contact us</p>
          <p className="text-white">Delivery zone</p>
        </div>{' '}
        <div className="flex flex-col gap-4">
          <div className="text-gray-500">MENU</div>
          <p className="text-white">Appetizers</p>
          <p className="text-white">Salads</p>
          <p className="text-white">Pizzas</p>
          <p className="text-white">Lunch favorites</p>
          <p className="text-white">Main dishes</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="">MENU</div>
          <p className="text-white">Side dish</p>
          <p className="text-white">Brunch</p>
          <p className="text-white">Desserts</p>
          <p className="text-white">Beverages</p>
          <p className="text-white">Fish & Sea foods</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-gray-500">FOLLOW US</p>
          <div className="flex gap-3">
            <Facebook className="text-white border-2 rounded-full" />
            <Instagram className="text-white" />
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <Separator className="w-[1600px] bg-gray-500" />
      </div>
      <div className="text-gray-500 flex gap-12 px-80">
        <p>Copy right 2025 Nomnom LLC</p>
        <p>Privacy policy</p>
        <p>Terms and condition</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};

export default Footer;
