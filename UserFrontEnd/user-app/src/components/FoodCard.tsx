import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
interface Food {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
}
interface FoodCardProps {
  food: Food;
  onAddToCart: (food: Food) => void;
  onOpenDetails: (food: Food) => void;
}

export const FoodCard = ({
  food,
  onAddToCart,
  onOpenDetails,
}: FoodCardProps) => (
  <Card className="w-full max-w-[400px] cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:opacity-80 p-3 flex flex-col mb-9">
    <CardHeader className="p-0 relative">
      <Image
        src={food.image}
        alt={food.foodName}
        className="object-cover rounded"
        onClick={() => onOpenDetails(food)}
        width={400}
        height={210}
        quality={100}
      />
      <Button
        className="w-11 h-11 rounded-full bg-white text-red-500 hover:bg-gray-300 absolute top-3/4 left-[310px]"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(food);
        }}
      >
        +
      </Button>
    </CardHeader>
    <CardFooter
      className="flex p-2 items-start justify-between"
      onClick={() => onOpenDetails(food)}
    >
      <div className="overflow-hidden text-ellipsis line-clamp-2 text-2xl text-foreground text-red-500 h-8">
        {food.foodName}
      </div>
      <div className="overflow-hidden text-ellipsis line-clamp-2 text-xl text-foreground h-8 flex items-center">
        ${food.price.toFixed(2)}
      </div>
    </CardFooter>
    <div className="p-2 text-sm">{food.ingredients}</div>
  </Card>
);
