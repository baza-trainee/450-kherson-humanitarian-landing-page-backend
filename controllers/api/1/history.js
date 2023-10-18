/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const HistoryDBModel = require("../../../models/api/1/History");
const HistoryDTO = require("../../../dto/api/1/req/history.dto");

const {
  savePicture,
  deletePicture,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const getHistory = async (req, res, next) => {
  try {
    const result = await HistoryDBModel.findOne({}).exec();
    if (!result) {
      return res.status(200).json(new HistoryDTO("", ""));
    }
    res
      .status(200)
      .json(new HistoryDTO(result.title, result.text, result.picture));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateHistory = async (req, res, next) => {
  try {
    const fileNameExp = /\/([^/]+)$/;
    const { picture, title, text } = req.body;

    const historyToSave = {
      title: title,
      text: text,
    };

    const currentHistory = await HistoryDBModel.findOne({}).exec();

    if (currentHistory) {
      if (picture) {
        if (currentHistory?.picture?.image) {
          deletePicture(
            `${appConfig.publicResources.pictures.directory}${currentHistory.picture.image}`
          );
        }
        historyToSave.picture = {
          mime_type: "text/plain",
          image: await savePicture(picture.image, picture.mime_type),
        };
      }
      const result = (
        await HistoryDBModel.findByIdAndUpdate(
          currentHistory._id,
          historyToSave,
          {
            returnDocument: "after",
          }
        )
      )._doc;
      return res
        .status(200)
        .json(new HistoryDTO(result.title, result.text, result.picture));
    }
    if (picture) {
      historyToSave.picture = {
        mime_type: "text/plain",
        image: await savePicture(picture.image, picture.mime_type),
      };
    }
    const result = (await new HistoryDBModel(historyToSave).save())._doc;
    return res
      .status(200)
      .json(new HistoryDTO(result.title, result.text, result.picture));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getHistory, updateHistory };
