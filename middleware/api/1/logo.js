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
} = require("../../../utils/helpers/api/simpleIssueValidator");
const appConfig = require("../../../config/app");
const componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Logo object is valid .
 */

function isValidLogo(req, res, next) {
  try {
    const picture = req.body.picture;

    const id = req.body.id ? req.body.id : req.params.id;
    // check id
    const isId = isIdValid(id);
    // check picture
    const isPicture = isImageValid(
      picture,
      componentConfig.logos.pictures.maxSizeKb
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
    return res.status(500).json({ message: "Помилка на боці серверу" });
  }
}

module.exports = {
  isValidLogo,
};
