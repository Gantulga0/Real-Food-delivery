import { FoodItem } from './card';

export interface Order {
  userId: string;
  foodItems: FoodItem[];
  totalPrice: number;
  createdAt: string;
  status: 'pending' | 'completed' | 'cancelled';
}
