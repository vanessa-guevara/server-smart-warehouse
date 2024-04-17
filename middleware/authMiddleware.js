
const jwt = require('jsonwebtoken');
const jsonSecretKey = process.env.JSON_SECRET_KEY;

function getToken(req) {
  if (!req.headers.authorization) return null;
  return req.headers.authorization.split(' ')[1];
}

const authenticateToken = (req, res, next) => {

  if (req.path === '/user/signup' || req.path === '/user/login') {
    return next();
  }

  const token = getToken(req);
  if (token) {
    try {
      const decoded = jwt.verify(token, jsonSecretKey);
      req.decode = decoded;
      next();
    } catch (err) {
      res.status(403).json({ success: false, message: 'Not Authorized. Invalid token.' });
    }
  } else {
    res.status(403).json({ success: false, message: 'No token provided. Unauthorized.' });
  }
};


module.exports = authenticateToken;

