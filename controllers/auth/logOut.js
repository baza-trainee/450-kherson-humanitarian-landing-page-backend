const { ctrlWrapper } = require('../../middlewares');
const { User } = require('../../models');

const logOut = async (req, res) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: '' });

  res.json({ message: 'Logout successful' });
};

module.exports = {
  logOut: ctrlWrapper(logOut),
};
