import mongoose, { Schema } from 'mongoose';

const foodOrderItemSchema = new mongoose.Schema({
  food: {
    type: Schema.Types.ObjectId,
    ref: 'Food',
    require: true,
  },
  quantity: Number,
});

const foodOrderSchema = new mongoose.Schema(
  {
    id: { type: Schema.Types.ObjectId },
    user: String,
    total_price: Number,
    food_order_items: [foodOrderItemSchema],
    status: { enum: ['PENDING', 'CANCELLED', 'DELIVERED'] },
  },
  {
    timestamps: true,
  }
);
export const FoodOrder = mongoose.model('FoodOrder', foodOrderSchema);
