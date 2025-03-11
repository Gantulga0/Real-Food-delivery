import bcrypt from 'bcrypt';
import { Users } from '../../models/user.schema.js';

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      email,
      password: hashedPassword,
    });

    res.send({ message: 'User added successfully', user: newUser });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error creating user', error: error.message });
  }
};
