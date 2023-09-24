/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

/**
 * Generates a unique image file name
 */

function generateUniqueImageFileName(extension = "jpg") {
  const timestamp = new Date().getTime();
  const randomString = crypto.randomBytes(4).toString("hex");
  const uniqueFileName = `${timestamp}-${randomString}${extension}`;
  return uniqueFileName;
}

module.exports = {
  generateUniqueImageFileName,
};
