import { FoodOrder } from '../../models/food.order.schema.js';

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required to update the order' });
  }

  try {
    const updatedOrder = await FoodOrder.findByIdAndUpdate(
      orderId,
      { status }, 
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: `Order with ID ${orderId} not found` });
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      message: 'Error updating order status',
      error: error.message,
    });
  }
};
