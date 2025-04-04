import { Users } from '../../models/user.schema.js';

export const getUser = async (req, res) => {
  const { email } = req.user;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user.toObject();

    res.send({
      message: 'User found successfully!',
      user: userWithoutPassword,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error retrieving user', error: error.message });
  }
};
