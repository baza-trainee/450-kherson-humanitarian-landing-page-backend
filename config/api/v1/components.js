/*
 * Copyright (c) 2023 Volodymyr Nerovnia
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
        minLength: 66,
        maxLength: 90,
      },
    },
    subtitle: {
      text: {
        minLength: 13,
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
      minLength: 12,
      maxLength: 45,
    },
    text: {
      minLength: 243,
      maxLength: 900,
    },
  },
  history: {
    picture: {
      maxSizeKb: 500,
    },
    title: {
      minLength: 12,
      maxLength: 45,
    },
    text: {
      minLength: 595,
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
      min: 100000,
      max: 999999999999,
    },
    infoAtDate: {
      minDate: "08/01/2023",
      maxDate: new Date(),
    },
  },
  issuepoint: {
    locationDeliveryPoint: {
      minLength: 35,
      maxLength: 78,
    },
    geolocation: {
      minLength: 400,
      maxLength: 630,
    },
  },
  activity: {
    picture: {
      maxSizeKb: 500,
    },
  },
  projects: {
    pictures: {
      maxSizeKb: 500,
    },
    title: {
      minLength: 56,
      maxLength: 73,
    },
    subTitle: {
      minLength: 82,
      maxLength: 125,
    },
    text: {
      minLength: 236,
      maxLength: 503,
    },
    areaCompletedWorks: {
      minLength: 3,
      maxLength: 100,
    },
    projectDuration: {
      minLength: 20,
      maxLength: 29,
    },
    projectText: {
      minLength: 60,
      maxLength: 248,
    },
  },
  logos: {
    pictures: {
      maxSizeKb: 500,
    },
  },
  contacts: {
    email: {
      minLength: 8,
      maxLength: 33,
    },
    address: {
      minLength: 71,
      maxLength: 108,
    },
    phone: {
      minLength: 9,
      maxLength: 13,
    },
  },
  documents: {
    rules: {
      maxSizeMb: 50 * 1024 * 1024,
    },
    publicOfferContract: {
      maxSizeMb: 50 * 1024 * 1024,
    },
    privacy: {
      maxSizeMb: 50 * 1024 * 1024,
    },
    statut: {
      maxSizeMb: 50 * 1024 * 1024,
    },
    reporting: {
      maxSizeMb: 50 * 1024 * 1024,
    },
  },
  congrats: {
    confirmRegistration: {
      chapterText: {
        minLength: 80,
        maxLength: 120,
      },
    },
  },
  donats: {
    currency: {
      minLength: 3,
      maxLength: 3,
    },
    recipient: {
      minLength: 40,
      maxLength: 98,
    },
    IBAN: {
      minLength: 29,
      maxLength: 29,
    },
    IPN: {
      minLength: 8,
      maxLength: 10,
    },
    paymentPurpose: {
      minLength: 18,
      maxLength: 40,
    },
  },
};
