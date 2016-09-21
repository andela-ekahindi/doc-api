const Role = require('../models/role');

const RoleCtrl = {
  create(req, res) {
    if (!req.body.title) {
      return res.status(400).send({ error: 'Title required' });
    }

    const rol = new Role();
    rol.title = req.body.title;

    rol.save((error, role) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.status(201).send(role);
    });
  },
  all(req, res) {
    Role.find((error, roles) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.status(200).send(roles);
    });
  },
  get(req, res) {
    Role.findById(req.params.id, (error, role) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.status(200).send(role);
    });
  },
  update(req, res) {
    Role.findById(req.params.id, (error, role) => {
      if (error) {
        return res.status(500).send(error);
      }

      role.title = req.body.title;
      role.save((error) => {
        if (error) {
          return res.status(400).send(error);
        }
        return res.status(200).send(role);
      });
    });
  },

  delete(req, res) {
    Role.remove({ _id: req.params.id }, (error, role) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.send(role);
    });
  },
};

module.exports = RoleCtrl;
