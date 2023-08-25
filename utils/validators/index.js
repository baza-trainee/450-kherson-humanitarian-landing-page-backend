const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const auth = require('./auth');
const ctrlWrapper = require('./ctrlWrapper');
const modifyRequestBody = require('./modifyRequestBody');

module.exports = {
  validateBody,
  isValidId,
  auth,
  ctrlWrapper,
  modifyRequestBody,
};
