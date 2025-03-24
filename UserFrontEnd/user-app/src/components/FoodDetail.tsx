import { FC } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';

interface Food {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
}

interface FoodDetailsModalProps {
  food: Food;
  onClose: () => void;
  onAddToCart: (food: Food) => void; // New prop for adding to cart
}

const FoodDetailsModal: FC<FoodDetailsModalProps> = ({
  food,
  onClose,
  onAddToCart,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl text-red-500">{food.foodName}</h2>
          <Button
            onClick={onClose}
            className="text-white bg-red-500 p-2 rounded"
          >
            Close
          </Button>
        </div>
        <div className="mt-4">
          <Image
            src={food.image}
            alt={food.foodName}
            width={400}
            height={250}
            className="object-cover rounded"
          />
        </div>
        <div className="mt-4 text-lg">
          <h3 className="text-xl text-red-500">Ingredients:</h3>
          <p>{food.ingredients}</p>
          <div className="mt-4 text-xl text-red-500">Price: ${food.price}</div>
        </div>
        {/* Add to Cart Button */}
        <div className="mt-4 flex justify-between">
          <Button
            onClick={() => onAddToCart(food)} // Call onAddToCart function when clicked
            className="w-full bg-green-500 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsModal;
