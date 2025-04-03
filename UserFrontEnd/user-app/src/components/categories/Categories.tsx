import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { FoodCard } from '../FoodCard';
import { CategoryBadges } from './CategoryBadges';
import { OrderDetail } from '../FoodOrder';
import FoodDetailsModal from '../FoodDetail';
import { useCategories } from '@/hooks/useCategories';
import { useFoods } from '@/hooks/useFoods';
import { useCart } from '@/hooks/useCart';
import { useOrder } from '@/hooks/useOrder';
import { useAuth } from '@/hooks/auth-context';
import { Food } from '@/types/food';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const CategoryList = () => {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const {
    foods,
    loading: foodsLoading,
    error: foodsError,
  } = useFoods(selectedCategory);
  const {
    foodItems,
    totalPrice,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
  } = useCart();
  const { loading: orderLoading, placeOrder } = useOrder();
  const { user } = useAuth();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'card' | 'order'>('card');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      await placeOrder(user._id, foodItems, totalPrice);
      foodItems.forEach((item) => removeItemFromCart(item.id));
      alert('Order placed successfully!');
      setIsOrderDetailOpen(false);
    } catch (error) {
      console.error('Order placement failed:', error);
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

  const toggleOrderDetail = () => {
    setIsOrderDetailOpen(!isOrderDetailOpen);
  };

  if (categoriesLoading || foodsLoading) {
    return <p className="text-white">Loading...</p>;
  }

  if (categoriesError || foodsError) {
    return <p className="text-red-500">{categoriesError || foodsError}</p>;
  }

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
                  onAddToCart={(food, quantity) =>
                    addItemToCart(
                      {
                        id: food._id,
                        name: food.foodName,
                        quantity: quantity,
                        foodId: food._id,
                        ...food,
                      },
                      1
                    )
                  }
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
          foodItems={foodItems}
          totalPrice={totalPrice}
          onRemoveItem={removeItemFromCart}
          onUpdateQuantity={updateItemQuantity}
          onPlaceOrder={handlePlaceOrder}
          onClose={() => setIsOrderDetailOpen(false)}
          viewMode={viewMode}
          foods={foods}
          loading={orderLoading}
          onSetViewMode={setViewMode}
        />
      )}

      {isModalOpen && selectedFood && (
        <FoodDetailsModal
          food={selectedFood}
          onClose={closeModal}
          onAddToCart={(food, quantity) =>
            addItemToCart(
              {
                id: food._id,
                name: food.foodName,
                image: food.image,
                ingredients: food.ingredients,
                price: food.price,
                quantity: quantity,
                foodId: food._id,
              },
              quantity
            )
          }
        />
      )}
    </div>
  );
};
