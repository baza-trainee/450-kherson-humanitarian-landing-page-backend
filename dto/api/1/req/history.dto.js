/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const PictureDTO = require("./common/picture.dto");

class HistoryDTO {
  constructor(title, text, picture = {}) {
    if (picture) {
      this.picture = new PictureDTO(picture.mime_type, picture.image);
    } else {
      this.picture = new PictureDTO("", "");
    }
    this.title = title;
    this.text = text;
  }
}

module.exports = HistoryDTO;
