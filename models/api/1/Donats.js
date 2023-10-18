const { Schema, model } = require("mongoose");

/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

const Donats = new Schema({
  currency: { type: String, required: true },
  recipient: { type: String, required: true },
  IBAN: { type: String, required: true },
  IPN: { type: String, required: true },
  paymentPurpose: { type: String, required: true },
});

module.exports = model("Donats", Donats);
