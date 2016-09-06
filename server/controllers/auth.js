let jwt = require("jsonwebtoken");
let config = require("../../config/config.js");


let AuthCtrl = {
    Auth: function(req, res, next) {
        let token = req.body.token || req.query.token || req.headers["x-access-token"];
        if (token) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return res.json({
                        status: false,
                        message: "Failed to authenticate token."
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            return res.status(401).send({
                success: false,
                message: "No token provided. Missing parameters"
            });

        }

    }
};

module.exports = AuthCtrl;