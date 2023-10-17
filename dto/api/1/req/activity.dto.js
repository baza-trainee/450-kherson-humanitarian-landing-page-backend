/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const PictureDTO = require("./common/picture.dto");

class ActivityDTO {
  constructor(id, picture) {
    this.picture = new PictureDTO(picture.mime_type, picture.image);
    this.id = id;
  }
}

module.exports = ActivityDTO;
