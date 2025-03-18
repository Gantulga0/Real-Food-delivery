import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Users } from '../../models/user.schema.js';
import dotenv from 'dotenv';
dotenv.config();

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: user.email, permissions: user.permissions, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('JWT Token generated:', token);

    res.json({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error: error.message });
  }
};
