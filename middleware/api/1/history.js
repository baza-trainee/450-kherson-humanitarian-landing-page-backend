/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const { isImageValid, isTextValid  } = require("../../../utils/helpers/api/simpleIssueValidator");
const  componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Hero object is valid .
 */

function isValidHistory(req, res, next) {
  try {
    const { picture, title, text } = req.body;

    // check picture
    const isPucture = isImageValid(picture, componentConfig.history.picture.maxSizeKb);
    // check title
    const isTitle = isTextValid(title, componentConfig.history.title.minLength, componentConfig.history.title.maxLength);
    // check text
    const isText = isTextValid(text, componentConfig.history.text.minLength, componentConfig.history.text.maxLength);
    
    if (req.method === 'PUT') {
      if (!( isPucture && isTitle && isText )) {
        return res.status(406).json({message: "Помилка валідації даних"})
      }
    }
    next();
  } catch (err) {
    return res.status(406).json({message: "Помилка валідації даних"})
  }
}

module.exports = {
  isValidHistory
};
