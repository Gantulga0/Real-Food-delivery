import { FoodOrder } from '../../models/food.order.schema.js';
import { Users } from '../../models/user.schema.js';

export const foodOrder = async (req, res) => {
  const { userId, foodItems, totalPrice } = req.body;

  if (!foodItems || foodItems.length === 0) {
    return res.status(400).json({ message: 'Food items are required' });
  }

  try {
    const newFoodOrder = new FoodOrder({
      user: userId,
      food_order_items: foodItems,
      total_price: totalPrice,
      status: 'PENDING',
    });

    const savedOrder = await newFoodOrder.save();
    console.log('Saved Food Order:', savedOrder);

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { $push: { orderedFoods: savedOrder._id } },
      { new: true }
    );
    console.log(userId);

    console.log('Updated User:', updatedUser);

    res.status(201).json({
      message: 'Food order created successfully',
      newFoodOrder: savedOrder,
    });
  } catch (error) {
    console.error('Error creating food order:', error);
    res.status(500).json({
      message: 'Error creating food order',
      error: error.message,
    });
  }
};
