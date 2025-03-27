import { Badge } from '@/components/ui/badge';

interface Category {
  categoryName: string;
  _id: string;
}

interface CategoryBadgesProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryClick: (categoryId: string) => void;
}

export const CategoryBadges = ({
  categories,
  selectedCategory,
  onCategoryClick,
}: CategoryBadgesProps) => (
  <ul className="text-black flex gap-10 mt-9 max-w-[1800px] overflow-auto mb-9">
    {categories.map((category) => (
      <Badge
        key={category._id}
        variant={selectedCategory === category._id ? 'outline' : 'secondary'}
        className={`text-xl px-3 rounded-full cursor-pointer h-9 ${
          selectedCategory === category._id ? 'bg-red-500 text-white' : ''
        }`}
        onClick={() => onCategoryClick(category._id)}
      >
        {category.categoryName}
      </Badge>
    ))}
  </ul>
);
