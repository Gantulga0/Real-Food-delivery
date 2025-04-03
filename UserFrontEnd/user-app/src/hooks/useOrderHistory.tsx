import { useEffect, useState } from 'react';
import { getOrderHistory } from './useOrder';

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
