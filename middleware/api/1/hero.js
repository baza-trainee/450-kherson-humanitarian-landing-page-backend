/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const {
  isIdValid,
  isImageValid,
  isFrontColorValid,
  isTextValid,
} = require("../../../utils/helpers/api/simpleIssueValidator");
const appConfig = require("../../../config/app");
const componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Hero object is valid .
 */

function isValidHero(req, res, next) {
  try {
    const { view, title, subtitle } = req.body;

    const id = req.body.id ? req.body.id : req.params.id;

    // check id
    const isId = isIdValid(id);
    // check View
    const isViewWithPicture =
      view &&
      isImageValid(
        view.picture,
        componentConfig.hero.View.picture.maxSizeKb,
        appConfig.publicResources.pictures.directory,
        appConfig.publicResources.pictures.route
      ) &&
      isFrontColorValid(view.color);

    const isViewCanBeWithoutPicture =
      view &&
      (!view.picture ||
        isImageValid(
          view.picture,
          componentConfig.hero.View.picture.maxSizeKb,
          appConfig.publicResources.pictures.directory,
          appConfig.publicResources.pictures.route
        )) &&
      isFrontColorValid(view.color);

    // check Title
    const isTitle =
      title &&
      isTextValid(
        title.text,
        componentConfig.hero.title.text.minLength,
        componentConfig.hero.title.text.maxLength
      ) &&
      isFrontColorValid(title.color);

    // check Subtitle
    const isSubtitle =
      subtitle &&
      isTextValid(
        subtitle.text,
        componentConfig.hero.subtitle.text.minLength,
        componentConfig.hero.subtitle.text.maxLength
      ) &&
      isFrontColorValid(subtitle.color);

    if (req.method === "DELETE" || req.method === "GET") {
      if (!isId) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    if (req.method === "POST") {
      if (!(isViewWithPicture && isTitle && isSubtitle)) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    if (req.method === "PUT") {
      if (!(isId && isViewCanBeWithoutPicture && isTitle && isSubtitle)) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Помилка на боці серверу" });
  }
}

module.exports = {
  isValidHero,
};
