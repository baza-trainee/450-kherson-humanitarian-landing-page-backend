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

/*
const fundPrepareToRequest = (fund) => {
  fund.picture.image = `${appConfig.publicResources.pictures.directory}${fund.picture.image}`;
  return fund;
};
*/
const getFund = async (req, res, next) => {
  try {
    const query = (await FundDBModel.findOne({}).exec()) ?? {
      picture: {
        mime_type: "",
        image: "",
      },
    };
    res.status(200).json(query);
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
    console.log(currentFund);

    fundToSave.picture.image = await savePicture(
      fund.picture.image,
      fund.picture.mime_type
    );

    if (currentFund && currentFund.picture.image !== "") {
      deletePicture(
        `${appConfig.publicResources.pictures.directory}${currentFund.picture.image}`
      );
    } else {
      currentFund = new FundDBModel(fundToSave).save();
      return res.status(200).json(currentFund);
    }

    fundToSave.picture.image = `${appConfig.publicResources.pictures.directory}${fund.picture.image}`;
    //console.log(currentFund._id);
    const result = await FundDBModel.findByIdAndUpdate(
      currentFund._id,
      fundToSave,
      {
        returnDocument: "after",
      }
    );

    res.status(200).json(result);
  } catch (err) {
    //console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getFund, updateFund };
