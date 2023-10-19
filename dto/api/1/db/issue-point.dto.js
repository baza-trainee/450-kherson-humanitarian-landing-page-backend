/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

class IssuePointDTO {
  constructor(geolocation, locationDeliveryPoint) {
    this.geolocation = btoa(geolocation);
    this.locationDeliveryPoint = locationDeliveryPoint;
  }
}

module.exports = IssuePointDTO;
