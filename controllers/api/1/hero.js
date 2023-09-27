/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const HeroDBModel = require("../../../models/api/1/Hero");
const {
  savePicture,
  deletePicture,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const heroPrepareToRequest = (_hero) => {
  const { _id, ...hero } = _hero;
  hero.id = _id;
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
    const picture = await savePicture(
      hero.View.picture.image,
      hero.View.picture.mime_type
    );
    res
      .status(200)
      .json(heroPrepareToRequest({ ...(await saveToDB(picture, hero))._doc }));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getHeroById = async (req, res, next) => {
  try {
    const query = HeroDBModel.where({ _id: req.params.id });
    const hero = await query.findOne();
    if (hero) {
      const result = heroPrepareToRequest({ ...hero._doc });
      return res.status(200).json(result);
    }
    return res.status(404).json({
      message: "Ресурс не знайдено",
    });
  } catch (err) {
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
        deletePicture(
          `${appConfig.publicResources.pictures.directory}${currentHero.View.picture.image}`
        );
      } else {
        return res.status(404).json({
          message: "Ресурс не знайдено",
        });
      }

      heroToSave.View.picture.image = await savePicture(
        hero.View.picture.image,
        hero.View.picture.mime_type
      );
    }
    const result = await HeroDBModel.findByIdAndUpdate(hero.id, heroToSave, {
      returnDocument: "after",
    });
    return res.status(200).json(heroPrepareToRequest(result._doc));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const deleteHero = async (req, res, next) => {
  try {
    const hero = await HeroDBModel.findOneAndRemove({
      _id: req.params.id,
    });

    if (!hero) {
      return res.status(404).json({
        message: "Ресурс не знайдено",
      });
    }
    deletePicture(
      `${appConfig.publicResources.pictures.directory}${hero.View.picture.image}`
    );
    res.status(200).json(heroPrepareToRequest(hero._doc));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { createHero, getHeroes, getHeroById, updateHero, deleteHero };
