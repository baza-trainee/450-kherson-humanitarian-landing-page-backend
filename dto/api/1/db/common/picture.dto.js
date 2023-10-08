/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

class PictureDTO {
  constructor(mime_type, image) {
    this.mime_type = mime_type;
    this.image = image;
  }
}

module.exports = PictureDTO;
