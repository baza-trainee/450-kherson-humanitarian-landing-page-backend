const idCardRegex = /^[0-9]{9}$/;
const passportRegEx = /^[A-ZА-ЯІ]{2}\d{6}$/;

const passportValidator = value => {
  return idCardRegex.test(value) || passportRegEx.test(value);
};

const passportValidatorJoi = (value, helpers) => {
  if (!idCardRegex.test(value) && !passportRegEx.test(value)) {
    return helpers.error('any.invalid');
  }

  return value;
};

const handlePassportValidation = {
  passportValidator,
  passportValidatorJoi,
};

module.exports = handlePassportValidation;
