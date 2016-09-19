const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');

const MiddleWare = {
  Auth(req, res, next) {
    const token = req.body.token || req.query.token ||
      req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(500).send({ error: err });
        }

        req.decoded = decoded;
        return next();
      });
    } else {
      return res.status(401).send({
        error: 'No token provided. Missing parameters',
      });
    }
  },
  AdminAccess(req, res, next) {
    if (req.decoded._doc.role === 'Admin') { return next(); }
    return res.status(403).send({ error: 'Unauthorized' });
  },
};

module.exports = MiddleWare;
