/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");
const Title = require("./Hero/Title");
const View = require("./Hero/View");

const Hero = new Schema({
  view: View,
  title: Title,
  subtitle: Title,
});

module.exports = model("Hero", Hero);
