/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const IssuePointDBModel = require("../../../models/api/1/IssuePoint");
const IssuePointReqDTO = require("../../../dto/api/1/req/issue-point.dto");
const IssuePointDBDTO = require("../../../dto/api/1/db/issue-point.dto");

const getIssuePoint = async (req, res, next) => {
  try {
    const result = await IssuePointDBModel.findOne({}).exec();
    if (!result) {
      return res.status(200).json(new IssuePointReqDTO("", ""));
    }
    res
      .status(200)
      .json(
        new IssuePointReqDTO(result.geolocation, result.locationDeliveryPoint)
      );
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateIssuePoint = async (req, res, next) => {
  try {
    const issuepointToSave = new IssuePointDBDTO(
      req.body.geolocation,
      req.body.locationDeliveryPoint
    );

    const currentIssuepoint = await IssuePointDBModel.findOne({}).exec();

    if (!currentIssuepoint) {
      const result = await new IssuePointDBModel(issuepointToSave).save();
      return res
        .status(200)
        .json(
          new IssuePointReqDTO(result.geolocation, result.locationDeliveryPoint)
        );
    }

    const result = await IssuePointDBModel.findByIdAndUpdate(
      currentIssuepoint._id,
      issuepointToSave,
      {
        returnDocument: "after",
      }
    );

    res
      .status(200)
      .json(
        new IssuePointReqDTO(result.geolocation, result.locationDeliveryPoint)
      );
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getIssuePoint, updateIssuePoint };
