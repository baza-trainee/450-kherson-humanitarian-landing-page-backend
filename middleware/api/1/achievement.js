/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const { isDateValid, isIntegerValid  } = require("../../../utils/helpers/api/simpleIssueValidator");
const  componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Achievement object is valid .
 */

function isValidAchievement(req, res, next) {
  try {
    const { issuedHumanitarianKits, receivedHumanitarianAid, sumDonats, infoAtDate } = req.body;

    // check issuedHumanitarianKits
    const isIssuedHumanitarianKits = isIntegerValid(issuedHumanitarianKits, componentConfig.achievement.issuedHumanitarianKits.min, componentConfig.achievement.issuedHumanitarianKits.max);
    // check title
    const isReceivedHumanitarianAid = isIntegerValid(receivedHumanitarianAid, componentConfig.achievement.receivedHumanitarianAid.min, componentConfig.achievement.receivedHumanitarianAid.max);
    // check text
    const isSumDonats = isIntegerValid(sumDonats, componentConfig.achievement.sumDonats.min, componentConfig.achievement.sumDonats.max);
    // check text
    const isInfoAtDate = isDateValid(infoAtDate, componentConfig.achievement.infoAtDate.minDate, componentConfig.achievement.infoAtDate.maxDate);
    
    if (req.method === 'PUT') {
      if (!( isIssuedHumanitarianKits && isReceivedHumanitarianAid && isSumDonats && isInfoAtDate)) {
        return res.status(406).json({message: "Помилка валідації даних"})
      }
    }
    next();
  } catch (err) {
    return res.status(406).json({message: "-Помилка валідації даних"});
  }
}

module.exports = {
  isValidAchievement
};
