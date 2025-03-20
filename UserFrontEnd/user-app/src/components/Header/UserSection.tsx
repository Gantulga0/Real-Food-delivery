import { useEffect, useState } from 'react';
import axios from 'axios';
import { LoggedOut } from './logedOut';
import { LogedIn } from './logedIn';

export const UserSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  const UserData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found.');
        setLoading(false);
        return;
      }

      const userResponse = await axios.get('http://localhost:4000/auth', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(userResponse.data.user);
      setLoading(false);
    } catch (err: unknown) {
      setLoading(false);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (user) {
    return <LogedIn />;
  }

  return <LoggedOut />;
};
