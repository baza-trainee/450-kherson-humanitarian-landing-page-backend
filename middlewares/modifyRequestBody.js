const modifyRequestBody = (req, res, next) => {
  // Assuming passportSeries and passportNumber are fields in req.body
  const { passportSeries = '', passportNumber = '', idCard = '' } = req.body;

  // Join passportSeries and passportNumber into a single passport field

  if (passportSeries !== '' && passportNumber !== '') {
    req.body.passport = passportSeries + passportNumber;
    delete req.body.passportSeries;
    delete req.body.passportNumber;
  } else if (idCard !== '') {
    req.body.passport = idCard;
    delete req.body.idCard;
  }

  // const passport = passportSeries + passportNumber;
  // console.log(req.body.idCard);
  // console.log(req.body.passport);
  // console.log(req.body);
  next();
};

module.exports = modifyRequestBody;
