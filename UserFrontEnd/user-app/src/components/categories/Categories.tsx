import { useEffect, useState } from 'react';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '../ui/button';
import FoodDetailsModal from '../FoodDetail';
import { ShoppingCart } from 'lucide-react';

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

interface FoodItem {
  name: string;
  price: number;
}

export const CategoryList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'order'>('card'); // Manage view mode

  const userId = 'USER_ID';

  const CategoryData = async () => {
    try {
      const categoryResponse = await axios.get<{ categories: Category[] }>(
        'http://localhost:4000/food-category'
      );
      const data = categoryResponse.data.categories;
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setError('Unexpected data format');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch categories');
      setLoading(false);
    }
  };

  const FoodData = async (categoryId: string | null) => {
    if (!categoryId) return;

    try {
      const foodResponse = await axios.get(`http://localhost:4000/food`, {
        params: { categoryId },
      });

      if (foodResponse.data.foods.length === 0) {
        console.log('No foods available for this category.');
      }

      setFoods(foodResponse.data.foods);
    } catch (err) {
      setError('Failed to fetch foods');
    }
  };

  const handleAddOrder = (food: Food) => {
    setFoodItems((prevItems) => {
      const updatedItems = [
        ...prevItems,
        { name: food.foodName, price: food.price },
      ];
      setTotalPrice(
        updatedItems.reduce((total, item) => total + item.price, 0)
      );
      return updatedItems;
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    FoodData(categoryId);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/food-order', {
        _id: userId,
        foodItems: foodItems,
        totalPrice: totalPrice,
      });

      alert('Order created successfully!');
      setFoodItems([]);
      setTotalPrice(0);
      setViewMode('card');
    } catch (error) {
      alert('Error creating order!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openFoodDetails = (food: Food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addToCart = (food: Food) => {
    handleAddOrder(food);
    closeModal();
  };

  const toggleCartView = () => {
    setViewMode(viewMode === 'order' ? 'card' : 'order');
  };

  useEffect(() => {
    CategoryData();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="px-80 mt-8">
      <h2 className="text-white text-3xl font-semibold">Categories</h2>
      <ul className="text-black flex gap-10 mt-9 max-w-[1800px] overflow-auto mb-9">
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
                  className="w-full max-w-[400px] cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:opacity-80 p-3 flex flex-col flex-wrap mb-9"
                >
                  <CardHeader className="p-0 relative">
                    <Image
                      src={food.image}
                      alt={food.foodName}
                      className="object-cover rounded"
                      onClick={() => openFoodDetails(food)}
                      width={400}
                      height={210}
                      quality={100}
                    />
                    <Button
                      className="w-11 h-11 rounded-full bg-white text-red-500 hover:bg-gray-300 absolute top-3/4 left-[310px]"
                      onClick={() => handleAddOrder(food)}
                    >
                      +
                    </Button>
                  </CardHeader>
                  <CardFooter
                    className="flex p-2 items-start justify-between"
                    onClick={() => openFoodDetails(food)}
                  >
                    <div className="overflow-hidden text-ellipsis line-clamp-2 text-2xl text-foreground text-red-500 h-8">
                      {food.foodName}
                    </div>
                    <div className="overflow-hidden text-ellipsis line-clamp-2 text-xl text-foreground h-8 flex items-center">
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

      <Button
        onClick={toggleCartView}
        className="fixed bottom-8 right-8 bg-red-500 text-white p-4 rounded-full"
      >
        <ShoppingCart size={24} />
      </Button>

      {viewMode === 'card' && foodItems.length > 0 && (
        <div className="w-[826px] h-screen bg-white right-0 top-0 fixed flex flex-col justify-start">
          <div className="flex items-center gap-2">
            <ShoppingCart />
            <h4 className="text-sm">Order Detail</h4>
            <Button
              onClick={() => setViewMode('card')} // Close the order details view
              className="ml-auto bg-red-500 text-white"
            >
              X
            </Button>
          </div>
          <div className="flex gap-4 mt-6">
            <Badge
              className={`text-xl px-3 rounded-full cursor-pointer h-9 ${
                viewMode === 'card' ? 'bg-red-500 text-white' : ''
              }`}
              onClick={() => setViewMode('card')}
            >
              Card
            </Badge>
            <Badge
              onClick={() => setViewMode('order')}
              className="text-xl px-3 rounded-full cursor-pointer h-9"
            >
              Order
            </Badge>
          </div>

          <div className="mt-4">
            {foodItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between">
            <span className="text-xl">Total Price</span>
            <span className="text-xl">{totalPrice}</span>
          </div>
          <Button onClick={handlePlaceOrder} className="mt-6 w-full bg-red-500">
            Place Order
          </Button>
        </div>
      )}

      {viewMode === 'order' && foodItems.length > 0 && (
        <div className="w-[826px] h-screen bg-white right-0 top-0 fixed flex flex-col justify-start">
          <div className="flex items-center gap-2">
            <ShoppingCart />
            <h4 className="text-sm">Order Detail</h4>
            {/* Close Button */}
            <Button
              onClick={() => setViewMode('card')} // Close the order details view
              className="ml-auto bg-red-500 text-white"
            >
              X
            </Button>
          </div>
          <div className="flex gap-4 mt-6">
            <Badge
              onClick={() => setViewMode('card')}
              className="text-xl px-3 rounded-full cursor-pointer h-9"
            >
              Card
            </Badge>
            <Badge
              onClick={() => setViewMode('order')}
              className={`text-xl px-3 rounded-full cursor-pointer h-9 ${
                viewMode === 'order' ? 'bg-red-500 text-white' : ''
              }`}
            >
              Order
            </Badge>
          </div>

          <div className="mt-4">
            {foodItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between">
            <span className="text-xl">Total Price</span>
            <span className="text-xl">{totalPrice}</span>
          </div>
          <Button onClick={handlePlaceOrder} className="mt-6 w-full bg-red-500">
            Place Order
          </Button>
        </div>
      )}

      {isModalOpen && selectedFood && (
        <FoodDetailsModal
          food={selectedFood}
          onClose={closeModal}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
};
