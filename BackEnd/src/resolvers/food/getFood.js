import { Food } from '../../models/food.schema.js';

export const getFood = async (req, res) => {
  try {
    const { categoryId } = req.query; // Extract categoryId from query params

    // If a categoryId is provided, filter foods by that category
    const query = categoryId ? { category: categoryId } : {}; // Filter only if categoryId is provided

    // Fetch foods based on the query
    const foods = await Food.find(query).populate('category'); // Populate the category field

    if (!foods || foods.length === 0) {
      return res.status(404).send({ message: 'No foods found' });
    }

    res.send({ message: 'Foods retrieved successfully', foods });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error retrieving foods', error: error.message });
  }
};
