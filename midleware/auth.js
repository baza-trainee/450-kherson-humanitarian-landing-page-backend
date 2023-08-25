const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      return res.status(403).json({message: "Користувач не авторизований"})
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    request.user = decodedData;
    next();
  }catch (err) {
    return res.status(403).json({message: "Користувач не авторизований"})
  }
}