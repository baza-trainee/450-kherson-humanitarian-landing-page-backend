/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  renewPasswordLink: { type: String },
  renewPasswordDate: { type: Date },
});

module.exports = model("User", User);
