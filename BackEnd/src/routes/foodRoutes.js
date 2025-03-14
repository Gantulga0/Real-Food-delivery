import express from 'express';
import { createFood } from '../resolvers/food/createFood.js';
import { getFood } from '../resolvers/food/getFood.js';
import { updateFood } from '../resolvers/food/patchFood.js';
import { deleteFood } from '../resolvers/food/deleteFood.js';

export const foodRouter = express.Router();

foodRouter.post('/', createFood);
foodRouter.get('/:foodId', getFood);
foodRouter.patch('/:foodId', updateFood);
foodRouter.delete('/:foodId', deleteFood);
