const Role = require('../models/role');

const RoleCtrl = {
  create(req, res) {
    if (!req.body.title) { return res.status(400).json({ status: false, error: 'Title required' }); }
    const rol = new Role();
    rol.title = req.body.title;
    rol.save((err, role) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      return res.status(201).json({ status: true, role });
    });
  },
  all(req, res) {
    Role.find((err, roles) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      return res.status(200).json({ status: true, role: roles });
    });
  },
  get(req, res) {
    Role.findById(req.params.id, (err, role) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      return res.status(200).json({ status: true, role });
    });
  },
  update(req, res) {
    Role.findById(req.params.id, (err, role) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      role.title = req.body.title;
      role.save((err) => {
        if (err) { return res.status(400).json({ status: false, error: err }); }
        return res.status(200).json({ status: true, role });
      });
    });
  },

  delete(req, res) {
    Role.remove({ _id: req.params.id }, (err) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      return res.json({ status: true, role: null });
    });
  },
};

module.exports = RoleCtrl;
