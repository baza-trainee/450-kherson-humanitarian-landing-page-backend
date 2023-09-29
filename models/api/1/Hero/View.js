/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");
const Picture = require("../Common/Picture");

const View = new Schema({
  picture: { type: Picture, required: true },
  color: { type: String, required: true },
});

module.exports = View;
