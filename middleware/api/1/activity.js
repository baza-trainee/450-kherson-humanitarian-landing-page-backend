/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const { isImageValid } = require("../../../utils/helpers/api/simpleIssueValidator");
const  componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Activity object is valid .
 */

function isValidActivity(req, res, next) {
  console.log(req.method);
  try {
    const { picture } = req.body;

    // check id
    const isId = isIdValid(id);
    // check picture
    const isPicture = isImageValid(View.picture, componentConfig.hero.View.picture.maxSizeKb);


    if ((req.method === 'DELETE') || (req.method === 'GET')) {
      if( ! isId ) {
        return res.status(406).json({message: "Помилка валідації даних"})
      }
    }
    if (req.method === 'POST') {
      if (!( isView && isTitle && isSubtitle)) {
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
