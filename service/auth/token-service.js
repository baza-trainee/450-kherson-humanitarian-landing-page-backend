/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

const jwt = require("jsonwebtoken");
const cfgToken = ({ accessToken, refreshToken } = require("../../config/auth"));
const tokenModel = require("../../models/api/auth/token");

/**
 * Generator bearer tokens
 */

function generateTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: cfgToken.accessToken.expiresTime,
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: cfgToken.refreshToken.expiresTime,
  });

  return { accessToken, refreshToken };
}

async function saveToken(refreshToken) {
  const tokenData = await tokenModel.findOne({});
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return await tokenData.save();
  }
  const token = await tokenModel.create({ refreshToken });
  return token;
}

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

module.exports = { createAdminInDB, generateTokens, saveToken };
