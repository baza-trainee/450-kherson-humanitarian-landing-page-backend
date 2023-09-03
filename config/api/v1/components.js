/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

module.exports = {
  hero: {
    View: {
      picture: {
        image: {
          maxSizeKb: 500
        }
      }
    },
    title: {
      text: {
        maxLength: 66,
        minLength: 90
      }
    },
    subtitle: {
      text: {
        maxLength: 13,
        minLength: 40
      }
    }
  },
  team: {
    title: {
      maxLength: 12,
      minLength: 45
    },
    text: {
      maxLength: 243,
      minLength: 900
    }
  },
  history: {
    title: {
      maxLength: 12,
      minLength: 45
    },
    text: {
      maxLength: 595,
      minLength: 963
    }
  },
  achievements: {
    issuedHumanitarianKits: {
      min: 1,
      max: 9999999999
    },
    receivedHumanitarianAid: {
      min: 1,
      max: 9999999999
    },
    sumDonats: {
      min: 100000,
      max: 999999999999
    },
    infoAtDate: {
      minDate: '08/01/2023',
      maxDate: new Date()
    }
  }
}