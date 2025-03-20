import mongoose from 'mongoose';
import { Food } from '../../models/food.schema.js';

export const updateFood = async (req, res) => {
  const { _id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send({ message: 'Invalid Food ID' });
  }

  try {
    const updatedFood = await Food.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedFood) {
      return res.status(404).send({ message: 'Food not found' });
    }

    res.send({ message: 'Food updated successfully', Food: updatedFood });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error updating food', error: error.message });
  }
};
