/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const ViewClass = require("./heroes/view.dto");
const TitleClass = require("./heroes/title.dto");
const SubtitleClass = require("./heroes/subtitle.dto");

class HeroesDTO {
  constructor(view, title, subtitle) {
    this.view = new ViewClass(view.color, view.picture);
    this.title = new TitleClass(title.text, title.color);
    this.subtitle = new SubtitleClass(subtitle.text, subtitle.color);
  }
}

module.exports = HeroesDTO;
