/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

var express = require("express");
var router = express.Router();
const controller = require("../controllers/auth");
const {
  hasValidTocken,
  isLoginCorrespondsConditions,
  isPasswordCorrespondsConditions,
} = require("../middleware/auth");

router.post(
  "/login",
  isLoginCorrespondsConditions,
  isPasswordCorrespondsConditions,
  controller.login
);
router.post("/renew", isLoginCorrespondsConditions, controller.renewPassword);
router.post(
  "/change",
  hasValidTocken,
  isPasswordCorrespondsConditions,
  controller.changePassword
);
router.get("/renew/:link", controller.renewPasswordLink);

module.exports = router;
