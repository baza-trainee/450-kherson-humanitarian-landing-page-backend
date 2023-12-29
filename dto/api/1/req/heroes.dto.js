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
  constructor(heroes) {
    this.view = new ViewClass(heroes.view.color, heroes.view.picture);
    this.title = new TitleClass(heroes.title.text, heroes.title.color);
    this.subtitle = new SubtitleClass(
      heroes.subtitle.text,
      heroes.subtitle.color
    );
    this.id = heroes._id;
  }
}

module.exports = HeroesDTO;
