import mongoose, { Schema } from 'mongoose';

const foodCategorySchema = new mongoose.Schema(
  {
    id: { type: Schema.Types.ObjectId },
    categoryName: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
  }
);
export const FoodCategory = mongoose.model('FoodCategory', foodCategorySchema);
