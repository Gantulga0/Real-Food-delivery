import bcrypt from 'bcrypt';
import { Users } from '../../models/user.schema.js';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: 'Invalid email format' });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).send({
      message:
        'Password must be at least 6 characters long and contain both letters and numbers.',
    });
  }

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
