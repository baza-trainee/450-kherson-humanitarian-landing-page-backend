/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const ActivitiesDBModel = require("../../../models/api/1/Activities");
const ActivitiesDTO = require("../../../dto/api/1/req/activity.dto");
const {
  savePicture,
  deletePicture,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const createActivity = async (req, res, next) => {
  try {
    const { picture } = req.body;
    const pictureFileName = await savePicture(picture.image, picture.mime_type);

    const activityDBRecord = await new ActivitiesDBModel({
      picture: {
        mime_type: "text/plain",
        image: pictureFileName,
      },
    }).save();

    const result = ({ _id, pictureFileNameDB } = activityDBRecord._doc);

    res.status(200).json(new ActivitiesDTO(result._id, result.picture));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getActivitiesOnlyIds = async (req, res, next) => {
  try {
    const query = ActivitiesDBModel.where({});
    const result = (await query.find().select("_id")).map(
      (activity) => activity._id
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getActivities = async (req, res, next) => {
  try {
    const query = ActivitiesDBModel.where({});
    const activities = await query.find();
    const result = activities.map((activity) => {
      const { _id, picture } = activity._doc;
      return new ActivitiesDTO(_id, picture);
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getActivityById = async (req, res, next) => {
  try {
    const query = ActivitiesDBModel.where({ _id: req.params.id });
    const activity = await query.findOne();
    if (activity) {
      const { _id, picture } = activity._doc;
      return res.status(200).json(new ActivitiesDTO(_id, picture));
    }
    return res.status(404).json({
      message: "Ресурс не знайдено",
    });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateActivity = async (req, res, next) => {
  try {
    const reqObj = () => ({ id, picture } = req.body);
    const activityToSave = {
      picture: {
        mime_type: "text/plain",
      },
    };
    const fileNameExp = /\/([^/]+)$/;
    if (reqObj().picture.mime_type === "text/plain") {
      activityToSave.picture.image =
        reqObj().picture.image.match(fileNameExp)[1];
    } else {
      const query = ActivitiesDBModel.where({ _id: reqObj().id });
      const currentActivity = await query.findOne();
      // Delete picture on disk
      if (currentActivity) {
        deletePicture(
          `${appConfig.publicResources.pictures.directory}${currentActivity.picture.image}`
        );
      } else {
        return res.status(404).json({
          message: "Ресурс не знайдено",
        });
      }

      activityToSave.picture.image = await savePicture(
        reqObj().picture.image,
        reqObj().picture.mime_type
      );
    }
    const activity = await ActivitiesDBModel.findByIdAndUpdate(
      id,
      activityToSave,
      {
        returnDocument: "after",
      }
    );

    result = () => {
      const { _id, picture } = activity._doc;
      return new ActivitiesDTO(_id, picture);
    };

    return res.status(200).json(result());
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const deleteActivity = async (req, res, next) => {
  try {
    const activity = await ActivitiesDBModel.findOneAndRemove({
      _id: req.params.id,
    });

    if (!activity) {
      return res.status(404).json({
        message: "Ресурс не знайдено",
      });
    }

    deletePicture(
      `${appConfig.publicResources.pictures.directory}${activity.picture.image}`
    );

    result = () => {
      const { _id, picture } = activity._doc;
      return new ActivitiesDTO(_id, picture);
    };
    res.status(200).json(result());
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = {
  createActivity,
  getActivityById,
  getActivitiesOnlyIds,
  updateActivity,
  deleteActivity,
  getActivities,
};
