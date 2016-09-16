const jwt = require("jsonwebtoken");
const config = require("../../config/config.js");

const MiddleWare = {
  Auth(req, res, next) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) { return res.status(500).json({ status: false, error: err, message: "Failed to authenticate token." }); }
        req.decoded = decoded;
        return next();
      });
    } else {
      return res.status(401).send({ status: true, message: "No token provided. Missing parameters" });
    }
  },
  AdminAccess(req, res, next) {
    if (req.decoded._doc.role === "User") { return res.status(403).json({ status: false, message: "Unauthorized" }); }
    return next();
  },
};

module.exports = MiddleWare;
