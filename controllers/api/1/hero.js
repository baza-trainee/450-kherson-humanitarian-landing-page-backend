/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const { writeFile, unlink } = require("node:fs/promises");
const { existsSync } = require("node:fs");
const { Buffer } = require("node:buffer");
const path = require("path");
const mimeTypes = require("../../../dictionaries/mime/pictures");
const HeroDBModel = require("../../../models/api/1/Hero");
const ViewDBModel = require("../../../models/api/1/Hero/View");
const TitleDBModel = require("../../../models/api/1/Hero/Title");
const {
  generateUniqueImageFileName,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const saveViewPicture = async (picture, mime) => {
  const controller = new AbortController();
  const { signal } = controller;

  const picFileExtension = mimeTypes.find(
    (type) => type.mimeName === mime
  ).extension;
  const buff = Buffer.from(picture, "base64");
  const fileName = generateUniqueImageFileName(picFileExtension);
  console.log(appConfig.publicResources.pictures.directory);
  await writeFile(
    path.join(appConfig.publicResources.pictures.directory, `${fileName}`),
    buff,
    {
      signal,
    }
  );
  return fileName;
};

const deleteViewPicture = async (picture) => {
  if (existsSync(picture)) {
    await unlink(picture, (err) => {
      if (err) {
        throw err;
      }
    });
    return true;
  }
};

const heroPrepareToRequest = (hero) => {
  hero.View.picture.image = `${appConfig.publicResources.pictures.directory}${hero.View.picture.image}`;
  return hero;
};

const saveToDB = async (picture, hero) => {
  const _hero = new HeroDBModel({
    View: {
      picture: {
        mime_type: "text/plain",
        image: picture,
      },
      bgColorStart: hero.View.bgColorStart,
      bgColorMiddle: hero.View.bgColorMiddle,
      bgColorEnd: hero.View.bgColorEnd,
    },
    Title: hero.Title,
    Subtitle: hero.Subtitle,
  });
  return await _hero.save();
};

const createHero = async (req, res, next) => {
  try {
    const hero = req.body;
    const picture = await saveViewPicture(
      hero.View.picture.image,
      hero.View.picture.mime_type
    );
    res
      .status(200)
      .json(heroPrepareToRequest({ ...(await saveToDB(picture, hero))._doc }));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getHeroById = async (req, res, next) => {
  try {
    const query = HeroDBModel.where({ _id: req.params.id });
    const hero = heroPrepareToRequest({ ...(await query.findOne())._doc });
    res.status(200).json(hero);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getHeroes = async (req, res, next) => {
  try {
    const query = HeroDBModel.where({});
    const heroes = await query.find();
    const result = heroes.map((hero) => heroPrepareToRequest({ ...hero._doc }));
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateHero = async (req, res, next) => {
  try {
    const hero = req.body;
    const heroToSave = {
      View: {
        picture: {
          mime_type: "text/plain",
        },
        bgColorStart: hero.View.bgColorStart,
        bgColorMiddle: hero.View.bgColorMiddle,
        bgColorEnd: hero.View.bgColorEnd,
      },
      Title: req.body.Title,
      Subtitle: req.body.Subtitle,
    };
    const fileNameExp = /\/([^/]+)$/;
    if (req.body.View.picture.mime_type === "text/plain") {
      heroToSave.View.picture.image =
        req.body.View.picture.image.match(fileNameExp)[1];
    } else {
      // Delete picture on disk
      const query = HeroDBModel.where({ _id: req.body.id });
      const currentHero = await query.findOne();
      if (currentHero) {
        deleteViewPicture(
          `${appConfig.publicResources.pictures.directory}${currentHero.View.picture.image}`
        );
      }

      heroToSave.View.picture.image = await saveViewPicture(
        hero.View.picture.image,
        hero.View.picture.mime_type
      );
    }
    const result = await HeroDBModel.findByIdAndUpdate(hero.id, heroToSave, {
      returnDocument: "after",
    });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const deleteHero = async (req, res, next) => {
  try {
    const hero = await HeroDBModel.findOneAndRemove({
      _id: req.params.id,
    });
    deleteViewPicture(
      `${appConfig.publicResources.pictures.directory}${hero.View.picture.image}`
    );
    res.status(200).json(hero);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { createHero, getHeroes, getHeroById, updateHero, deleteHero };
