/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

class AchievementsDTO {
  constructor(
    issuedHumanitarianKits,
    receivedHumanitarianAid,
    sumDonats,
    infoAtDate
  ) {
    this.issuedHumanitarianKits = issuedHumanitarianKits;
    this.receivedHumanitarianAid = receivedHumanitarianAid;
    this.sumDonats = sumDonats;
    this.infoAtDate = infoAtDate;
  }
}

module.exports = AchievementsDTO;
