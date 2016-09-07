var User = require("../models/user");
var jwt = require("jsonwebtoken");

var UserCtrl = {
    CreateOneUser: function(req, res) {
        if (!req.body.username) {
            return res.status(400).json({
                status: false,
                error: "username required"
            });
        }
        if (!req.body.name.first) {
            return res.status(400).json({
                status: false,
                error: "first name required"
            });
        }
        if (!req.body.name.last) {
            return res.status(400).json({
                status: false,
                error: "last name required"
            });
        }
        if (!req.body.email) {
            return res.status(400).json({
                status: false,
                error: "email required"
            });
        }
        if (!req.body.password) {
            return res.status(400).json({
                status: false,
                error: "password required"
            });
        }
        var user = new User();
        user.username = req.body.username;
        user.name.first = req.body.name.first;
        user.name.last = req.body.name.last;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function(err, user) {
            if (err) {
                return res.status(400).json({
                    status: false,
                    error: err
                });
            } else {
                return res.status(201).json({
                    status: true,
                    user: user
                });
            }
        });
    },
    GetAllUsers: function(req, res) {
        User.find(function(err, users) {
            if (err) {
                return res.status(400).json({
                    status: false,
                    error: err
                });
            } else {
                res.json(users);
            }
        });
    },
    GetOneUser: function(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                return res.status(400).json({
                    status: false,
                    error: err
                });
            } else {
                res.json(user);
            }
        });
    },

    DeleteOneUser: function(req, res) {
        User.remove({
            _id: req.params.id
        }, function(err) {
            if (err) {
                return res.status(400).json({
                    status: false,
                    error: err
                });
            } else {
                res.json({
                    status: true,
                    message: "Deleted successfully"
                });
            }
        });
    },
    LoginUser: function(req, res) {
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) {
                return res.status(400).json({
                    status: false,
                    error: err
                });
            } else if (!user) {
                res.json({
                    status: false,
                    error: "User not Found"
                });
            } else if (user) {
                if (user.password != req.body.password) {
                    res.json({
                        status: false,
                        error: "Wrong password"
                    });
                } else {
                    var token = jwt.sign(user, req.app.get("Secret"), {
                        expiresIn: "14d"
                    });
                    return res.status(200).json({
                        status: true,
                        message: "You are Login in",
                        token: token,
                        user: user
                    });
                }

            }
        });
    },
    LogoutUser: function (req, res) {
        req.decoded = null;
        return res.status(200).json({status: true, user: "Logged Out"});
    }
};

module.exports = UserCtrl;