import { useState } from 'react';
import { FoodItem } from '@/types/card';

export const useCart = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const addItemToCart = (food: FoodItem, quantity: number) => {
    setFoodItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.foodId === food.foodId
      );
      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.foodId === food.foodId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        updateTotalPrice(updatedItems);
        return updatedItems;
      } else {
        const newItem = { ...food, quantity };
        const updatedItems = [...prevItems, newItem];
        updateTotalPrice(updatedItems);
        return updatedItems;
      }
    });
  };

  const removeItemFromCart = (itemId: string) => {
    setFoodItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      updateTotalPrice(updatedItems);
      return updatedItems;
    });
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
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

  return {
    foodItems,
    totalPrice,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
  };
};
