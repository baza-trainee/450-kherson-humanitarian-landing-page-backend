/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const {
  isImageValid,
  isTextValid,
} = require("../../../utils/helpers/api/simpleIssueValidator");
const componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Team object is valid .
 */

function isValidTeam(req, res, next) {
  try {
    const { picture, title, text } = req.body;

    // check picture
    const isPucture = isImageValid(
      picture,
      componentConfig.team.picture.maxSizeKb
    );
    // check title
    const isTitle = isTextValid(
      title,
      componentConfig.team.title.minLength,
      componentConfig.team.title.maxLength
    );
    // check text
    const isText = isTextValid(
      text,
      componentConfig.team.text.minLength,
      componentConfig.team.text.maxLength
    );

    if (req.method === "PUT") {
      if (!(isPucture && isTitle && isText)) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    next();
  } catch (err) {
    return res.status(406).json({ message: "Помилка валідації даних" });
  }
}

module.exports = {
  isValidTeam,
};
