/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */
const TeamDBModel = require("../../../models/api/1/Team");

const getTeam = async (req, res, next) => {
  try {
    const query = (await TeamDBModel.findOne({}).exec()) ?? {
      picture: {
        mime_type: "",
        image: "",
      },
      title: "",
      text: "",
    };
    res.status(200).json({});
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
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getTeam, updateTeam };
