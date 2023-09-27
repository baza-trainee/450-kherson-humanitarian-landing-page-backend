/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const AchievementDBModel = require("../../../models/api/1/Achievements");

const getAchievements = async (req, res, next) => {
  try {
    const query = (await AchievementDBModel.findOne({}).exec()) ?? {
      issuedHumanitarianKits: 0,
      receivedHumanitarianAid: 0,
      sumDonats: 0,
      infoAtDate: "",
    };

    const { _id, __v, ...clearResult } = query._doc;
    res.status(501).json(clearResult);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateAchievements = async (req, res, next) => {
  try {
    const achievement = req.body;
    const achievementToSave = {
      issuedHumanitarianKits: achievement.issuedHumanitarianKits,
      receivedHumanitarianAid: achievement.receivedHumanitarianAid,
      sumDonats: achievement.sumDonats,
      infoAtDate: achievement.infoAtDate,
    };

    let currentAchievement = await AchievementDBModel.findOne({}).exec();

    if (!currentAchievement) {
      currentAchievement = await new AchievementDBModel(
        achievementToSave
      ).save();
      return res.status(200).json(currentAchievement);
    }

    const result = await AchievementDBModel.findByIdAndUpdate(
      currentAchievement._id,
      achievementToSave,
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

module.exports = { getAchievements, updateAchievements };
