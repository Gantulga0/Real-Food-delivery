import { FC, useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';

interface Food {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  _id: string; // Ensure this is included
}

interface FoodDetailsModalProps {
  food: Food;
  onClose: () => void;
  onAddToCart: (food: Food, quantity: number) => void;
}

const FoodDetailsModal: FC<FoodDetailsModalProps> = ({
  food,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-[800px] h-[400px] flex">
        <div className="mt-4 px-4">
          <Image
            src={food.image}
            alt={food.foodName}
            width={400}
            height={364}
            className="object-cover rounded w-[400px] h-[364px]"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex justify-end">
              <Button
                onClick={onClose}
                className="text-white w-9 h-9 rounded-full mt-4"
              >
                X
              </Button>
            </div>

            <div className="flex justify-between">
              <h2 className="text-3xl text-red-500">{food.foodName}</h2>
            </div>
            <div className="mt-4 text-lg">
              <p>{food.ingredients}</p>
            </div>
          </div>
          <div>
            <div className="mt-4 flex items-center justify-between w-[350px]">
              <div className="text-lg">
                <p className="text-lg text-black">Total Price:</p>
                <p className="font-bold text-lg">
                  ${(food.price * quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center">
                <label htmlFor="quantity" className="mr-2 text-lg text-black">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-16 p-2 border rounded"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <Button
                onClick={() => onAddToCart(food, quantity)}
                className="w-full bg-black text-white mb-4"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsModal;
