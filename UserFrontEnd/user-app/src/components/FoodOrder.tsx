import { useState } from 'react';
import {
  ShoppingCart,
  X,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from '@/components/ui/badge';
import { CartItem } from './CartItem';
import { Food } from '@/types/food';
import { FoodItem } from '@/types/card';
import { format } from 'date-fns';

interface OrderDetailProps {
  viewMode: 'card' | 'order';
  foodItems: FoodItem[];
  foods: Food[];
  totalPrice: number;
  loading: boolean;
  orderStatus?: 'PENDING' | 'CANCELLED' | 'DELIVERED';
  orderDate?: Date;
  onSetViewMode: (mode: 'card' | 'order') => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onPlaceOrder: () => void;
  onClose: () => void;
}

export const OrderDetail = ({
  viewMode = 'card',
  foodItems = [],
  foods = [],
  totalPrice = 0,
  loading = false,
  orderStatus = 'PENDING',
  orderDate = new Date(),
  onSetViewMode,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onClose,
}: OrderDetailProps) => {
  const handleSetViewMode =
    onSetViewMode || ((mode) => console.log(`View mode set to ${mode}`));
  const handleUpdateQuantity =
    onUpdateQuantity ||
    ((id, qty) => console.log(`Update quantity ${id} to ${qty}`));
  const handleRemoveItem =
    onRemoveItem || ((id) => console.log(`Remove item ${id}`));
  const handlePlaceOrder = onPlaceOrder || (() => console.log('Place order'));
  const handleClose = onClose || (() => console.log('Close'));

  const getStatusDisplay = () => {
    switch (orderStatus) {
      case 'PENDING':
        return {
          icon: <Clock className="text-yellow-500" />,
          text: 'Pending',
          color: 'bg-yellow-100 text-yellow-800',
        };
      case 'DELIVERED':
        return {
          icon: <CheckCircle className="text-green-500" />,
          text: 'Delivered',
          color: 'bg-green-100 text-green-800',
        };
      case 'CANCELLED':
        return {
          icon: <XCircle className="text-red-500" />,
          text: 'Cancelled',
          color: 'bg-red-100 text-red-800',
        };
      default:
        return {
          icon: <Clock className="text-gray-500" />,
          text: 'Unknown',
          color: 'bg-gray-100 text-gray-800',
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="w-[535px] h-screen bg-neutral-700 right-0 top-0 fixed flex flex-col justify-start p-10 overflow-y-auto rounded-l-3xl">
      <div className="flex items-center gap-2">
        <ShoppingCart className="text-white" />
        <h4 className="text-sm text-white ">Order Detail</h4>
        <Button
          onClick={handleClose}
          className="ml-auto bg-white text-red-500 border border-red-500 rounded-full h-12 hover:bg-red-200"
        >
          <X size={18} />
        </Button>
      </div>

      <div className="flex gap-1 mt-6 bg-white p-1 rounded-full">
        <Badge
          className={`text-xl px-3 rounded-full cursor-pointer h-9 w-[220px] flex justify-center ${
            viewMode === 'card'
              ? 'bg-red-500 text-white'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          onClick={() => handleSetViewMode('card')}
        >
          Card
        </Badge>
        <Badge
          className={`text-xl px-3 rounded-full cursor-pointer h-9 w-[220px] flex justify-center ${
            viewMode === 'order'
              ? 'bg-red-500 text-white'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          onClick={() => handleSetViewMode('order')}
        >
          Order
        </Badge>
      </div>

      {viewMode === 'card' ? (
        <div className="mt-6 gap-4 bg-white rounded-2xl p-4">
          <p className="text-xl font-semibold ">My cart</p>
          {foodItems.map((item) => {
            const food = foods.find((f) => f._id === item.foodId);
            return (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {statusDisplay.icon}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusDisplay.color}`}
              >
                {statusDisplay.text}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span>{format(orderDate, 'MMM dd, yyyy h:mm a')}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Order Items</h3>
            {foodItems.map((item) => {
              const food = foods.find((f) => f._id === item.foodId);
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 border-b"
                >
                  <div className="flex items-center gap-4">
                    {food?.image && (
                      <img
                        src={food.image}
                        alt={food.foodName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <h4 className="font-medium">
                        {food?.foodName || item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="font-medium">
                    ${((food?.price || item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
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
  );
};
