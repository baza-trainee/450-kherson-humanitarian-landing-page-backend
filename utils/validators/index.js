const isValidId = require('./orders/isValidId');
const modifyRequestBody = require('./orders/modifyRequestBody');
const validateBody = require('./orders/validateBody');

module.exports = {
  validateBody,
  isValidId,
  modifyRequestBody,
};
