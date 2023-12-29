/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

module.exports = {
  hero: {
    View: {
      picture: {
        maxSizeKb: 500,
      },
    },
    title: {
      text: {
        minLength: 1,
        maxLength: 90,
      },
    },
    subtitle: {
      text: {
        minLength: 1,
        maxLength: 40,
      },
    },
  },
  fund: {
    picture: {
      maxSizeKb: 500,
    },
  },
  team: {
    picture: {
      maxSizeKb: 500,
    },
    title: {
      minLength: 1,
      maxLength: 45,
    },
    text: {
      minLength: 1,
      maxLength: 900,
    },
  },
  history: {
    picture: {
      maxSizeKb: 500,
    },
    title: {
      minLength: 1,
      maxLength: 45,
    },
    text: {
      minLength: 1,
      maxLength: 963,
    },
  },
  achievement: {
    issuedHumanitarianKits: {
      min: 1,
      max: 9999999999,
    },
    receivedHumanitarianAid: {
      min: 1,
      max: 9999999999,
    },
    sumDonats: {
      min: 1,
      max: 999999999999,
    },
    infoAtDate: {
      minDate: "08/01/2023",
      maxDate: new Date(),
    },
  },
  issuepoint: {
    locationDeliveryPoint: {
      minLength: 1,
      maxLength: 78,
    },
    geolocation: {
      minLength: 1,
      maxLength: 630,
    },
  },
  activity: {
    picture: {
      maxSizeKb: 500,
    },
  },
  projects: {
    title: {
      minLength: 1,
      maxLength: 73,
    },
    stages: new Map([
      ["funding-await", "очікує на фінансування"],
      ["in-process", "в процесі"],
      ["completed", "Завершено"],
    ]),
    videoLink: {
      minLength: 1,
      maxLength: 170,
    },
    subTitle: {
      minLength: 1,
      maxLength: 125,
    },
    text: {
      minLength: 1,
      maxLength: 503,
    },
    areaCompletedWorks: {
      minLength: 1,
      maxLength: 100,
    },
    projectDuration: {
      minLength: 1,
      maxLength: 29,
    },
    projectText: {
      minLength: 1,
      maxLength: 248,
    },
    pictures: {
      maxSizeKb: 500,
    },
  },
  logos: {
    pictures: {
      maxSizeKb: 500,
    },
  },
  contacts: {
    email: {
      minLength: 1,
      maxLength: 33,
    },
    address: {
      minLength: 1,
      maxLength: 108,
    },
    phone: {
      minLength: 1,
      maxLength: 13,
    },
  },
  documents: [
    [
      "rules",
      {
        name: "Terms_of_use",
        maxSizeMb: 10,
      },
    ],
    [
      "contract",
      {
        name: "contract",
        maxSizeMb: 10,
      },
    ],
    [
      "privacy",
      {
        name: "Privacy_Policy",
        maxSizeMb: 10,
      },
    ],
    [
      "statut",
      {
        name: "Constitution",
        maxSizeMb: 10,
      },
    ],
    [
      "reporting",
      {
        name: "Report",
        maxSizeMb: 10,
      },
    ],
  ],
  congrats: {
    confirmRegistration: {
      chapterText: {
        minLength: 80,
        maxLength: 120,
      },
    },
  },
  donats: {
    recipient: {
      minLength: 1,
      maxLength: 98,
    },
    paymentPurpose: {
      minLength: 1,
      maxLength: 40,
    },
  },
};
