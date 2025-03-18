import {
  ChevronRight,
  MapPinPlusInside,
  ShoppingCart,
  User,
} from 'lucide-react';
import { Button } from '../ui/button';

export const LogedIn = () => {
  return (
    <div className="flex gap-3">
      <Button variant={'secondary'} className="rounded-3xl">
        <MapPinPlusInside className="text-red-400" />
        <p className="text-red-400">Delivery address:</p>
        <p>Add Location</p>
        <ChevronRight />
      </Button>
      <Button variant={'secondary'} className="rounded-full w-9">
        <ShoppingCart />
      </Button>
      <Button className="bg-red-600 rounded-full w-9 hover:bg-red-300">
        <User />
      </Button>
    </div>
  );
};
