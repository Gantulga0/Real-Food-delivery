export interface FoodItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    foodId: string;
  }
  
  export interface Cart {
    foodItems: FoodItem[];
    totalPrice: number;
  }
  