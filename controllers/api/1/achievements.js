/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const HeroesDTOReq = require("../../../dto/api/1/req/achievements.dto");
const AchievementDBModel = require("../../../models/api/1/Achievements");

const getAchievements = async (req, res, next) => {
  try {
    const query = (await AchievementDBModel.findOne({}).exec()) ?? {
      _doc: {
        issuedHumanitarianKits: 0,
        receivedHumanitarianAid: 0,
        sumDonats: 0,
        infoAtDate: "",
      },
    };

    const {
      issuedHumanitarianKits,
      receivedHumanitarianAid,
      sumDonats,
      infoAtDate,
    } = query._doc;
    res
      .status(200)
      .json(
        new HeroesDTOReq(
          issuedHumanitarianKits,
          receivedHumanitarianAid,
          sumDonats,
          infoAtDate
        )
      );
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
      const {
        issuedHumanitarianKits,
        receivedHumanitarianAid,
        sumDonats,
        infoAtDate,
      } = (await new AchievementDBModel(achievementToSave).save())._doc;
      return res
        .status(200)
        .json(
          new HeroesDTOReq(
            issuedHumanitarianKits,
            receivedHumanitarianAid,
            sumDonats,
            infoAtDate
          )
        );
    }

    const {
      issuedHumanitarianKits,
      receivedHumanitarianAid,
      sumDonats,
      infoAtDate,
    } = (
      await AchievementDBModel.findByIdAndUpdate(
        currentAchievement._id,
        achievementToSave,
        {
          returnDocument: "after",
        }
      )
    )._doc;

    res
      .status(200)
      .json(
        new HeroesDTOReq(
          issuedHumanitarianKits,
          receivedHumanitarianAid,
          sumDonats,
          infoAtDate
        )
      );
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getAchievements, updateAchievements };
