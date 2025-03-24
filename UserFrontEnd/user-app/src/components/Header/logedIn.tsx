import { useState, useEffect } from 'react';
import {
  ChevronRight,
  MapPinPlusInside,
  ShoppingCart,
  User,
  LogOut,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const LogedIn = () => {
  const [emailVisible, setEmailVisible] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'order'>('card'); // Manage view mode
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUserClick = async () => {
    setEmailVisible(!emailVisible);

    if (!userEmail) {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No token found!');
          return;
        }

        const response = await axios.get('http://localhost:4000/auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserEmail(response.data.user.email);
      } catch (error) {
        console.error('Error fetching user email:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  const toggleCartView = () => {
    setViewMode(viewMode === 'order' ? 'card' : 'order');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex gap-3">
      <div className="flex items-center border border-gray-300 rounded-3xl bg-white px-2">
        <MapPinPlusInside className="text-red-400 mr-2" />
        <Input
          type="email"
          placeholder="Add location"
          className="flex-1 text-gray-800 text-sm border-none focus:outline-none "
        />
        <ChevronRight className="ml-auto text-gray-600" />
      </div>

      <Button
        variant={'secondary'}
        className="rounded-full w-9"
        onClick={toggleCartView}
      >
        <ShoppingCart />
      </Button>

      <Button
        className="bg-red-600 rounded-full w-9 hover:bg-red-300"
        onClick={handleUserClick}
      >
        <User />
      </Button>

      {emailVisible && (
        <div className="mt-2 absolute w-[188px] h-[104px] top-12 right-[240px] bg-white flex flex-col items-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p className="text-xl font-semibold pt-3 pb-2">
              {userEmail || 'Email not available'}
            </p>
          )}
          <Button
            variant="secondary"
            className="rounded-full w-[150px]"
            onClick={handleLogout}
          >
            Log out
            <LogOut />
          </Button>
        </div>
      )}
    </div>
  );
};
