import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRouter } from './routes/userRoutes.js';
import { foodRouter } from './routes/foodRoutes.js';
import { foodCategoryRouter } from './routes/foodCategoryRoutes.js';
import { foodOrderRouter } from './routes/foodOrderRoutes.js';

const app = express();
dotenv.config();
const port = 3000;

console.log(process.env.MONGO_CONNECTION_STRING);

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
  console.log('database connection established');
});

app.use(express.json());

app.use('/auth', userRouter);
app.use('/food', foodRouter);
app.use('/food-category', foodCategoryRouter);
app.use('/food-order', foodOrderRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
