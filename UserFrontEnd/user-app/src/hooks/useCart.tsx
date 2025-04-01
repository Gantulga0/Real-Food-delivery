import { useEffect, useState } from 'react';
import { FoodItem } from '@/types/card';

interface CartData {
  items: FoodItem[];
  totalPrice: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartData>(() => {
    if (typeof window === 'undefined') {
      return { items: [], totalPrice: 0 };
    }

    try {
      const cartData = localStorage.getItem('cart');
      return cartData ? JSON.parse(cartData) : { items: [], totalPrice: 0 };
    } catch (error) {
      console.error('Failed to parse cart data', error);
      return { items: [], totalPrice: 0 };
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const updateCart = (items: FoodItem[]) => {
    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setCart({ items, totalPrice });
  };

  const addItemToCart = (food: FoodItem, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.foodId === food.foodId
      );

      const updatedItems = existingItem
        ? prevCart.items.map((item) =>
            item.foodId === food.foodId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prevCart.items, { ...food, quantity }];

      return {
        items: updatedItems,
        totalPrice: updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      };
    });
  };

  const removeItemFromCart = (itemId: string) => {
    updateCart(cart.items.filter((item) => item.id !== itemId));
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    updateCart(
      cart.items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return {
    foodItems: cart.items,
    totalPrice: cart.totalPrice,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
  };
};
