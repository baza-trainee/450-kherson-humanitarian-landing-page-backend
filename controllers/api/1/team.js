/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const TeamDBModel = require("../../../models/api/1/Team");
const TeamDTO = require("../../../dto/api/1/req/team.dto");

const {
  savePicture,
  deletePicture,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const getTeam = async (req, res, next) => {
  try {
    const result = (await TeamDBModel.findOne({}).exec()) ?? {
      _doc: {
        picture: {
          mime_type: "",
          image: "",
        },
        title: "",
        text: "",
      },
    };
    res.status(200).json(new TeamDTO(result._doc));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateTeam = async (req, res, next) => {
  try {
    const fileNameExp = /\/([^/]+)$/;
    const { picture, title, text } = req.body;

    const teamToSave = {
      title: title,
      text: text,
    };

    const currentTeam = await TeamDBModel.findOne({}).exec();

    if (currentTeam) {
      if (picture) {
        if (currentTeam?.picture?.image) {
          console.log(currentTeam?.picture?.image);
          deletePicture(
            `${appConfig.publicResources.pictures.directory}${currentTeam.picture.image}`
          );
        }
        teamToSave.picture = {
          mime_type: "text/plain",
          image: await savePicture(picture.image, picture.mime_type),
        };
      }
      const result = await TeamDBModel.findByIdAndUpdate(
        currentTeam._id,
        teamToSave,
        {
          returnDocument: "after",
        }
      );
      return res.status(200).json(new TeamDTO(result._doc));
    }
    if (picture) {
      teamToSave.picture = {
        mime_type: "text/plain",
        image: await savePicture(picture.image, picture.mime_type),
      };
    }
    const result = await new TeamDBModel(teamToSave).save();
    return res.status(200).json(new TeamDTO(result._doc));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getTeam, updateTeam };
