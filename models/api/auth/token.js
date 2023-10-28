/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
  ipaddress: { type: String, required: true },
  browserFingerprint: { type: String, required: true },
});

module.exports = model("User", TokenSchema);
