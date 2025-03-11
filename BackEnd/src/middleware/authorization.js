import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authorizationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenData;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
