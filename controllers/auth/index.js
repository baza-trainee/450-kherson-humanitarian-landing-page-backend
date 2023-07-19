const { register } = require('./register');
const { logIn } = require('./logIn');
const { getCurrentUser } = require('./getCurrentUser');
const { logOut } = require('./logOut');

module.exports = {
  register,
  logIn,
  getCurrentUser,
  logOut,
};
