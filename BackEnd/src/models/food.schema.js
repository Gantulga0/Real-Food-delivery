import mongoose, { Schema } from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    id: { type: Schema.Types.ObjectId },
    foodName: String,
    price: Number,
    image: String,
    ingredients: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'FoodCategory',
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);
export const Food = mongoose.model('Food', foodSchema);
