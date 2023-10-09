/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const ViewClass = require("./heroes/view.dto");
const TitleClass = require("./heroes/title.dto");
const SubtitleClass = require("./heroes/subtitle.dto");
const PictureClass = require("./common/picture.dto");

class FundDTO {
  constructor(fund) {
    this.picture = new PictureClass(fund.picture.mime_type, fund.picture.image);
    this.id = fund._id;
  }
}

module.exports = FundDTO;
