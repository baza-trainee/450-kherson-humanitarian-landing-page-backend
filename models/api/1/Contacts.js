/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");

const Contacts = new Schema({
  email: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = model("Contacts", Contacts);
