const User = require('../models/auth/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mailService = require('../service/mail-service');
const uuid = require('uuid');
const { token } = require('../config/auth')

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: token.expiresTime()})
}

const login = async (req, res, next) => {
  try {
    const responseResult = {};
    const {username, password} = req.body;
    await createAdminInDB();
    const user = await User.findOne({username});
    if( !user ) {
      return res.status(400).json({message: 'Помилка авторизації'});
    }
    
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({message: 'Помилка авторизації'});
    }
    responseResult.token = generateAccessToken(user._id);
    return res.status(200).json(responseResult);
  } catch (err) {
    console.log(err);
    res.status(400).json({message: 'Login error'})
  }
}

const renewPassword = async (req, res, next) => {
  try {
    const {username} = req.body;
    await createAdminInDB();
    console.log(username);
    const user = await User.findOne({username});
    if( !user ) {
      return res.status(200).json({message: 'Посилання для відновлення паролю відправлено'});
    }
    const activationLink = uuid.v4();
    user.renewPasswordLink = activationLink;
    user.renewPasswordDate = new Date();
    user.save();
    await mailService.sendActivationMail(process.env.ADMIN_EMAIL, `${process.env.APP_URL}auth/renew/${activationLink}`);
    return res.status(200).json({message: 'Посилання для відновлення паролю відправлено'});
  } catch (err) {
    console.log(err);
    res.status(400).json({message: 'Login error'})
  }
}

const renewPasswordLink = async (req, res, next) => {
  try {
    const responseResult = {};
    const renewPasswordLink = req.params.link;
    const user = await User.findOne({renewPasswordLink});
    if (!user || (user?.renewPasswordDate.getTime() + 1 * 60 * 1000) < new Date().getTime()) {
      return res.status(400).json({message: 'Посилання не дійсне'});
    }
    responseResult.token = generateAccessToken(user._id);
    return res.status(200).json(responseResult);
  } catch (err) {
    res.status(400).json({message: 'Login error'});
  }
}

const changePassword = async (req, res, next) => {
  try {
    const responseResult = {};
    const renewPasswordLink = req.params.link;
    const user = await User.findOne({renewPasswordLink});
    if (!user || (user?.renewPasswordDate.getTime() + 1 * 60 * 1000) < new Date().getTime()) {
      return res.status(400).json({message: 'Посилання не дійсне'});
    }
    responseResult.token = generateAccessToken(user._id);
    return res.status(200).json(responseResult);
  } catch (err) {
    res.status(400).json({message: 'Login error'});
  }
}

const createAdminInDB = async () => {
  const userCount = await User.where({}).countDocuments();
  if(userCount < 1) {
    const hashPassword = bcrypt.hashSync(process.env.START_PASSWORD, 7);
    const user = new User({username: process.env.START_LOGIN, password: hashPassword});
    await user.save();
  }
}

module.exports = {login, renewPassword, renewPasswordLink, changePassword};