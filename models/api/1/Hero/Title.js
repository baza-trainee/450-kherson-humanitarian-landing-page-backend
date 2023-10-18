/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");

const Title = new Schema({
  text: { type: String, required: true },
  color: { type: String, required: true },
});

module.exports = Title;
