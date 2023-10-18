/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const ctrlWrapper = require("./orders/ctrlWrapper");
const updateStatusForPastDate = require("./orders/updateStatusForPastDate");

module.exports = {
  ctrlWrapper,
  updateStatusForPastDate,
};
