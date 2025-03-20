import { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';

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
      <ul className="text-black flex gap-10 mt-9 max-w-[1800px] overflow-auto">
        {categories.map((category, index) => (
          <Badge
            key={index}
            variant={
              selectedCategory === category._id ? 'outline' : 'secondary'
            }
            className={`text-xl px-3 rounded-full cursor-pointer h-9 ${
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
            <div className="flex justify-between mt-6">
              {foods.map((food, index) => (
                <Card
                  key={index}
                  className="w-full max-w-[400px] cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:opacity-80 p-3 flex flex-col flex-wrap"
                >
                  <CardHeader className="p-0 relative">
                    <Image
                      src={food.image}
                      alt={food.foodName}
                      className="object-cover rounded"
                      width={400}
                      height={210}
                      quality={100}
                    />
                    <Button className="w-11 h-11 rounded-full bg-white text-red-500 hover:bg-gray-300 absolute top-3/4 left-[310px]">
                      +
                    </Button>
                  </CardHeader>
                  <CardFooter className="flex p-2 items-start justify-between">
                    <div className="overflow-hidden text-ellipsis line-clamp-2 text-2xl text-foreground text-red-500 h-8">
                      {food.foodName}
                    </div>
                    <div className="overflow-hidden text-ellipsis line-clamp-2 text-xl text-foreground h-8 flex items-center">
                      {' '}
                      {food.price}
                    </div>
                  </CardFooter>
                  <div className="p-2 text-sm">{food.ingredients}</div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
