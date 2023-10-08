/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const appConfig = require("../../../../../config/app");

class PictureDTO {
  constructor(mime_type, image) {
    this.mime_type = mime_type;
    this.image = `${appConfig.publicResources.pictures.route}/${image}`;
  }
}

module.exports = PictureDTO;
