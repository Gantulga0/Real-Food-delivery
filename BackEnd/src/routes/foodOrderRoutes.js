import express from 'express';
import { foodOrder } from '../resolvers/foodOrder/createOrder.js';
import {
  getAllOrders,
  getOrdersByUserId,
} from '../resolvers/foodOrder/getOrder.js';
import { updateOrderStatus } from '../resolvers/foodOrder/patchOrder.js';

export const foodOrderRouter = express.Router();

foodOrderRouter.post('/', foodOrder);
foodOrderRouter.get('/', getAllOrders);
foodOrderRouter.get('/:userId', getOrdersByUserId);
foodOrderRouter.patch('/:foodOrderId', updateOrderStatus);
