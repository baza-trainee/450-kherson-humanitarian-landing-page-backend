/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const {
  isDocumentValid,
} = require("../../../utils/helpers/api/simpleIssueValidator");
const componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Statut object is valid .
 */

function isValidFileDocument(req, res, next) {
  try {
    let isDocument = false;
    if (req.body.file && req.body.type && req.body.type !== "") {
      isDocument = isDocumentValid(req.body.file, req.body.type);
    }

    if (req.method === "PUT") {
      if (!isDocument) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    next();
  } catch (err) {
    return res.status(406).json({ message: "Помилка валідації даних" });
  }
}

module.exports = {
  isValidFileDocument,
};
