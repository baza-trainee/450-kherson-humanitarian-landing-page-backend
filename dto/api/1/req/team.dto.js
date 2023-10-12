/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const PictureDTO = require("./common/picture.dto");

class TeamDTO {
  constructor(team) {
    if (team.picture) {
      this.picture = new PictureDTO(team.picture.mime_type, team.picture.image);
    } else {
      this.picture = new PictureDTO("", "");
    }
    this.title = team.title;
    this.text = team.text;
  }
}

module.exports = TeamDTO;
