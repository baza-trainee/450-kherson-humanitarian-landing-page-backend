/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const {
  readDirectory,
  saveDocument,
  deleteDocument,
} = require("../../../utils/helpers/api/documentProcessor");
const cfgApp = require("../../../config/app");
const DocumentsDTO = require("../../../dto/api/1/req/documents.dto");
const DocumentDTO = require("../../../dto/api/1/req/document.dto");
const {
  mapDocumentFileNameToObjectProperty,
  mapObjectPropertyToDocumentFileName,
} = require("../../../dictionaries/documents");
const dictDocumentTypes = require("../../../dictionaries/mime/documents");

function getFileName(file) {
  return file.slice(0, file.lastIndexOf("."));
}

const getDocuments = async (req, res, next) => {
  try {
    const presentDocuments = {
      rules: "",
      contract: "",
      privacy: "",
      statut: "",
      reporting: "",
    };
    const result = await readDirectory(
      cfgApp.publicResources.documents.directory
    );
    for (const file of result) {
      const fileName = getFileName(file);
      if (
        presentDocuments.hasOwnProperty(
          mapDocumentFileNameToObjectProperty().get(fileName)
        )
      )
        presentDocuments[
          mapDocumentFileNameToObjectProperty().get(fileName)
        ] = `${cfgApp.publicResources.documents.route}/${file}`;
    }

    res
      .status(200)
      .json(
        new DocumentsDTO(
          presentDocuments.rules,
          presentDocuments.contract,
          presentDocuments.privacy,
          presentDocuments.statut,
          presentDocuments.reporting
        )
      );
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const putDocument = async (req, res, next) => {
  try {
    const listFiles = await readDirectory(
      cfgApp.publicResources.documents.directory
    );

    for (const file of listFiles) {
      if (
        mapDocumentFileNameToObjectProperty().get(getFileName(file)) ===
        req.body.type
      ) {
        const pathToFile = `${cfgApp.publicResources.documents.directory}/${file}`;
        deleteDocument(pathToFile);
        break;
      }
    }
    const fileName = mapObjectPropertyToDocumentFileName().get(req.body.type);
    const result = await saveDocument(
      fileName,
      req.body.file.data,
      req.body.file.mime
    );
    res.status(200).json(new DocumentDTO(result));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const removeDocument = async (req, res, next) => {
  try {
    if (!mapObjectPropertyToDocumentFileName().has(req.params.name)) {
      next();
    }
    const listFiles = await readDirectory(
      cfgApp.publicResources.documents.directory
    );
    const rmFile = listFiles.find(
      (file) =>
        mapDocumentFileNameToObjectProperty().get(getFileName(file)) ===
        req.params.name
    );
    if (rmFile) {
      const pathToFile = `${cfgApp.publicResources.documents.directory}/${rmFile}`;
      deleteDocument(pathToFile);
      res.status(200).json(new DocumentDTO(rmFile));
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = {
  getDocuments,
  putDocument,
  removeDocument,
};
