/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const HeroDBModel = require("../../../models/api/1/Hero");
const HeroesDTOReq = require("../../../dto/api/1/req/heroes.dto");
const HeroesDTODB = require("../../../dto/api/1/db/heroes.dto");

const {
  savePicture,
  deletePicture,
} = require("../../../utils/helpers/api/imageProcessor");
const appConfig = require("../../../config/app");

const createHero = async (req, res, next) => {
  try {
    const { id, view, title, subtitle } = req.body;
    const picture = await savePicture(
      view.picture.image,
      view.picture.mime_type
    );

    const heroesDTODB = new HeroesDTODB(
      {
        picture: { mime_type: "text/plain", image: picture },
        color: view.color,
      },
      title,
      subtitle
    );
    res
      .status(200)
      .json(new HeroesDTOReq((await new HeroDBModel(heroesDTODB).save())._doc));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getHeroById = async (req, res, next) => {
  try {
    const query = HeroDBModel.where({ _id: req.params.id });
    const hero = await query.findOne();
    if (hero) {
      return res.status(200).json(new HeroesDTOReq(hero._doc));
    }
    res.status(404).json({
      message: "Ресурс не знайдено",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getHeroes = async (req, res, next) => {
  try {
    const query = HeroDBModel.where({});
    const heroes = await query.find();
    const result = heroes.map((hero) => new HeroesDTOReq(hero._doc));
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getHeroesOnlyIds = async (req, res, next) => {
  try {
    const query = HeroDBModel.where({});
    const result = (await query.find().select("_id")).map((hero) => hero._id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateHero = async (req, res, next) => {
  try {
    const { id, view, title, subtitle } = req.body;
    const heroReq = { view, title, subtitle };
    const heroesDTODB = new HeroesDTODB({ color: view.color }, title, subtitle);
    const query = HeroDBModel.where({ _id: id });
    const currentHero = await query.findOne();
    if (currentHero) {
      if (heroReq.view.picture) {
        deletePicture(
          `${appConfig.publicResources.pictures.directory}${currentHero.view.picture.image}`
        );
        heroesDTODB.view.picture = {
          mime_type: "text/plain",
        };
        heroesDTODB.view.picture.image = await savePicture(
          heroReq.view.picture.image,
          heroReq.view.picture.mime_type
        );
        console.log(heroesDTODB);
      } else {
        heroesDTODB.view.picture = currentHero.view.picture;
      }
      const result = await HeroDBModel.findByIdAndUpdate(id, heroesDTODB, {
        returnDocument: "after",
      });
      return res.status(200).json(new HeroesDTOReq(result._doc));
    }
    res.status(404).json({
      message: "Ресурс не знайдено",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const deleteHero = async (req, res, next) => {
  try {
    const result = await HeroDBModel.findOneAndRemove({
      _id: req.params.id,
    });

    if (!result) {
      return res.status(404).json({
        message: "Ресурс не знайдено",
      });
    }
    deletePicture(
      `${appConfig.publicResources.pictures.directory}${result.view.picture.image}`
    );
    res.status(200).json(new HeroesDTOReq(result._doc));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = {
  createHero,
  getHeroes,
  getHeroesOnlyIds,
  getHeroById,
  updateHero,
  deleteHero,
};
