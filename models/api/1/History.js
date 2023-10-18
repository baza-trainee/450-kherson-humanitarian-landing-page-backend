/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");
const Picture = require("./Common/Picture");

const History = new Schema({
  picture: { type: Picture },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = model("History", History);
