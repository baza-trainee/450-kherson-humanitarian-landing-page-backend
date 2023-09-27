/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const ActivitiesDBModel = require("../../../models/api/1/Activities");
const {
  savePicture,
  deletePicture,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const activityPrepareToRequest = (_activity) => {
  const { _id, __v, ...activity } = _activity;
  activity.id = _id;
  activity.picture.image = `${appConfig.publicResources.pictures.directory}${activity.picture.image}`;
  return activity;
};

const createActivity = async (req, res, next) => {
  try {
    const activity = req.body;
    const picture = await savePicture(
      activity.picture.image,
      activity.picture.mime_type
    );

    const activityDBRecord = await new ActivitiesDBModel({
      picture: {
        mime_type: "text/plain",
        image: picture,
      },
    }).save();

    res
      .status(200)
      .json(activityPrepareToRequest({ ...activityDBRecord._doc }));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getActivities = async (req, res, next) => {
  try {
    const query = ActivitiesDBModel.where({});
    const activitys = await query.find();
    const result = activitys.map((activity) =>
      activityPrepareToRequest({ ...activity._doc })
    );
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
      const result = activityPrepareToRequest({
        ...activity._doc,
      });
      return res.status(200).json(result);
    }
    return res.status(404).json({
      message: "Ресурс не знайдено",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateActivity = async (req, res, next) => {
  try {
    const activity = req.body;
    const activityToSave = {
      picture: {
        mime_type: "text/plain",
      },
    };
    const fileNameExp = /\/([^/]+)$/;
    if (req.body.picture.mime_type === "text/plain") {
      activityToSave.picture.image =
        req.body.picture.image.match(fileNameExp)[1];
    } else {
      const query = ActivitiesDBModel.where({ _id: req.body.id });
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
        activity.picture.image,
        activity.picture.mime_type
      );
    }
    const result = await ActivitiesDBModel.findByIdAndUpdate(
      activity.id,
      activityToSave,
      {
        returnDocument: "after",
      }
    );
    return res.status(200).json(activityPrepareToRequest(result._doc));
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
    res.status(200).json(activityPrepareToRequest(activity._doc));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = {
  createActivity,
  getActivityById,
  updateActivity,
  deleteActivity,
  getActivities,
};
