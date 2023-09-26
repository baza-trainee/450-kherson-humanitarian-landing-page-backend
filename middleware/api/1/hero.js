/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const {
  isIdValid,
  isImageValid,
  isColorValid,
  isTextValid,
} = require("../../../utils/helpers/api/simpleIssueValidator");
const appConfig = require("../../../config/app");
const componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Hero object is valid .
 */

function isValidHero(req, res, next) {
  try {
    const { View, Title, Subtitle } = req.body;

    const id = req.body.id ? req.body.id : req.params.id;

    // check id
    const isId = isIdValid(id);
    // check View
    const isView =
      View &&
      isImageValid(
        View.picture,
        componentConfig.hero.View.picture.maxSizeKb,
        appConfig.publicResources.pictures.directory,
        appConfig.publicResources.pictures.route
      ) &&
      isColorValid(View.bgColorStart) &&
      isColorValid(View.bgColorEnd);

    // check Title
    const isTitle =
      Title &&
      isTextValid(
        Title.text,
        componentConfig.hero.title.text.minLength,
        componentConfig.hero.title.text.maxLength
      ) &&
      isColorValid(Title.colorStart) &&
      isColorValid(Title.colorMiddle) &&
      isColorValid(Title.colorEnd);

    // check Subtitle
    const isSubtitle =
      Subtitle &&
      isTextValid(
        Subtitle.text,
        componentConfig.hero.subtitle.text.minLength,
        componentConfig.hero.subtitle.text.maxLength
      ) &&
      isColorValid(Subtitle.colorStart) &&
      isColorValid(Subtitle.colorMiddle) &&
      isColorValid(Subtitle.colorEnd);

    if (req.method === "DELETE" || req.method === "GET") {
      if (!isId) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    if (req.method === "POST") {
      if (!(isView && isTitle && isSubtitle)) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    if (req.method === "PUT") {
      if (!(isId && isView && isTitle && isSubtitle)) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(406).json({ message: "-Помилка валідації даних" });
  }
}

module.exports = {
  isValidHero,
};
