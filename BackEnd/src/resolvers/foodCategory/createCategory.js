import { FoodCategory } from '../../models/food.category.schema.js';

export const createCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const existingCategory = await FoodCategory.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).send({
        message: 'Category already exists',
      });
    }

    const newCategory = await FoodCategory.create({
      categoryName,
    });

    res.status(201).send({
      message: 'Food category added successfully',
      FoodCategory: newCategory,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error creating food category',
      error: error.message,
    });
  }
};
