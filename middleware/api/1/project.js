/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const {
  isIdValid,
  //isImageValid,
  isImageContentValid,
  isTextValid,
  isBooleanValid,
  //isPicturesArray,
} = require("../../../utils/helpers/api/simpleIssueValidator");
const appConfig = require("../../../config/app");
const componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Project object is valid .
 */

function isValidProjectDocument(req, res, next) {
  try {
    const {
      title,
      stage,
      videoLink,
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
    const isTitle = isTextValid(
      title,
      componentConfig.projects.title.minLength,
      componentConfig.projects.title.maxLength
    );

    const isStage = componentConfig.projects.stages.has(stage);

    const isVideoLink = isTextValid(
      videoLink,
      componentConfig.projects.videoLink.minLength,
      componentConfig.projects.videoLink.maxLength
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
          isTitle &&
          isStage &&
          isVideoLink &&
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
    if (req.method === "PATCH") {
      if (
        !(
          isId &&
          isTitle &&
          isStage &&
          isVideoLink &&
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
    return res.status(500).json({ message: "Помилка на боці серверу" });
  }
}

function isValidProjectPicture(req, res, next) {
  try {
    const { picture, isMain } = req.body;

    const pr_id = req.params.pr_id;
    const pic_id = req.params.pic_id;

    const isId = isIdValid(pr_id) && isIdValid(pic_id);

    const isPicture = isImageContentValid(
      picture,
      componentConfig.projects.pictures.maxSizeKb
    );
    const isMainPicture = isBooleanValid(isMain);

    if (req.method === "POST") {
      if (!(isPicture && isMainPicture)) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    if (req.method === "DELETE") {
      if (!isId) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Помилка на боці серверу" });
  }
}

module.exports = {
  isValidProjectDocument,
  isValidProjectPicture,
};
