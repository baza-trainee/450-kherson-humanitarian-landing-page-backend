/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

class PictureDTO {
  constructor(mime_type, image) {
    this.mime_type = mime_type;
    this.image = image;
  }
}

module.exports = PictureDTO;
