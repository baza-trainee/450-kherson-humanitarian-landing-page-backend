/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const FundDBModel = require("../../../models/api/1/Fund");
const {
  savePicture,
  deletePicture,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const getFund = async (req, res, next) => {
  try {
    const query = (await FundDBModel.findOne({}).exec()) ?? {
      _doc: {
        picture: {
          mime_type: "",
          image: "",
        },
      },
    };
    const { _id, __v, ...result } = query._doc;
    if (result.picture.image !== "") {
      result.picture.image = `${appConfig.publicResources.pictures.directory}${result.picture.image}`;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateFund = async (req, res, next) => {
  try {
    const fund = req.body;
    const fundToSave = {
      picture: {
        mime_type: "text/plain",
        image: "",
      },
    };

    // Delete picture on disk
    let currentFund = await FundDBModel.findOne({}).exec();

    fundToSave.picture.image = await savePicture(
      fund.picture.image,
      fund.picture.mime_type
    );

    if (currentFund && currentFund.picture.image !== "") {
      deletePicture(
        `${appConfig.publicResources.pictures.directory}${currentFund.picture.image}`
      );
    } else {
      currentFund = await new FundDBModel(fundToSave).save();
      const { _id, __v, ...clearResult } = currentFund._doc;
      return res.status(200).json(clearResult);
    }

    const result = await FundDBModel.findByIdAndUpdate(
      currentFund._id,
      fundToSave,
      {
        returnDocument: "after",
      }
    );

    const { _id, __v, ...clearResult } = result._doc;
    res.status(200).json(clearResult);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getFund, updateFund };
