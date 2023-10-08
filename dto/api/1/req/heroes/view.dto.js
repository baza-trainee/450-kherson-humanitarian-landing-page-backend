/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const PictureDTO = require("../common/picture.dto");

class ViewDTO {
  constructor(color, picture = null) {
    if (picture) {
      this.picture = new PictureDTO(picture.mime_type, picture.image);
    }
    this.color = color;
  }
}

module.exports = ViewDTO;
