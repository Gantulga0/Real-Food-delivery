import { FoodCategory } from '../../models/food.category.schema.js';

export const deleteCategory = async (categoryId) => {
  try {
    const result = await FoodCategory.deleteOne({ _id: categoryId });
    if (result.deletedCount === 0) {
      console.log('Category not found');
    } else {
      console.log('Category deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};
