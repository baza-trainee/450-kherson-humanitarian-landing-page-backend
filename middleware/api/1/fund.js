/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const {
  isImageContentValid,
} = require("../../../utils/helpers/api/simpleIssueValidator");
const componentConfig = require("../../../config/api/v1/components");
const appConfig = require("../../../config/app");

/**
 * Check if Hero object is valid .
 */

function isValidFund(req, res, next) {
  try {
    const { picture } = req.body;
    // check picture
    const isPicture = isImageContentValid(
      picture,
      componentConfig.fund.picture.maxSizeKb
    );
    if (req.method === "PUT") {
      if (!isPicture) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: "Помилка на боці серверу" });
  }
}

module.exports = {
  isValidFund,
};
