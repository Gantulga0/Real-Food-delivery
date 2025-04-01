import { useState } from 'react';
import axios from 'axios';
import { FoodItem } from '@/types/card';

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeOrder = async (
    userId: string,
    foodItems: FoodItem[],
    totalPrice: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:4000/food-order', {
        userId, // Changed from _id to userId for clarity
        foodItems,
        totalPrice,
      });
      setLoading(false);
      return response.data; // Return the response data
    } catch (error) {
      setError('Error creating order!');
      setLoading(false);
      throw error; // Re-throw the error to handle it in the component
    }
  };

  return { loading, error, placeOrder };
};
