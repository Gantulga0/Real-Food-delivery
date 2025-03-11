import { Food } from '../../models/food.schema.js';

export const createFood = async (req, res) => {
  const { foodName, price, ingredients, category } = req.body;

  try {
    const newFood = await Food.create({
      foodName,
      price,
      ingredients,
      category,
    });

    res.send({ message: 'Food added successfully', Food: newFood });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error creating food', error: error.message });
  }
};
