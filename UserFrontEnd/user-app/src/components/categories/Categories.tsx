import { useEffect, useState } from 'react';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '../ui/button';
import FoodDetailsModal from '../FoodDetail';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';

interface Category {
  categoryName: string;
  _id: string;
}

interface Food {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
}

interface FoodItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  foodId: string;
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
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'order'>('card');

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
      setLoading(true);
      const foodResponse = await axios.get(`http://localhost:4000/food`, {
        params: { categoryId },
      });

      if (foodResponse.data.foods.length === 0) {
        console.log('No foods available for this category.');
      }

      setFoods(foodResponse.data.foods);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch foods');
      setLoading(false);
    }
  };

  const handleAddOrder = (food: Food) => {
    setFoodItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.foodId === food._id);

      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.foodId === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        updateTotalPrice(updatedItems);
        return updatedItems;
      } else {
        const newItem = {
          id: `${food._id}-${Date.now()}`,
          name: food.foodName,
          price: food.price,
          quantity: 1,
          foodId: food._id,
        };
        const updatedItems = [...prevItems, newItem];
        updateTotalPrice(updatedItems);
        return updatedItems;
      }
    });
  };

  const handleRemoveItemFromCart = (itemId: string) => {
    setFoodItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      updateTotalPrice(updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setFoodItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      updateTotalPrice(updatedItems);
      return updatedItems;
    });
  };

  const updateTotalPrice = (items: FoodItem[]) => {
    setTotalPrice(
      items.reduce((total, item) => total + item.price * item.quantity, 0)
    );
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
      setIsOrderDetailOpen(false);
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
    setSelectedFood(null);
  };

  const addToCart = (food: Food) => {
    handleAddOrder(food);
    closeModal();
  };

  const toggleOrderDetail = () => {
    setIsOrderDetailOpen(!isOrderDetailOpen);
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
        {categories.map((category) => (
          <Badge
            key={category._id}
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
            <div className="flex justify-between flex-wrap mt-6">
              {foods.map((food) => (
                <Card
                  key={food._id}
                  className="w-full max-w-[400px] cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:opacity-80 p-3 flex flex-col mb-9"
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddOrder(food);
                      }}
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
                      ${food.price.toFixed(2)}
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
        onClick={toggleOrderDetail}
        className="fixed bottom-8 right-8 bg-red-500 text-white p-4 rounded-full"
        disabled={foodItems.length === 0}
      >
        <ShoppingCart size={24} />
        {foodItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-sm">
            {foodItems.length}
          </span>
        )}
      </Button>

      {isOrderDetailOpen && (
        <div className="w-[826px] h-screen bg-white right-0 top-0 fixed flex flex-col justify-start p-10 overflow-y-auto">
          <div className="flex items-center gap-2">
            <ShoppingCart />
            <h4 className="text-sm">Order Detail</h4>
            <Button
              onClick={() => setIsOrderDetailOpen(false)}
              className="ml-auto bg-red-500 text-white"
            >
              <X size={18} />
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
              className={`text-xl px-3 rounded-full cursor-pointer h-9 ${
                viewMode === 'order' ? 'bg-red-500 text-white' : ''
              }`}
              onClick={() => setViewMode('order')}
            >
              Order
            </Badge>
          </div>

          <div className="text-2xl font-bold mt-4">
            {viewMode === 'card' ? 'My Cart' : 'Order Details'}
          </div>

          {viewMode === 'card' ? (
            <div className="mt-6 grid grid-cols-2 gap-4">
              {foodItems.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer p-3 flex flex-col mb-4 border"
                >
                  <CardHeader className="p-0 relative">
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          foods.find((f) => f._id === item.foodId)?.image || ''
                        }
                        alt={item.name}
                        width={100}
                        height={100}
                        className="object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="text-xl text-red-500">{item.name}</div>
                        <div className="text-lg">${item.price.toFixed(2)}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-end p-0 mt-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveItemFromCart(item.id)}
                    >
                      <X size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {foodItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                foodItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border-b"
                  >
                    {/* Keep your existing order view content here */}
                  </div>
                ))
              )}
            </div>
          )}

          <div className="mt-auto border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-red-500"
              disabled={foodItems.length === 0 || loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </div>
      )}

      {isModalOpen && selectedFood && (
        <FoodDetailsModal
          food={selectedFood}
          onClose={closeModal}
          onAddToCart={() => addToCart(selectedFood)}
        />
      )}
    </div>
  );
};
