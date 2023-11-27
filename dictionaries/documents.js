/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

function mapDocumentFileNameToObjectProperty() {
  const map = new Map();
  map.set("Terms_of_use", "rules");
  map.set("Public_Offer", "contract");
  map.set("Privacy_Policy", "privacy");
  map.set("Constitution", "statut");
  return map;
}

function mapObjectPropertyToDocumentFileName() {
  const map = new Map();
  for (const element of mapDocumentFileNameToObjectProperty()) {
    map.set(element[1], element[0]);
  }
  return map;
}

module.exports = {
  mapDocumentFileNameToObjectProperty,
  mapObjectPropertyToDocumentFileName,
};
