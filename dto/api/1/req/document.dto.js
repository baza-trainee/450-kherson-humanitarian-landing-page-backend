/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const cfgApp = require("../../../../config/app");

class DocumentDTO {
  constructor(fileName) {
    this.route = `${cfgApp.publicResources.documents.route}/${fileName}`;
  }
}

module.exports = DocumentDTO;
