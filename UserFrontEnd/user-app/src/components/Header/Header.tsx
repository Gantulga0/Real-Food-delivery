'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { MapPinPlusInside } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { User } from 'lucide-react';
import axios from 'axios';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const router = useRouter();

  const UserData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userResponse = await axios.get('http://localhost:4000/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userResponse.data.isLoggedIn) {
        setIsLoggedIn(true);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError('You are not authorized. Please log in.');
        } else if (err.response?.status === 404) {
          setError('The user data was not found.');
        } else {
          setError('An error occurred while fetching data.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  useEffect(() => {
    UserData();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    router.push('login');
  };

  const handleSignUP = () => {
    router.push('signup');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMessage('You have logged out.');
  };

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
      <div className="flex items-center gap-3">
        {error && <p className="text-red-500">{error}</p>}{' '}
        {message && <p className="text-green-500">{message}</p>}{' '}
        {!isLoggedIn ? (
          <>
            <Button
              variant={'secondary'}
              className="rounded-3xl"
              onClick={handleSignUP}
            >
              Sign Up
            </Button>
            <Button
              variant={'secondary'}
              className="bg-red-500 text-white hover:bg-red-400 rounded-3xl"
              onClick={handleLogin}
            >
              Log in
            </Button>
          </>
        ) : (
          <>
            <Button variant={'secondary'} className="rounded-3xl">
              <MapPinPlusInside className="text-red-400" />
              <p className="text-red-400">Delivery address:</p>
              <p>Add Location</p>
              <ChevronRight />
            </Button>
            <Button variant={'secondary'} className="rounded-full w-9">
              <ShoppingCart />
            </Button>
            <Button
              className="bg-red-600 rounded-full w-9 hover:bg-red-300"
              onClick={handleLogout}
            >
              <User />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
