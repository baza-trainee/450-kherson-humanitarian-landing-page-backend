/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const {
  isIdValid,
  isImageContentValid,
} = require("../../../utils/helpers/api/simpleIssueValidator");
const appConfig = require("../../../config/app");
const componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Activity object is valid .
 */

function isValidActivity(req, res, next) {
  try {
    const { picture } = req.body;

    const id = req.body.id ? req.body.id : req.params.id;

    // check id
    const isId = isIdValid(id);
    // check picture
    const isPicture = isImageContentValid(
      picture,
      componentConfig.activity.picture.maxSizeKb
    );

    if (req.method === "DELETE" || req.method === "GET") {
      if (!isId) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    if (req.method === "POST") {
      if (!isPicture) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    if (req.method === "PUT") {
      if (!(isId && isPicture)) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    next();
  } catch (err) {
    return res.status(406).json({ message: "Помилка валідації даних" });
  }
}

module.exports = {
  isValidActivity,
};
