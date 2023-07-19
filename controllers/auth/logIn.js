const { User } = require('../../models/user');
const { ctrlWrapper } = require('../../middlewares');
const { HttpError } = require('../../helpers');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'email or password is invalid');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'email or password is invalid');
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};

module.exports = {
  logIn: ctrlWrapper(logIn),
};
