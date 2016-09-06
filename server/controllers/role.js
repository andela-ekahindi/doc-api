var Role = require("../models/role");

var RoleCtrl = {
    CreateOneRole: function(req, res) {
        if (!req.body.title) {
            return res.status(400).json({
                status: false,
                error: "Title required"
            });
        }
        var role = new Role();
        role.title = req.body.title;
        role.save(function(err, role) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err
                });
            } else {
                return res.status(201).json({
                    status: true,
                    role: role
                });
            }
        });
    },
    GetAllRoles: function(req, res) {
        Role.find(function(err, roles) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err
                });
            } else {
                return res.status(200).json({
                    status: true,
                    role: roles
                });
            }
        });
    },
    GetOneRole: function(req, res) {
        Role.findById(req.params.id, function(err, role) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err
                });
            } else {
                return res.status(200).json({
                    status: true,
                    role: role
                });
            }
        });
    },
    UpdateOneRole: function(req, res) {
        Role.findById(req.params.id, function(err, role) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err
                });
            } else {
                role.title = req.body.title;
                role.save(function(err) {
                    if (err) {
                        return res.status(400).json({
                            status: false,
                            error: err
                        });
                    } else {
                        return res.status(200).json({
                            status: true,
                            role: role
                        });
                    }
                });
            }

        });
    },

    DeleteOneRole: function(req, res) {
        Role.remove({
            _id: req.params.id
        }, function(err) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err
                });
            } else {
                return res.json({
                    status: true,
                    role: null
                });
            }
        });
    }
};

module.exports = RoleCtrl;