import { ShoppingCart, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from '@/components/ui/badge';
import { CartItem } from './CartItem';
import { Food } from '@/types/food';
import { FoodItem } from '@/types/card';

interface OrderDetailProps {
  viewMode: 'card' | 'order';
  foodItems: FoodItem[];
  foods: Food[];
  totalPrice: number;
  loading: boolean;
  onSetViewMode: (mode: 'card' | 'order') => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onPlaceOrder: () => void;
  onClose: () => void;
}

export const OrderDetail = ({
  viewMode,
  foodItems,
  foods,
  totalPrice,
  loading,
  onSetViewMode,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onClose,
}: OrderDetailProps) => (
  <div className="w-[826px] h-screen bg-white right-0 top-0 fixed flex flex-col justify-start p-10 overflow-y-auto">
    {/* Header */}
    <div className="flex items-center gap-2">
      <ShoppingCart />
      <h4 className="text-sm">Order Detail</h4>
      <Button
        onClick={onClose}
        className="ml-auto bg-white text-red-500 border border-red-500 rounded-full h-12 hover:bg-red-200"
      >
        <X size={18} />
      </Button>
    </div>

    {/* View Mode Toggles */}
    <div className="flex gap-4 mt-6">
      <Badge
        className={`text-xl px-3 rounded-full cursor-pointer h-9 ${
          viewMode === 'card' ? 'bg-red-500 text-white' : ''
        }`}
        onClick={() => onSetViewMode('card')}
      >
        Card
      </Badge>
      <Badge
        className={`text-xl px-3 rounded-full cursor-pointer h-9 bg-white text-black hover:bg-gray-200${
          viewMode === 'order' ? 'bg-red-500 text-white' : ''
        }`}
        onClick={() => onSetViewMode('order')}
      >
        Order
      </Badge>
    </div>

    {/* Content */}
    <div className="text-2xl font-bold mt-4">
      {viewMode === 'card' ? 'My Cart' : 'Order Details'}
    </div>

    {viewMode === 'card' ? (
      <div className="mt-6 gap-4">
        {foodItems.map((item) => {
          const food = foods.find((f) => f._id === item.foodId);
          return (
            <CartItem
              key={item.id}
              item={item}
              food={food}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          );
        })}
      </div>
    ) : (
      <div className="mt-6 space-y-4">{/* Order view content */}</div>
    )}

    {/* Footer */}
    <div className="mt-auto border-t pt-4">
      <div className="flex justify-between text-xl font-bold">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <Button
        onClick={onPlaceOrder}
        className="mt-6 w-full bg-red-500"
        disabled={foodItems.length === 0 || loading}
      >
        {loading ? 'Processing...' : 'Place Order'}
      </Button>
    </div>
  </div>
);
