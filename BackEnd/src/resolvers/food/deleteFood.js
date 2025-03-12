import { Food } from '../../models/food.schema.js';

export const deleteFood = async (req, res) => {
  const { foodId } = req.params;

  try {
    const deletedFood = await Food.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return res.status(404).send({ message: 'Food not found' });
    }

    res.send({ message: 'Food deleted successfully', Food: deletedFood });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting food', error: error.message });
  }
};
  