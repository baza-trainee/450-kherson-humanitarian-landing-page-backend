/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

const path = require("path");
const crypto = require("crypto");
const { readdir } = require("node:fs/promises");

const { existsSync } = require("node:fs");
const { Buffer } = require("node:buffer");
const { writeFile, unlink } = require("node:fs/promises");
const mimeTypes = require("../../../dictionaries/mime/documents");
const appConfig = require("../../../config/app");

const readDirectory = async (path) => {
  return await readdir(path);
};

const saveDocument = async (fileName, document, mime) => {
  const controller = new AbortController();
  const { signal } = controller;
  const docFileExtension = mimeTypes.find(
    (type) => type.mimeName === mime
  ).extension;
  const fullFileName = `${fileName}${docFileExtension}`;
  const buff = Buffer.from(document, "base64");

  await writeFile(
    path.join(appConfig.publicResources.documents.directory, `${fullFileName}`),
    buff,
    {
      signal,
    }
  );
  return fullFileName;
};

const deleteDocument = async (document) => {
  if (existsSync(document)) {
    await unlink(document, (err) => {
      if (err) {
        throw err;
      }
    });
    return true;
  }
  return false;
};

module.exports = {
  saveDocument,
  deleteDocument,
  readDirectory,
};
