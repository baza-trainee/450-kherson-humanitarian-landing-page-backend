/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const FundDBModel = require("../../../models/api/1/Fund");
const FundDTOReq = require("../../../dto/api/1/req/fund.dto");
const FundDTODB = require("../../../dto/api/1/db/fund.dto");
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
    const result = new FundDTOReq(query._doc);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateFund = async (req, res, next) => {
  try {
    const { picture } = req.body;
    const fundToSave = {
      picture: {
        mime_type: "text/plain",
        image: "",
      },
    };

    const currentFund = await FundDBModel.findOne({}).exec();

    fundToSave.picture.image = await savePicture(
      picture.image,
      picture.mime_type
    );

    // Delete picture on disk
    if (currentFund && currentFund.picture.image !== "") {
      deletePicture(
        `${appConfig.publicResources.pictures.directory}${currentFund.picture.image}`
      );
    } else {
      const result = await new FundDBModel(fundToSave).save();
      return res.status(200).json(new FundDTOReq(result));
    }

    const result = await FundDBModel.findByIdAndUpdate(
      currentFund._id,
      fundToSave,
      {
        returnDocument: "after",
      }
    );

    res.status(200).json(new FundDTOReq(result));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getFund, updateFund };
