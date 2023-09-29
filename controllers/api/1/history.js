/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const HistoryDBModel = require("../../../models/api/1/History");
const {
  savePicture,
  deletePicture,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const getHistory = async (req, res, next) => {
  try {
    const query = (await HistoryDBModel.findOne({}).exec()) ?? {
      _doc: {
        picture: {
          mime_type: "",
          image: "",
        },
        title: "",
        text: "",
      },
    };
    const { _id, __v, ...result } = query._doc;
    if (result.picture.image !== "") {
      result.picture.image = `${appConfig.publicResources.pictures.route}${result.picture.image}`;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateHistory = async (req, res, next) => {
  try {
    const history = req.body;
    const historyToSave = {
      picture: {
        mime_type: "text/plain",
      },
      title: history.title,
      text: history.text,
    };

    let currentHistory = await HistoryDBModel.findOne({}).exec();

    const fileNameExp = /\/([^/]+)$/;
    if (history.picture.mime_type === "text/plain") {
      historyToSave.picture.image = history.picture.image.match(fileNameExp)[1];
    } else {
      historyToSave.picture.image = await savePicture(
        history.picture.image,
        history.picture.mime_type
      );

      // Delete picture on disk
      if (currentHistory && currentHistory.picture.image !== "") {
        deletePicture(
          `${appConfig.publicResources.pictures.directory}${currentHistory.picture.image}`
        );
      } else {
        currentHistory = await new HistoryDBModel(historyToSave).save();
        const { _id, __v, ...clearResult } = currentHistory._doc;
        clearResult.picture.image = `${appConfig.publicResources.pictures.route}${clearResult.picture.image}`;
        return res.status(200).json(clearResult);
      }
    }
    const result = await HistoryDBModel.findByIdAndUpdate(
      currentHistory._id,
      historyToSave,
      {
        returnDocument: "after",
      }
    );

    const { _id, __v, ...clearResult } = result._doc;
    clearResult.picture.image = `${appConfig.publicResources.pictures.route}${clearResult.picture.image}`;
    res.status(200).json(clearResult);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getHistory, updateHistory };
