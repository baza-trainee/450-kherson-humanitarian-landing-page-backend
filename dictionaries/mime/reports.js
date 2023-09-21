/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const mimeDocuments = require("./documents");

module.exports = [
  {
    mimeName: "application/vnd.ms-excel",
    extension: ".xls",
  },
  {
    mimeName:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extension: ".xlsx",
  },
].concat(mimeDocuments);
