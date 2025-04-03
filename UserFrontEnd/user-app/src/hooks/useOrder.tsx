import { useState } from 'react';
import axios from 'axios';
import { FoodItem } from '@/types/card';
import { useAuth } from './auth-context';

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuth();

  const placeOrder = async (
    userId: string,
    foodItems: FoodItem[],
    totalPrice: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:4000/food-order', {
        userId,
        foodItems,
        totalPrice,
      });
      setLoading(false);
      return response.data;
    } catch (error) {
      setError('Error creating order!');
      setLoading(false);
      throw error;
    }
  };

  return { loading, error, placeOrder };
};
