/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */
const IssuePointDBModel = require("../../../models/api/1/IssuePoint");

const getIssuePoint = async (req, res, next) => {
  try {
    const query = (await IssuePointDBModel.findOne({}).exec()) ?? {
      _doc: {
        locationDeliveryPoint: "",
        geolocation: "",
      },
    };
    const { geolocation, locationDeliveryPoint } = query._doc;

    const result = {
      geolocation: atob(geolocation),
      locationDeliveryPoint,
    };

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateIssuePoint = async (req, res, next) => {
  try {
    const issuepoint = req.body;
    const issuepointToSave = {
      locationDeliveryPoint: issuepoint.locationDeliveryPoint,
      geolocation: btoa(issuepoint.geolocation),
    };

    let currentIssuepoint = await IssuePointDBModel.findOne({}).exec();

    if (!currentIssuepoint) {
      currentIssuepoint = await new IssuePointDBModel(issuepointToSave).save();
      const { _id, __v, ...clearResult } = currentIssuepoint._doc;
      return res.status(200).json(clearResult);
    }

    const result = await IssuePointDBModel.findByIdAndUpdate(
      currentIssuepoint._id,
      issuepointToSave,
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

module.exports = { getIssuePoint, updateIssuePoint };
