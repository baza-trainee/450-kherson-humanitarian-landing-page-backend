/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

const { Schema, model } = require("mongoose");
const Picture = require("./Common/Picture");

const Projects = new Schema({
  // funding-await, in-process, completed
  stage: { type: String, required: true },
  videoLink: { type: String, required: true },
  subTitle: { type: String, required: true },
  text: { type: String, required: true },
  areaCompletedWorks: { type: String, required: true },
  projectDuration: { type: String, required: true },
  projectText: { type: String, required: true },
  mainPicture: Picture,
  pictures: [{ type: Picture }],
});

module.exports = model("Projects", Projects);
