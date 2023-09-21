/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const {
  isTextValid,
} = require("../../../utils/helpers/api/simpleIssueValidator");
const componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Contact object is valid .
 */

function isValidConfirmRegistration(req, res, next) {
  try {
    const { confirmRegistration } = req.body;

    // check picture
    const isChapterText = isTextValid(
      confirmRegistration.chapterText,
      componentConfig.congrats.confirmRegistration.chapterText.minLength,
      componentConfig.congrats.confirmRegistration.chapterText.maxLength
    );

    if (req.method === "PUT") {
      if (!isChapterText) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    next();
  } catch (err) {
    //console.log(err);
    return res.status(406).json({ message: "-Помилка валідації даних" });
  }
}

module.exports = {
  isValidConfirmRegistration,
};
