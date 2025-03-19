import { Food } from '../../models/food.schema.js';

export const getFood = async (req, res) => {
  try {
    const { categoryId } = req.query;

    const query = categoryId ? { category: categoryId } : {};

    const foods = await Food.find(query).populate('category');

    res.send({ message: 'Foods retrieved successfully', foods });
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving foods', error: error.message });
  }
};
