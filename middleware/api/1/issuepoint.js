/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const { isTextValid  } = require("../../../utils/helpers/api/simpleIssueValidator");
const  componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Issue point object is valid .
 */

function isValidIssuepoint(req, res, next) {
  try {
    const { locationDeliveryPoint, geolocation } = req.body;

    // check locationDeliveryPoint
    const isLocationDeliveryPoint = isTextValid(locationDeliveryPoint, componentConfig.issuepoint.locationDeliveryPoint.minLength, componentConfig.issuepoint.locationDeliveryPoint.maxLength);
    // check geolocation
    const isGeolocation = isTextValid(geolocation, componentConfig.issuepoint.geolocation.minLength, componentConfig.issuepoint.geolocation.maxLength);
    
    if (req.method === 'PUT') {
      if (!( isLocationDeliveryPoint && isGeolocation)) {
        return res.status(406).json({message: "Помилка валідації даних"})
      }
    }
    next();
  } catch (err) {
    return res.status(406).json({message: "-Помилка валідації даних"});
  }
}

module.exports = {
  isValidIssuepoint
};
