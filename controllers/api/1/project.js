/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const createProject = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getProjects = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getProjectById = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateProject = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const deleteProject = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = {
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getProjects,
};
