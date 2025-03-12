'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';
import { EyeClosed } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === '' || password === '' || confirmPassword === '') {
      setError('Both email and password are required.');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 6 characters long and contain both letters and numbers.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    console.log('Logging in...', { email, password });
    setError(null);
  };

  return (
    <div className="p-10 w-full h-screen flex justify-center items-center bg-slate-300">
      <div className="w-[1200px] h-[800px] flex bg-gradient-to-bl from-slate-200 to-yellow-100 rounded-[50px] shadow-2xl">
        <Image
          src="/images/food-delivery-3.png"
          alt="Food Delivery"
          width={600}
          height={300}
          className="object-cover m-5 rounded-[30px]"
        />

        <div className="flex flex-col justify-center items-center w-[600px] h-auto">
          <h2 className="text-black text-4xl font-sans mb-2">
            Create an account
          </h2>
          <p className="font-sans text-gray-500 mb-10 text-sm">
            Sign up to explore your favorite dishes.
          </p>
          <form onSubmit={handleSubmit} className="w-[300px]">
            <div className="mb-4 text-black">
              <Label htmlFor="email" className="font-sans text-gray-500 ml-4">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-[350px] h-[50px] rounded-3xl mt-2 border-gray-400 font-sans ${
                  !emailRegex.test(email) && email !== ''
                    ? 'border-red-500'
                    : ''
                }`}
              />
            </div>

            <div className="mb-4 text-black">
              <Label
                htmlFor="password"
                className="font-sans text-gray-500 ml-4"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-[350px] h-[50px] rounded-3xl mt-2 border-gray-400 font-sans ${
                    !passwordRegex.test(password) && password !== ''
                      ? 'border-red-500'
                      : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[-20px] top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="mb-4 text-black">
              <Label
                htmlFor="confirm-password"
                className="font-sans text-gray-500 ml-4"
              >
                Confirm-Password
              </Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`w-[350px] h-[50px] rounded-3xl mt-2 border-gray-400 font-sans ${
                    confirmPassword !== password && confirmPassword !== ''
                      ? 'border-red-500'
                      : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-[-20px] top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeClosed size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

            <Button
              type="submit"
              variant="secondary"
              className="w-[350px] h-[50px] rounded-3xl mt-2 bg-yellow-300"
            >
              Let's Go
            </Button>
          </form>

          <div className="mt-4 text-center flex">
            <p className="text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
