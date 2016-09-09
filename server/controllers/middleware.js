let jwt = require("jsonwebtoken");
let config = require("../../config/config.js");


let MiddleWare = {
    Auth: function(req, res, next) {
        let token = req.body.token || req.query.token || req.headers["x-access-token"];
        if (token) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        error: err,
                        message: "Failed to authenticate token."
                    });

                } else {

                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            return res.status(401).send({
                status: true,
                message: "No token provided. Missing parameters"
            });

        }

    },
    AdminAccess: function(req, res, next) {
        if (req.decoded._doc.role === "Admin") {
            return next();
        } else {
            return res.status(403).json({
                status: false,
                message: "Unauthorized"
            })
        }
    }
};

module.exports = MiddleWare;