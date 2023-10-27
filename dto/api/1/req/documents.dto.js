/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

class DocumentsDTO {
  constructor(rules, contract, privacy, statut, reporting) {
    if (rules !== "") this.rules = rules;
    if (contract !== "") this.contract = contract;
    if (privacy !== "") this.privacy = privacy;
    if (statut !== "") this.statut = statut;
    if (reporting !== "") this.reporting = reporting;
  }
}

module.exports = DocumentsDTO;
