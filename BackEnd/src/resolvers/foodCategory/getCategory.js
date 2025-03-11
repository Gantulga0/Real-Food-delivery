import { FoodCategory } from '../../models/food.category.schema.js';
import { Food } from '../../models/food.schema.js';

export const getAllCategory = async (req, res) => {
  try {
    const categories = await FoodCategory.find();

    if (categories.length === 0) {
      return res.status(404).send({ message: 'No categories found' });
    }

    res.send({ message: 'Categories found successfully', categories });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error retrieving categories', error: error.message });
  }
};

export const getByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const category = await FoodCategory.findOne({ categoryName });

    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    const foods = await Food.find({ category: category._id });

    if (foods.length === 0) {
      return res
        .status(404)
        .send({ message: `No foods found in the ${categoryName} category` });
    }

    res.send({ message: `${categoryName} foods found successfully`, foods });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error retrieving foods', error: error.message });
  }
};
