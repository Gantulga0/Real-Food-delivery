'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';
import { EyeClosed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';

export default function Home() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string>('');

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === '' || password === '') {
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

    setError(null);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:4000/auth/sign-in', {
        email,
        password,
      });

      localStorage.setItem('authToken', response.data.token);

      setMessage(response.data.message);

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
          <h2 className="text-black text-4xl font-sans mb-2">Welcome Back!</h2>
          <p className="font-sans text-gray-500 mb-10 text-sm">
            Login and explore your favorite dishes.
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
              <div className="relative mb-5">
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
              <div className="flex flex-row items-center gap-2 justify-between w-[350px]">
                <div className="flex items-center">
                  <Input type="checkbox" className="w-4 h-4" />
                  <label className="pl-1">Remember me </label>
                </div>
                <span className="text-[14px] text-[#2d79f3] font-medium cursor-pointer">
                  Forgot password?
                </span>
              </div>
            </div>

            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
            {message && (
              <div className="text-green-600 text-sm mb-4">{message}</div>
            )}

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
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600">
                Sign-up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
