import { useState } from 'react';
import axios from 'axios';
import { FoodItem } from '@/types/card';

export const useOrder = () => {
  const [loading, setLoading] = useState(false);


  const placeOrder = async (
    userId: string,
    foodItems: FoodItem[],
    totalPrice: number
  ) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/food-order', {
        _id: userId,
        foodItems,
        totalPrice,
      });
      console.log(response);
      alert('Order created successfully!');
      setLoading(false);

    } catch (error) {
      alert('Error creating order!');
      console.log(error);
      setLoading(false);
    }
  };

  return { loading, placeOrder};
};
