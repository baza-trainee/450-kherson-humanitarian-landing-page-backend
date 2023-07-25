const isConflict = ({ name, code }) => name === 'MongoServerError' && code === 11000;

const handleSchemaValidationErrors = (error, data, next) => {
  error.status = isConflict(error) ? 409 : 400;
  error.message = `user with phone ${data.phone} already exist`;
  next();
};

module.exports = handleSchemaValidationErrors;
