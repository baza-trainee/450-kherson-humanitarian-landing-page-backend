/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { existsSync } = require("node:fs");
const { Buffer } = require("node:buffer");
const { writeFile, unlink } = require("node:fs/promises");
const mimeTypes = require("../../../dictionaries/mime/pictures");
const appConfig = require("../../../config/app");

const savePicture = async (picture, mime) => {
  const controller = new AbortController();
  const { signal } = controller;

  const picFileExtension = mimeTypes.find(
    (type) => type.mimeName === mime
  ).extension;
  const buff = Buffer.from(picture, "base64");
  const fileName = generateUniqueImageFileName(picFileExtension);
  await writeFile(
    path.join(appConfig.publicResources.pictures.directory, `${fileName}`),
    buff,
    {
      signal,
    }
  );
  return fileName;
};

const deletePicture = async (picture) => {
  if (existsSync(picture)) {
    await unlink(picture, (err) => {
      if (err) {
        throw err;
      }
    });
    return true;
  }
  return false;
};

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
  savePicture,
  deletePicture,
};
