/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");

const Title = new Schema({
  text: { type: String, required: true },
  colorStart: { type: String, required: true },
  colorMiddle: { type: String, required: true },
  colorEnd: { type: String, required: true },
});

module.exports = Title;
