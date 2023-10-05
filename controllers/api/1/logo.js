/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const LogoDBModel = require("../../../models/api/1/Logos");
const {
  savePicture,
  deletePicture,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const logoPrepareToRequest = (_logo) => {
  const { _id, __v, ...logo } = _logo;
  logo.id = _id;
  logo.picture.image = `${appConfig.publicResources.pictures.route}${logo.picture.image}`;
  return logo;
};

const createLogo = async (req, res, next) => {
  try {
    const logo = req.body;

    const picture = await savePicture(
      logo.picture.image,
      logo.picture.mime_type
    );

    const logoDBRecord = await new LogoDBModel({
      picture: {
        mime_type: "text/plain",
        image: picture,
      },
    }).save();
    res.status(200).json(logoPrepareToRequest({ ...logoDBRecord._doc }));
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getLogos = async (req, res, next) => {
  try {
    const query = LogoDBModel.where({});
    const logos = await query.find();
    const result = logos.map((logo) => logoPrepareToRequest({ ...logo._doc }));
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getLogoById = async (req, res, next) => {
  try {
    const query = LogoDBModel.where({ _id: req.params.id });
    const logo = await query.findOne();
    if (logo) {
      const result = logoPrepareToRequest({
        ...logo._doc,
      });
      return res.status(200).json(result);
    }
    return res.status(404).json({
      message: "Ресурс не знайдено",
    });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateLogo = async (req, res, next) => {
  try {
    const logo = req.body;
    const logoToSave = {
      picture: {
        mime_type: "text/plain",
      },
    };
    const fileNameExp = /\/([^/]+)$/;
    if (req.body.picture.mime_type === "text/plain") {
      logoToSave.picture.image = req.body.picture.image.match(fileNameExp)[1];
    } else {
      const query = LogoDBModel.where({ _id: req.body.id });
      const currentLogo = await query.findOne();
      // Delete picture on disk
      if (currentLogo) {
        deletePicture(
          `${appConfig.publicResources.pictures.directory}${currentLogo.picture.image}`
        );
      } else {
        return res.status(404).json({
          message: "Ресурс не знайдено",
        });
      }

      logoToSave.picture.image = await savePicture(
        logo.picture.image,
        logo.picture.mime_type
      );
    }
    const result = await LogoDBModel.findByIdAndUpdate(logo.id, logoToSave, {
      returnDocument: "after",
    });
    return res.status(200).json(logoPrepareToRequest(result._doc));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const deleteLogo = async (req, res, next) => {
  try {
    console.log(req.params);
    const logo = await LogoDBModel.findOneAndRemove({
      _id: req.params.id,
    });

    if (!logo) {
      return res.status(404).json({
        message: "Ресурс не знайдено",
      });
    }

    deletePicture(
      `${appConfig.publicResources.pictures.directory}${logo.picture.image}`
    );
    res.status(200).json(logoPrepareToRequest(logo._doc));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { createLogo, getLogoById, updateLogo, deleteLogo, getLogos };
