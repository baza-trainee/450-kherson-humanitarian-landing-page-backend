/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const getIssuePoint = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateIssuePoint = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getIssuePoint, updateIssuePoint };
