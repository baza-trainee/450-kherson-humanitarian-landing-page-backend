/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const {
  isIdValid,
  isImageValid,
  isTextValid,
  isBooleanValid,
  isPicturesArray,
} = require("../../../utils/helpers/api/simpleIssueValidator");
const appConfig = require("../../../config/app");
const componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Project object is valid .
 */

function isValidProject(req, res, next) {
  try {
    const {
      mainPicture,
      title,
      awaitingFunding,
      inProcess,
      completed,
      pictures,
      subTitle,
      text,
      areaCompletedWorks,
      projectDuration,
      projectText,
    } = req.body;
    const id = req.body.id ? req.body.id : req.params.id;
    // check id
    const isId = isIdValid(id);
    // check main picture
    const isMainPicture = isImageValid(
      mainPicture,
      componentConfig.projects.pictures.maxSizeKb,
      appConfig.publicResources.pictures.directory
    );
    const isTitle = isTextValid(
      title,
      componentConfig.projects.title.minLength,
      componentConfig.projects.title.maxLength
    );
    const isAwaitingFunding = isBooleanValid(awaitingFunding);
    const isInProcess = isBooleanValid(inProcess);
    const isCompleted = isBooleanValid(completed);
    const isPictures = isPicturesArray(
      pictures,
      componentConfig.projects.pictures.maxSizeKb,
      appConfig.publicResources.pictures.directory
    );
    const isSubTitle = isTextValid(
      subTitle,
      componentConfig.projects.subTitle.minLength,
      componentConfig.projects.subTitle.maxLength
    );
    const isItText = isTextValid(
      text,
      componentConfig.projects.text.minLength,
      componentConfig.projects.text.maxLength
    );
    const isAreaCompletedWorks = isTextValid(
      areaCompletedWorks,
      componentConfig.projects.areaCompletedWorks.minLength,
      componentConfig.projects.areaCompletedWorks.maxLength
    );
    const isProjectDuration = isTextValid(
      projectDuration,
      componentConfig.projects.projectDuration.minLength,
      componentConfig.projects.projectDuration.maxLength
    );
    const isProjectText = isTextValid(
      projectText,
      componentConfig.projects.projectText.minLength,
      componentConfig.projects.projectText.maxLength
    );

    if (req.method === "DELETE" || req.method === "GET") {
      if (!isId) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }

    if (req.method === "POST") {
      if (
        !(
          isMainPicture &&
          isTitle &&
          isAwaitingFunding &&
          isInProcess &&
          isCompleted &&
          isPictures &&
          isSubTitle &&
          isItText &&
          isAreaCompletedWorks &&
          isProjectDuration &&
          isProjectText
        )
      ) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    if (req.method === "PUT") {
      if (
        !(
          isId &&
          isMainPicture &&
          isTitle &&
          isAwaitingFunding &&
          isInProcess &&
          isCompleted &&
          isPictures &&
          isSubTitle &&
          isItText &&
          isAreaCompletedWorks &&
          isProjectDuration &&
          isProjectText
        )
      ) {
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
  isValidProject,
};
