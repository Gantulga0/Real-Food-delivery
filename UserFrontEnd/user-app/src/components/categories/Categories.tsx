import { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

interface Category {
  categoryName: string;
  _id: string;
}

interface Food {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
}

export const CategoryList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);

  const CategoryData = async () => {
    try {
      const categoryResponse = await axios.get<{ categories: Category[] }>(
        'http://localhost:4000/food-category'
      );
      console.log('API Response:', categoryResponse.data);

      const data = categoryResponse.data.categories;

      if (Array.isArray(data)) {
        setCategories(data);
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

  const FoodData = async (categoryId: string | null) => {
    if (!categoryId) return;

    console.log('Fetching foods for categoryId:', categoryId);

    try {
      const foodResponse = await axios.get(`http://localhost:4000/food`, {
        params: { categoryId },
      });

      if (foodResponse.data.foods.length === 0) {
        console.log('No foods available for this category.');
      }

      setFoods(foodResponse.data.foods);
    } catch (err) {
      console.error('Error fetching foods:', err);
      setError('Failed to fetch foods');
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    CategoryData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      FoodData(selectedCategory);
    }
  }, [selectedCategory]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="px-80 mt-8">
      <h2 className="text-white text-3xl font-semibold">Categories</h2>
      <ul className="text-black flex gap-10 mt-9">
        {categories.map((category, index) => (
          <Badge
            key={index}
            variant={
              selectedCategory === category._id ? 'outline' : 'secondary'
            }
            className={`text-xl px-3 rounded-full cursor-pointer ${
              selectedCategory === category._id ? 'bg-red-500 text-white' : ''
            }`}
            onClick={() => handleCategoryClick(category._id)}
          >
            {category.categoryName}
          </Badge>
        ))}
      </ul>

      {selectedCategory && (
        <div className="mt-8">
          <h3 className="text-white text-2xl">Foods</h3>
          {foods.length === 0 ? (
            <p className="text-white mt-4">
              No foods available in this category
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-6 mt-6">
              {foods.map((food, index) => (
                <Card
                  key={index}
                  className="w-full max-w-[200px] mx-auto cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:opacity-80"
                >
                  <CardHeader className="p-0">
                    <Image
                      src={food.image}
                      alt={food.foodName}
                      className="object-cover rounded"
                      width={250}
                      height={350}
                      quality={100}
                    />
                  </CardHeader>
                  <CardFooter className="flex flex-col p-2 items-start">
                    <div className="h-14 overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground">
                      {food.foodName}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
