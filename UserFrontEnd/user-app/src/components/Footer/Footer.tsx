'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/food-category');
      setMessage(response.data.message);
      setCategories(response.data.categories);
      console.log(response.data.categories);

      router.push('/');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('An unknown error occurred');
        }
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full bg-black h-[755px] pt-16">
      <div className="bg-red-500 w-full h-24 flex gap-7 items-center overflow-x whitespace-nowrap">
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
        <p className="text-3xl text-white">Fresh fast delivered</p>
      </div>
      <div className="px-80 flex justify-between h-[228px]">
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
        <div className="flex">
          <div>
            <div className="text-white">NOMNOM</div>
            <p className="text-white">Home</p>
            <p className="text-white">Contact us</p>
            <p className="text-white">Delivery zone</p>
          </div>
          <div className="h-[228px] flex flex-wrap flex-col">
            {' '}
            <div className="text-white">MENU</div>
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category._id} className="text-lg text-white">
                  {category.categoryName}
                </div>
              ))
            ) : (
              <div>Loading categories...</div>
            )}
          </div>
        </div>
      </div>

      <div>copyright</div>
    </div>
  );
};

export default Footer;
