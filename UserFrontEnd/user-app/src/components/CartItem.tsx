import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import { Minus, Plus, X } from 'lucide-react';
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
interface CartItemProps {
  item: FoodItem;
  food?: Food;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export const CartItem = ({
  item,
  food,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemProps) => (
  <Card className="cursor-pointer p-3 flex flex-col mb-4 border-0 shadow-none">
    <CardHeader className="p-0 relative">
      <div className="flex gap-4">
        {food?.image && (
          <Image
            src={food.image}
            alt={item.name}
            width={124}
            height={124}
            className="object-cover rounded-xl"
          />
        )}
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="text-xl text-red-500">{item.name}</div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onRemoveItem(item.id)}
              className="rounded-full h-10 bg-white border-red-500 border hover:bg-red-200"
            >
              <X size={10} className="text-red-500 " />
            </Button>
          </div>
          <div className="text-lg">{food?.ingredients}</div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="sm"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="bg-white hover:bg-gray-200"
              >
                <Minus size={16} className="text-black shadow-none" />
              </Button>
              <span className="mx-2">{item.quantity}</span>
              <Button
                size="sm"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="bg-white hover:bg-gray-200"
              >
                <Plus size={16} className="text-black shadow-none" />
              </Button>
            </div>
            <div className="text-lg font-semibold mr-4">
              Total: ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardFooter className="flex justify-end p-0 mt-2"></CardFooter>
  </Card>
);
