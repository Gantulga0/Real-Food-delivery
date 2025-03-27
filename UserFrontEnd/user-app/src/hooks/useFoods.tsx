// hooks/useFoods.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Food } from '@/types/food';

export const useFoods = (categoryId: string | null) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:4000/food', {
          params: { categoryId },
        });
        setFoods(response.data.foods);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch foods');
        setLoading(false);
      }
    };
    fetchFoods();
  }, [categoryId]);

  return { foods, loading, error };
};
