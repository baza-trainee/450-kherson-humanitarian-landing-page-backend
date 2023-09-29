/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");

const Title = new Schema({
  text: { type: String, required: true },
  color: { type: String, required: true },
});

module.exports = Title;
