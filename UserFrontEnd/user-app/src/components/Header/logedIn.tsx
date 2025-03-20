import { useState, useEffect } from 'react';
import {
  ChevronRight,
  MapPinPlusInside,
  ShoppingCart,
  User,
  LogOut,
} from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Make sure to use next/router

export const LogedIn = () => {
  const [emailVisible, setEmailVisible] = useState(false); // To toggle email visibility
  const [userEmail, setUserEmail] = useState<string | null>(null); // Store fetched email
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter(); // useRouter hook from next/router

  const [isMounted, setIsMounted] = useState(false); // For preventing SSR issues

  // Prevents SSR issues with router
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle user profile click to toggle email visibility and fetch user data
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

        // Fetch user email from backend
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

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex gap-3">
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
        onClick={handleUserClick}
      >
        <User />
      </Button>

      {emailVisible && (
        <div className="text-white mt-2">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p>{userEmail || 'Email not available'}</p>
          )}
        </div>
      )}
      <Button
        className="bg-red-600 rounded-full w-9 hover:bg-red-300"
        onClick={handleLogout}
      >
        <LogOut />
      </Button>
    </div>
  );
};
