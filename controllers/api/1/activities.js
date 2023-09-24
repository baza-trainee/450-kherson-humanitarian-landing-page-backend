/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const createActivity = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getActivities = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getActivityById = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateActivity = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const deleteActivity = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
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
