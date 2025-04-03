import { useEffect, useState } from 'react';
import axios from 'axios';

export const useOrderHistory = (userId: string) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderHistory = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const history = await getOrderHistory(userId);
      setOrders(history);
    } catch (err) {
      setError('Failed to fetch order history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, [userId]);

  return { orders, loading, error, refresh: fetchOrderHistory };
};

export const getOrderHistory = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/food-order/${userId}`
    );
    console.log('userId', userId);
    console.log('response', response.data);
    return response.data.userOrders;
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};
