/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const PictureClass = require("./common/picture.dto");

class FundDTO {
  constructor(fund) {
    this.picture = new PictureClass(fund.picture.mime_type, fund.picture.image);
  }
}

module.exports = FundDTO;
