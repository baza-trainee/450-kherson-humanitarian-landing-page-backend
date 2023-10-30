/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const User = require("../models/auth/User");
const jwt = require("jsonwebtoken");
const authConf = require("../config/auth");

/**
 * Check if token is valid .
 */

async function hasValidTocken(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const user = await User.findOne({});
    if (!user) {
      return res.status(403).json({ message: "Користувач не авторизований" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (
      !token ||
      user.lastToken !== token ||
      user.userData.ip !== req.headers.host ||
      user.userData.browser !== req.headers["user-agent"]
    ) {
      return res.status(403).json({ message: "Користувач не авторизований" });
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedData;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Користувач не авторизований" });
  }
}

/**
 * Check if username corresponds conditions
 */

function isLoginCorrespondsConditions(req, res, next) {
  const username = req.body.username;
  const pattern = `[a-zA-Z]{${authConf.username.minChars},${authConf.username.maxChars}}`;
  const usernamePattern = new RegExp(pattern);
  if (!usernamePattern.test(username)) {
    return res
      .status(406)
      .json({ message: "Ім'я користувача не відповідає вимогам" });
  }
  next();
}

/**
 * Check if password corresponds conditions
 */

function isPasswordCorrespondsConditions(req, res, next) {
  const password = req.body.password;
  // Define regular expressions for validation
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSymbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(password);
  const hasNumbers = /[0-9]/.test(password);

  // Check if all conditions are met
  //if (((password.length >= authConf.password.minChars) && (password.length <= authConf.password.maxChars)) && hasUpperCase && hasLowerCase && hasSymbols && hasNumbers) {
  if (
    password.length >= authConf.password.minChars &&
    password.length <= authConf.password.maxChars &&
    hasUpperCase &&
    hasLowerCase
  ) {
    next();
  } else {
    return res
      .status(406)
      .json({ message: "Пароль не відповідає встановленим критеріям безпеки" });
  }
}

module.exports = {
  hasValidTocken,
  isLoginCorrespondsConditions,
  isPasswordCorrespondsConditions,
};
