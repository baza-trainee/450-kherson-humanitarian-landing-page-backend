/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");

const Picture = new Schema({
  mime_type: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = Picture;
