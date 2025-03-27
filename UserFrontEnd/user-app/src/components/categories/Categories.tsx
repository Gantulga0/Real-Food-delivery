import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import FoodDetailsModal from '../FoodDetail';
import { ShoppingCart } from 'lucide-react';
import { OrderDetail } from '../FoodOrder';
import { FoodCard } from '../FoodCard';
import { CategoryBadges } from './CategoryBadges';
import { Category } from '@/types/category';
import { Food } from '@/types/food';
import { FoodItem } from '@/types/card';


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

  const handleAddOrder = (food: Food, quantity: number) => {
    setFoodItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.foodId === food._id);

      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.foodId === food._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        updateTotalPrice(updatedItems);
        return updatedItems;
      } else {
        const newItem = {
          id: `${food._id}-${Date.now()}`,
          name: food.foodName,
          price: food.price,
          quantity: quantity, // Use the passed quantity
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

  const addToCart = (food: Food, quantity: number) => {
    handleAddOrder(food, quantity);
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

      <CategoryBadges
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

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
                <FoodCard
                  key={food._id}
                  food={food}
                  onAddToCart={() => handleAddOrder(food, 1)}
                  onOpenDetails={openFoodDetails}
                />
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
        <OrderDetail
          viewMode={viewMode}
          foodItems={foodItems}
          foods={foods}
          totalPrice={totalPrice}
          loading={loading}
          onSetViewMode={setViewMode}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={handleRemoveItemFromCart}
          onPlaceOrder={handlePlaceOrder}
          onClose={() => setIsOrderDetailOpen(false)}
        />
      )}

      {isModalOpen && selectedFood && (
        <FoodDetailsModal
          food={selectedFood}
          onClose={closeModal}
          onAddToCart={(food, quantity) => addToCart(food, quantity)}
        />
      )}
    </div>
  );
};
