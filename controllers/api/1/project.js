/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const ProjectDBModel = require("../../../models/api/1/Projects");
const PictureDBModel = require("../../../models/api/1/Common/Picture");
const {
  savePicture,
  deletePicture,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const convertId = (projectDocument) => {
  if (!projectDocument?._doc) {
    return res.status(500).json({ message: "Помилка на боці серверу" });
  }
  const { _id, __v, ...result } = projectDocument._doc;
  result.id = _id;
  if (projectDocument?.mainPicture) {
    const { _id, ...mainPictureClone } = projectDocument?.mainPicture._doc;
    mainPictureClone.id = _id;
    result.mainPicture = mainPictureClone;
    result.mainPicture.image = `${appConfig.publicResources.pictures.route}/${mainPictureClone.image}`;
  }
  result.pictures = result.pictures.map((picture) => {
    return {
      mime_type: picture.mime_type,
      image: `${appConfig.publicResources.pictures.route}/${picture.image}`,
      id: picture._id,
    };
  });
  return result;
};

const createProjectDocument = async (req, res, next) => {
  try {
    const {
      stage,
      videoLink,
      subTitle,
      text,
      areaCompletedWorks,
      projectDuration,
      projectText,
      ...rest
    } = req.body;

    const projectDoc = await new ProjectDBModel({
      stage,
      videoLink,
      subTitle,
      text,
      areaCompletedWorks,
      projectDuration,
      projectText,
    }).save();
    res.status(200).json(convertId(projectDoc));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getProjects = async (req, res, next) => {
  try {
    const query = ProjectDBModel.where({});
    const projects = await query.find();
    const result = projects.map((project) => convertId(project));
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getProjectsOnlyIds = async (req, res, next) => {
  try {
    const query = ProjectDBModel.where({});
    const result = (await query.find().select("_id")).map(
      (project) => project._id
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getProjectDocumentById = async (req, res, next) => {
  try {
    const query = ProjectDBModel.where({ _id: req.params.id });
    const projectDoc = await query.findOne();
    if (projectDoc) {
      return res.status(200).json(convertId(projectDoc));
    }
    return res.status(404).json({
      message: "Ресурс не знайдено",
    });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateProjectDocument = async (req, res, next) => {
  try {
    const projectDocToUpdate = {
      stage: req.body.stage,
      videoLink: req.body.videoLink,
      subTitle: req.body.subTitle,
      text: req.body.text,
      areaCompletedWorks: req.body.areaCompletedWorks,
      projectDuration: req.body.projectDuration,
      projectText: req.body.projectText,
    };

    const projectDoc = await ProjectDBModel.findByIdAndUpdate(
      req.body.id,
      projectDocToUpdate,
      {
        returnDocument: "after",
      }
    );
    if (projectDoc) {
      return res.status(200).json(convertId(projectDoc));
    }
    res.status(404).json({
      message: "Ресурс не знайдено",
    });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const deleteProjectDocument = async (req, res, next) => {
  try {
    const projectDoc = await ProjectDBModel.findOneAndRemove({
      _id: req.params.id,
    });

    if (!projectDoc) {
      return res.status(404).json({
        message: "Ресурс не знайдено",
      });
    }
    deletePicture(
      `${appConfig.publicResources.pictures.directory}${projectDoc.mainPicture?.image}`
    );
    projectDoc.pictures.forEach((picture) => {
      deletePicture(
        `${appConfig.publicResources.pictures.directory}${picture.image}`
      );
    });
    res.status(200).json(convertId(projectDoc));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const addProjectPicture = async (req, res, next) => {
  try {
    const id = req.params.pr_id;
    const projectPicture = req.body.picture;
    const isMain = req.body.isMain;

    const projectDBDocument = await ProjectDBModel.findById(id);
    if (projectDBDocument) {
      const pathToPicture = await savePicture(
        projectPicture.image,
        projectPicture.mime_type
      );

      const pictureToSave = {
        mime_type: "text/plain",
        image: pathToPicture,
      };

      if (isMain) {
        if (projectDBDocument.mainPicture) {
          projectDBDocument.pictures.push(projectDBDocument.mainPicture);
        }
        projectDBDocument.mainPicture = pictureToSave;
      } else {
        projectDBDocument.pictures.push(pictureToSave);
      }
      const projectDoc = await projectDBDocument.save();
      return res.status(200).json(convertId(projectDoc));
    }
    res.status(404).json({
      message: "Ресурс не знайдено",
    });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const deleteProjectPicture = async (req, res, next) => {
  try {
    const project_id = req.params.pr_id;
    const image_id = req.params.pic_id;
    const projectDBDocument = await ProjectDBModel.findById(project_id);
    if (projectDBDocument) {
      let isImageDelete = false;
      if (projectDBDocument?.mainPicture?._id.equals(image_id)) {
        isImageDelete = deletePicture(
          `${appConfig.publicResources.pictures.directory}${projectDBDocument.mainPicture.image}`
        );
        if (isImageDelete) {
          projectDBDocument.mainPicture = null;
          const projectDoc = await projectDBDocument.save();
          return res.status(200).json(convertId(projectDoc));
        }
      } else {
        const pictureForDelete = projectDBDocument.pictures.find((picture) =>
          picture._id.equals(image_id)
        );
        if (pictureForDelete) {
          isImageDelete = deletePicture(
            `${appConfig.publicResources.pictures.directory}${pictureForDelete.image}`
          );
          if (isImageDelete) {
            projectDBDocument.pictures = projectDBDocument.pictures.filter(
              (picture) => !picture._id.equals(image_id)
            );
            const projectDoc = await projectDBDocument.save();
            return res.status(200).json(convertId(projectDoc));
          }
        } else {
          return res.status(404).json({ message: "Ресурс не знайдено" });
        }
      }
    }
    return res.status(404).json({ message: "Ресурс не знайдено" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = {
  createProjectDocument,
  getProjects,
  getProjectsOnlyIds,
  getProjectDocumentById,
  updateProjectDocument,
  deleteProjectDocument,
  addProjectPicture,
  deleteProjectPicture,
};
