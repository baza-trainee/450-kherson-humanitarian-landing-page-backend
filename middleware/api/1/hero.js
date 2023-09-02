/**
 * Check if Hero object is valid .
 */

function isValidHero(req, res, next) {
  //console.log(req.headers);
  console.log(req.body);
  next();
  /*
  if (req.method === "OPTIONS") {
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      return res.status(403).json({message: "Користувач не авторизований"})
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedData;
    next();
  }catch (err) {
    return res.status(403).json({message: "Користувач не авторизований"})
  }*/
}

module.exports = {
  isValidHero
};
