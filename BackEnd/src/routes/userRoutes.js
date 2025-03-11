import express from 'express';
import { createUser } from '../resolvers/users/createUser.js';
import { getUser } from '../resolvers/users/getUser.js';
import { loginUser } from '../resolvers/users/loginUser.js';
import { authorizationMiddleware } from '../middleware/authorization.js';

export const userRouter = express.Router();

userRouter.post('/sign-up', createUser);
userRouter.get('/', authorizationMiddleware, getUser);
userRouter.post('/sign-in', loginUser);
