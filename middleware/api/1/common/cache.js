/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const requestsConfig = require("../../../../config/api/v1/requests");

const setCache = function (req, res, next) {
  if (req.method === "GET") {
    res.set(
      "Cache-Control",
      `public, max-age=${requestsConfig.cacheGetPeriod}`
    );
  } else {
    res.set("Cache-Control", `no-store`);
  }

  next();
};

app.use(setCache);
