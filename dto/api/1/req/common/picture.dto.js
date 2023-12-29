/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const appConfig = require("../../../../../config/app");

class PictureDTO {
  constructor(mime_type, image) {
    if (image && image !== "") {
      this.mime_type = mime_type;
      this.image = `${appConfig.publicResources.pictures.route}/${image}`;
    } else {
      this.mime_type = "";
      this.image = "";
    }
  }
}

module.exports = PictureDTO;
