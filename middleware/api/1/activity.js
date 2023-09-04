/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const { isIdValid, isImageValid, isColorValid, isTextValid } = require("../../../utils/helpers/api/simpleIssueValidator");
const  componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Hero object is valid .
 */

function isValidActivity(req, res, next) {
  try {
    const { View } = req.body;

    // check id
    const isId = isIdValid(id);


    if ((req.method === 'DELETE') || (req.method === 'GET')) {
      if( ! isId ) {
        return res.status(406).json({message: "Помилка валідації даних"})
      }
    }
    if (req.method === 'PUT') {
      if (!( isId && isView && isTitle && isSubtitle)) {
        return res.status(406).json({message: "Помилка валідації даних"})
      }
    }
    next();
  } catch (err) {
    return res.status(406).json({message: "-Помилка валідації даних"})
  }
}

module.exports = {
  isValidActivity
};
