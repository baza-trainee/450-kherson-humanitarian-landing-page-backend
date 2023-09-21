/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const {
  isReportValid,
} = require("../../../../utils/helpers/api/simpleIssueValidator");
const componentConfig = require("../../../../config/api/v1/components");

/**
 * Check if Contact object is valid .
 */

function isValidDocumentReporting(req, res, next) {
  try {
    const { file } = req.body;

    // check picture
    const isDocument = isReportValid(
      file,
      componentConfig.documents.reporting.maxSizeMb
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
  isValidDocumentReporting,
};
