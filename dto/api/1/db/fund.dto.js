/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const PictureDTO = require("./common/picture.dto");

class FundDTO {
  constructor(picture) {
    this.picture = new PictureDTO(picture.mime_type, picture.image);
  }
}

module.exports = FundDTO;
