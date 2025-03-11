import express from 'express';
import { createCategory } from '../resolvers/foodCategory/createCategory.js';
import {
  getAllCategory,
  getByCategory,
} from '../resolvers/foodCategory/getCategory.js';
import { deleteCategory } from '../resolvers/foodCategory/deleteCategory.js';
import { updateCategory } from '../resolvers/foodCategory/patchCategory.js';

export const foodCategoryRouter = express.Router();

foodCategoryRouter.post('/', createCategory);
foodCategoryRouter.delete('/:foodCategoryId', deleteCategory);
foodCategoryRouter.get('/', getAllCategory);
foodCategoryRouter.get('/:categoryName', getByCategory);
foodCategoryRouter.patch('/:foodCategoryId', updateCategory);
