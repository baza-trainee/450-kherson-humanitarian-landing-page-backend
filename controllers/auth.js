/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const User = require("../models/auth/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const mailService = require("../service/mail-service");
const uuid = require("uuid");
const { token, link } = require("../config/auth");
const { urls } = require("../config/app");

/**
 * Generator bearer tokens
 */

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: token.expiresTime,
  });
};
/**
 * Login validation
 */

const login = async (req, res, next) => {
  try {
    const responseResult = {};
    const { username, password } = req.body;
    await createAdminInDB();
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(403).json({ message: "Помилка авторизації" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(403).json({ message: "Помилка авторизації" });
    }
    responseResult.token = generateAccessToken(user._id);
    user.userData.ip = req.headers.host;
    user.userData.browser = req.headers["user-agent"];
    user.lastToken = responseResult.token;
    await user.save();
    return res.status(200).json(responseResult);
  } catch (err) {
    //console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

/**
 * Renew user's password
 */

const renewPassword = async (req, res, next) => {
  try {
    const { username } = req.body;
    await createAdminInDB();
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(200)
        .json({ message: "Посилання для відновлення паролю відправлено" });
    }
    const activationLink = uuid.v4();
    user.renewPasswordLink = activationLink;
    user.renewPasswordDate = new Date();
    user.save();
    await mailService.sendActivationMail(
      process.env.ADMIN_EMAIL,
      `${urls.APP_URL}/api/auth/renew/${activationLink}`
    );
    return res
      .status(200)
      .json({ message: "Посилання для відновлення паролю відправлено" });
  } catch (err) {
    //console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

/**
 * Generator for link for change user's password
 */

const renewPasswordLink = async (req, res, next) => {
  try {
    const responseResult = {};
    const renewPasswordLink = req.params.link;
    const user = await User.findOne({ renewPasswordLink });
    console.log(link.expiresTime);
    if (
      !user ||
      user?.renewPasswordDate.getTime() + link.expiresTime <
        new Date().getTime()
    ) {
      return res.status(400).json({ message: "Посилання не дійсне" });
    }
    responseResult.token = generateAccessToken(user._id);
    user.userData.ip = req.headers.host;
    user.userData.browser = req.headers["user-agent"];
    user.lastToken = responseResult.token;
    await user.save();
    //return res.redirect(301, "http://example.com");
    return res.status(200).json(responseResult);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

/**
 * User's password changes realisation
 */

const changePassword = async (req, res, next) => {
  try {
    const responseResult = {};
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(403).json({ message: "Користувач не авторизований" });
    }
    const { password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 7);
    user.password = hashPassword;
    await user.save();
    return res.status(200).json({ message: "Пароль користувача змінено" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

/**
 * It creates user in database if any users exists
 */

const createAdminInDB = async () => {
  const userCount = await User.where({}).countDocuments();
  if (userCount < 1) {
    const hashPassword = bcrypt.hashSync(process.env.START_PASSWORD, 7);
    const user = new User({
      username: process.env.START_LOGIN,
      password: hashPassword,
    });
    await user.save();
  }
};

module.exports = { login, renewPassword, renewPasswordLink, changePassword };
