import { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  categoryName: string;
}

export const CategoryList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const CategoryData = async () => {
    try {
      const categoryResponse = await axios.get<{ categories: Category[] }>(
        'http://localhost:4000/food-category'
      );

      console.log('API Response:', categoryResponse.data);

      const data = categoryResponse.data.categories;

      if (Array.isArray(data)) {
        const categoryNames = data.map((item) => item.categoryName);
        setCategories(categoryNames);
      } else {
        setError('Unexpected data format');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories');
      setLoading(false);
    }
  };

  useEffect(() => {
    CategoryData();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-white">Categories:</h2>
      <ul className="text-black">
        {categories.map((categoryName, index) => (
          <li key={index}>{categoryName}</li>
        ))}
      </ul>
    </div>
  );
};
