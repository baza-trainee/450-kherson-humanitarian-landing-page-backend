const address = require("./api/v1/address");

require("dotenv").config();

const isProduction = () => {
  if (process.env.NODE_ENV === "production") {
    return true;
  }
  return false;
};

module.exports = {
  servers: {
    MongoDB: {
      restartSec: 5 * 1000,
      selectionTimeout: 30 * 1000,
    },
    SMTPService: {
      restartSec: 5 * 1000,
    },
  },
  urls: {
    /*
    APP_URL: isProduction
      ? `${process.env.HOST_URL}`
      : `${process.env.HOST_URL}:${process.env.PORT}`, // For confirmation via mail service
      */
    APP_URL: isProduction
      ? `${process.env.HOST_URL}:${process.env.PORT}`
      : `${process.env.HOST_URL}`,
  },
  address: address,
};
