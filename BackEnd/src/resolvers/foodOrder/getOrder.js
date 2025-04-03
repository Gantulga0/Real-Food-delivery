import { FoodOrder } from '../../models/food.order.schema.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json({
      message: 'All orders retrieved successfully',
      orders,
    });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({
      message: 'Error fetching orders',
      error: error.message,
    });
  }
};

export const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const userOrders = await FoodOrder.find({ user: userId });

    if (!userOrders || userOrders.length === 0) {
      return res
        .status(404)
        .json({ message: `No orders found for user with ID ${userId}` });
    }

    res.status(200).json({
      message: `Orders retrieved for user with ID ${userId}`,
      userOrders,
    });
  } catch (error) {
    console.error('Error fetching orders by user ID:', userId);
    res.status(500).json({
      message: 'Error fetching orders',
      error: error.message,
    });
  }
};
