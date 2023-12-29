/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");

const Achievements = new Schema({
  issuedHumanitarianKits: { type: Number },
  receivedHumanitarianAid: { type: Number },
  sumDonats: { type: Number },
  infoAtDate: { type: String },
});

module.exports = model("Achievements", Achievements);
