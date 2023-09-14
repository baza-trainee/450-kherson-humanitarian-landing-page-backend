const address = require("./api/v1/address");

require("dotenv").config();

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
    APP_URL: `${process.env.HOST_URL}`, // http://localhost:5000/
    API_URL: `${process.env.BACKEND_SERVER_URL}:${process.env.PORT}/api/v1/`,
    CLIENT_URL: `${process.env.BACKEND_SERVER_URL}:${process.env.PORT}`,
  },
  address: address,
};
