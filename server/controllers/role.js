/* eslint no-underscore-dangle: "off" */
/* eslint no-param-reassign: "off" */
/* eslint consistent-return: "off" */
/* eslint no-shadow: "off"*/

const Role = require("../models/role");

const RoleCtrl = {
  CreateOneRole(req, res) {
    if (!req.body.title) { return res.status(400).json({ status: false, error: "Title required" }); }
    const rol = new Role();
    rol.title = req.body.title;
    rol.save((err, role) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      return res.status(201).json({ status: true, role });
    });
  },
  GetAllRoles(req, res) {
    Role.find((err, roles) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      return res.status(200).json({ status: true, role: roles });
    });
  },
  GetOneRole(req, res) {
    Role.findById(req.params.id, (err, role) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      return res.status(200).json({ status: true, role });
    });
  },
  UpdateOneRole(req, res) {
    Role.findById(req.params.id, (err, role) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      role.title = req.body.title;
      role.save((err) => {
        if (err) { return res.status(400).json({ status: false, error: err }); }
        return res.status(200).json({ status: true, role });
      });
    });
  },

  DeleteOneRole(req, res) {
    Role.remove({ _id: req.params.id }, (err) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      return res.json({ status: true, role: null });
    });
  },
};

module.exports = RoleCtrl;
