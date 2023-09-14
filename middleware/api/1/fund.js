/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const { isImageValid } = require("../../../utils/helpers/api/simpleIssueValidator");
const  componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Hero object is valid .
 */

function isValidFund(req, res, next) {
  try {
    const { picture } = req.body;
    // check picture
    const isPucture = isImageValid(picture, componentConfig.fund.picture.maxSizeKb);

    if (req.method === 'PUT') {
      if (!( isPucture )) {
        return res.status(406).json({message: "Помилка валідації даних"})
      }
    }
    next();
  } catch (err) {
    return res.status(406).json({message: "Помилка валідації даних"})
  }
}

module.exports = {
  isValidFund
};
