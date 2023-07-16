const { HttpError } = require('../helpers');

const { User } = require('../models');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Invalid Bearer'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    console.log('user data from auth middlewares line 21:', user);

    if (!user) {
      next(HttpError(401, 'Invalid User'));
    }

    req.user = user;
    console.log('user data from auth middlewares line 28:', user);

    next();
  } catch {
    next(HttpError(401, 'Invalid signature'));
  }
};

module.exports = auth;
