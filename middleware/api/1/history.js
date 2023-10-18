/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const {
  isImageValid,
  isTextValid,
} = require("../../../utils/helpers/api/simpleIssueValidator");
const appConfig = require("../../../config/app");
const componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Hero object is valid .
 */

function isValidHistory(req, res, next) {
  try {
    const { picture, title, text } = req.body;

    // check picture
    const isPicture =
      !picture ||
      isImageValid(
        picture,
        componentConfig.history.picture.maxSizeKb,
        appConfig.publicResources.pictures.directory,
        appConfig.publicResources.pictures.route
      );
    // check title
    const isTitle = isTextValid(
      title,
      componentConfig.history.title.minLength,
      componentConfig.history.title.maxLength
    );
    // check text
    const isText = isTextValid(
      text,
      componentConfig.history.text.minLength,
      componentConfig.history.text.maxLength
    );

    if (req.method === "PUT") {
      if (!(isPicture && isTitle && isText)) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: "Помилка на боці серверу" });
  }
}

module.exports = {
  isValidHistory,
};
