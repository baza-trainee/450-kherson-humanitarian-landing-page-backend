/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

const LogosDBModel = require("../../../models/api/1/Logos");
const LogoDTO = require("../../../dto/api/1/req/logo.dto");
const {
  savePicture,
  deletePicture,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const createLogo = async (req, res, next) => {
  try {
    const { picture } = req.body;
    const pictureFileName = await savePicture(picture.image, picture.mime_type);

    const logoDBRecord = await new LogosDBModel({
      picture: {
        mime_type: "text/plain",
        image: pictureFileName,
      },
    }).save();

    const result = ({ _id, pictureFileNameDB } = logoDBRecord._doc);

    res.status(200).json(new LogoDTO(result._id, result.picture));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getLogosOnlyIds = async (req, res, next) => {
  try {
    const query = LogosDBModel.where({});
    const result = (await query.find().select("_id")).map((logo) => logo._id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getLogos = async (req, res, next) => {
  try {
    const query = LogosDBModel.where({});
    const logos = await query.find();
    const result = logos.map((logo) => {
      const { _id, picture } = logo._doc;
      return new LogoDTO(_id, picture);
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getLogoById = async (req, res, next) => {
  try {
    const query = LogosDBModel.where({ _id: req.params.id });
    const logo = await query.findOne();
    if (logo) {
      const { _id, picture } = logo._doc;
      return res.status(200).json(new LogoDTO(_id, picture));
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
    const reqObj = () => ({ id, picture } = req.body);
    const logoToSave = {
      picture: {
        mime_type: "text/plain",
      },
    };
    const fileNameExp = /\/([^/]+)$/;
    if (reqObj().picture.mime_type === "text/plain") {
      logoToSave.picture.image = reqObj().picture.image.match(fileNameExp)[1];
    } else {
      const query = LogosDBModel.where({ _id: reqObj().id });
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
        reqObj().picture.image,
        reqObj().picture.mime_type
      );
    }
    const logo = await LogosDBModel.findByIdAndUpdate(id, logoToSave, {
      returnDocument: "after",
    });

    result = () => {
      const { _id, picture } = logo._doc;
      return new LogoDTO(_id, picture);
    };

    return res.status(200).json(result());
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const deleteLogo = async (req, res, next) => {
  try {
    const logo = await LogosDBModel.findOneAndRemove({
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

    result = () => {
      const { _id, picture } = logo._doc;
      return new LogoDTO(_id, picture);
    };
    res.status(200).json(result());
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = {
  getLogos,
  getLogosOnlyIds,
  createLogo,
  getLogoById,
  updateLogo,
  deleteLogo,
};
