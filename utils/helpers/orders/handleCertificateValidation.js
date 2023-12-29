const idpCertificateNumberRegEx = /^\d{4}-\d{10}$/;
const disabilityCertificateNumberRegEx = /^\d{6}$/;
const birthCertificateNumberRegEx = /^\d{6}$/;

const certificateValidator = value => {
  return (
    idpCertificateNumberRegEx.test(value) ||
    disabilityCertificateNumberRegEx.test(value) ||
    birthCertificateNumberRegEx.test(value)
  );
};

const certificateValidatorJoi = (value, helpers) => {
  if (
    !idpCertificateNumberRegEx.test(value) &&
    !disabilityCertificateNumberRegEx.test(value) &&
    !birthCertificateNumberRegEx.test(value)
  ) {
    return helpers.error('any.invalid');
  }
};

const handleCertificateValidation = {
  certificateValidator,
  certificateValidatorJoi,
};
module.exports = handleCertificateValidation;
