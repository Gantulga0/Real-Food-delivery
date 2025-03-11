import { FoodCategory } from "../../models/food.category.schema.js";

export const updateCategory = async (categoryId, updateData) => {
  try {
    const updatedCategory = await FoodCategory.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true }
    );

    if (!updatedCategory) {
      console.log('Category not found');
    } else {
      console.log('Category updated successfully', updatedCategory);
    }
  } catch (error) {
    console.error('Error updating category:', error);
  }
};
