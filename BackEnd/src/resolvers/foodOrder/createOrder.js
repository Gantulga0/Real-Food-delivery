import { FoodOrder } from '../../models/food.order.schema.js';

export const foodOrder = async (req, res) => {
  const { _id, foodItems, totalPrice } = req.body;

  if (!foodItems || foodItems.length === 0) {
    return res.status(400).json({ message: 'Food items are required' });
  }

  try {
    const newFoodOrder = new FoodOrder({
      user: _id,
      food_items: foodItems,
      total_price: totalPrice,
      status: 'PENDING',
    });

    await newFoodOrder.save();

    res.status(201).json({
      message: 'Food order created successfully',
      newFoodOrder,
    });
  } catch (error) {
    console.error('Error creating food order:', error);
    res.status(500).json({
      message: 'Error creating food order',
      error: error.message,
    });
  }
};
