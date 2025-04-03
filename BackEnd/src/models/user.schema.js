import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    email: { type: String, required: true, unique: true },
    password: String,
    phoneNumber: String,
    address: String,
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER',
    },
    orderedFoods: {
      type: [Schema.Types.ObjectId],
      ref: 'FoodOrder',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
export const Users = mongoose.model('Users', userSchema);
