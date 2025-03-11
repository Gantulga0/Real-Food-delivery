import { Food } from '../../models/food.schema.js';

export const getFood = async (req, res) => {
  try {
    const foods = await Food.find().populate('category');

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
