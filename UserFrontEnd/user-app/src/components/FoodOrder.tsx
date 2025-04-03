import {
  ShoppingCart,
  X,
  Clock,
  CheckCircle,
  XCircle,
  ListOrdered,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from '@/components/ui/badge';
import { CartItem } from './CartItem';
import { Food } from '@/types/food';
import { FoodItem } from '@/types/card';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/auth-context';

interface OrderDetailProps {
  viewMode: 'card' | 'order';
  foodItems: FoodItem[];
  foods: Food[];
  totalPrice: number;
  loading: boolean;
  orders?: Array<{
    _id: string;
    items: FoodItem[];
    totalPrice: number;
    status: 'PENDING' | 'CANCELLED' | 'DELIVERED';
    createdAt: string;
  }>;
  onSetViewMode: (mode: 'card' | 'order') => void;
  onUpdateQuantity?: (itemId: string, newQuantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onPlaceOrder: () => void;
  onClose: () => void;
  onSelectOrder?: (orderId: string) => void;
}

export const OrderDetail = ({
  viewMode = 'card',
  foodItems = [],
  foods = [],
  totalPrice = 0,
  loading = false,
  orders = [],
  onSetViewMode,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onClose,
  onSelectOrder,
}: OrderDetailProps) => {
  const { user } = useAuth();

  const getStatusDisplay = (status: 'PENDING' | 'CANCELLED' | 'DELIVERED') => {
    switch (status) {
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

  return (
    <div className="w-[535px] h-screen bg-neutral-700 right-0 top-0 fixed flex flex-col justify-start p-10 overflow-y-auto rounded-l-3xl">
      <div className="flex items-center gap-2">
        {viewMode === 'card' ? (
          <ShoppingCart className="text-white" />
        ) : (
          <ListOrdered className="text-white" />
        )}
        <h4 className="text-sm text-white">
          {viewMode === 'card' ? 'Order Detail' : 'Order History'}
        </h4>
        <Button
          onClick={onClose}
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
          onClick={() => onSetViewMode('card')}
        >
          Cart
        </Badge>
        <Badge
          className={`text-xl px-3 rounded-full cursor-pointer h-9 w-[220px] flex justify-center ${
            viewMode === 'order'
              ? 'bg-red-500 text-white'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          onClick={() => onSetViewMode('order')}
        >
          Orders
        </Badge>
      </div>

      {viewMode === 'card' ? (
        <div className="mt-6 gap-4 bg-white rounded-2xl p-4">
          <p className="text-xl font-semibold">My cart</p>
          {foodItems.map((item) => {
            const food = foods.find((f) => f._id === item.foodId);
            return (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity || (() => {})}
                onRemoveItem={onRemoveItem || (() => {})}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold text-lg text-white">Order History</h3>
          {orders.length === 0 ? (
            <div className="text-white p-4 text-center">No orders found</div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {orders.map((order) => {
                const statusDisplay = getStatusDisplay(order.status);
                return (
                  <div
                    key={order._id}
                    className="p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onSelectOrder?.(order._id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {statusDisplay.icon}
                        <span className="font-medium">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-bold">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>
                        {format(
                          new Date(order.createdAt),
                          'MMM dd, yyyy h:mm a'
                        )}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${statusDisplay.color}`}
                      >
                        {statusDisplay.text}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      {order.items.length} item
                      {order.items.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {viewMode === 'card' && (
        <div className="mt-auto border-t border-gray-600 pt-4">
          <div className="flex justify-between text-xl font-bold text-white">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Button
            onClick={onPlaceOrder}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white"
            disabled={foodItems.length === 0 || loading}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </Button>
        </div>
      )}
    </div>
  );
};
