/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");
const Title = require("./Hero/Title");
const View = require("./Hero/View");

const Hero = new Schema({
  View,
  Title,
  Subtitle: Title,
});

module.exports = model("Hero", Hero);
