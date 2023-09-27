/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */
const TeamDBModel = require("../../../models/api/1/Team");
const {
  savePicture,
  deletePicture,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const getTeam = async (req, res, next) => {
  try {
    const query = (await TeamDBModel.findOne({}).exec()) ?? {
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
      result.picture.image = `${appConfig.publicResources.pictures.directory}${result.picture.image}`;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateTeam = async (req, res, next) => {
  try {
    const team = req.body;
    const teamToSave = {
      picture: {
        mime_type: "text/plain",
      },
      title: req.body.title,
      text: req.body.text,
    };

    // Delete picture on disk
    let currentTeam = await TeamDBModel.findOne({}).exec();

    teamToSave.picture.image = await savePicture(
      team.picture.image,
      team.picture.mime_type
    );

    if (currentTeam && currentTeam.picture.image !== "") {
      deletePicture(
        `${appConfig.publicResources.pictures.directory}${currentTeam.picture.image}`
      );
    } else {
      currentTeam = await new TeamDBModel(teamToSave).save();
      const { _id, __v, ...clearResult } = currentTeam._doc;
      return res.status(200).json(clearResult);
    }

    const result = await TeamDBModel.findByIdAndUpdate(
      currentTeam._id,
      teamToSave,
      {
        returnDocument: "after",
      }
    );

    const { _id, __v, ...clearResult } = result._doc;
    res.status(200).json(clearResult);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getTeam, updateTeam };
