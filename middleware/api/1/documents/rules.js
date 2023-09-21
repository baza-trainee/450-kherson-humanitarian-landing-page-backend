/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const {
  isDocumentValid,
} = require("../../../../utils/helpers/api/simpleIssueValidator");
const componentConfig = require("../../../../config/api/v1/components");

/**
 * Check if Contact object is valid .
 */

function isValidDocumentRules(req, res, next) {
  try {
    const { file } = req.body;

    // check picture
    const isDocument = isDocumentValid(
      file,
      componentConfig.documents.rules.maxSizeMb
    );

    if (req.method === "POST") {
      if (!isDocument) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(406).json({ message: "-Помилка валідації даних" });
  }
}

module.exports = {
  isValidDocumentRules,
};
