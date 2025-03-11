'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Home() {
  const [email, setEmail] = useState<any | null>('');
  const [password, setPassword] = useState<any | null>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setError('Both email and password are required.');
      return;
    }

    console.log('Logging in...', { email, password });
    setError(null);
  };
  return (
    <div className="p-10 w-full h-screen flex justify-center items-center">
      <div className="w-[1200px] h-[700px] flex bg-purple-400 rounded-xl">
        <Image
          src="/images/food-delivery.jpg"
          alt="Food Delivery"
          width={550}
          height={300}
          className="object-cover m-10 rounded-xl"
        />

        <div className="flex flex-col justify-center items-center w-[600px] h-auto">
          <h2 className="text-white text-5xl font-semibold mb-4">Log in</h2>
          <form onSubmit={handleSubmit} className="w-[300px]">
            <div className="mb-4 text-white">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 text-white">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

            <Button type="submit" variant="secondary">
              Log In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-white">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
