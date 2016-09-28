const User = require('../models/user');
const Role = require('../models/role');
const jwt = require('jsonwebtoken');

const UserCtrl = {
  create(req, res) {
    if (!req.body.username) {
      return res.status(400).send({ error: 'username required' });
    }

    if (!req.body.first) {
      return res.status(400).send({ error: 'first name required' });
    }

    if (!req.body.last) {
      return res.status(400).send({ error: 'last name required' });
    }
    if (!req.body.email) {
      return res.status(400).send({ error: 'email required' });
    }

    if (!req.body.password) {
      return res.status(400).send({ error: 'password required' });
    }

    const usr = new User();
    usr.username = req.body.username;
    usr.name = {
      first: req.body.first,
      last: req.body.last,
    };
    usr.email = req.body.email;
    usr.password = usr.generateHash(req.body.password);

    if (!req.body.role) {
      Role.findOne({ title: 'User' }, (error, rol) => {
        if (error) {
          return res.status(400).send(error);
        }
        usr.role = rol.title;
        usr.save((error, user) => {
          if (error) {
            return res.status(400).send(error);
          }
          const sign = {};
          sign._id = user._id;
          sign.email = user.email;
          sign.role = user.role;
          const token = jwt.sign(sign, req.app.get('Secret'),
            { expiresIn: '14d' }
          );
          return res.status(201).send({ user, token });
        });
      });
    } else {
      usr.role = req.body.role;
      usr.save((error, user) => {
        if (error) {
          return res.status(400).send(error);
        }
        const sign = {};
        sign._id = user._id;
        sign.email = user.email;
        sign.role = user.role;
        const token = jwt.sign(sign, req.app.get('Secret'),
          { expiresIn: '14d' }
        );
        return res.status(201).send({ user, token });
      });
    }
  },
  all(req, res) {
    User.find((error, users) => {
      if (error) {
        return res.status(400).send(error);
      }
      return res.status(200).send(users);
    });
  },
  get(req, res) {
    User.findById(req.params.id, (error, user) => {
      if (error) {
        return res.status(400).send(error);
      }
      return res.status(200).send(user);
    });
  },
  update(req, res) {
    User.findById({ _id: req.params.id }, (error, user) => {
      if (error) {
        return res.status(500).send(error);
      }

      if (req.body.username) {
        user.username = req.body.username;
      }
      if (req.body.first) {
        user.name.first = req.body.first;
      }
      if (req.body.last) {
        user.name.last = req.body.last;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.password) {
        user.password = user.generateHash(req.body.password);
      }
      user.save((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(user);
      });
    });
  },
  delete(req, res) {
    User.remove({ _id: req.params.id }, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send(user);
    });
  },
  login(req, res) {
    User.findOne({ email: req.body.email }, (error, user) => {
      if (error) {
        return res.status(400).send(error);
      }
      if (!user) {
        return res.status(401).send({ error: 'User not Found' });
      }
      if (user) {
        if (!user.validPassword(req.body.password)) {
          return res.status(401).send({ error: 'Wrong password' });
        }
        const sign = {};
        sign._id = user._id;
        sign.email = user.email;
        sign.role = user.role;
        const token = jwt.sign(sign, req.app.get('Secret'),
        { expiresIn: '14d' }
      );
        user.save((error) => {
          if (error) {
            return res.status(500).send(error);
          }
          return res.status(200).json({ token, user });
        });
      }
    });
  },
  logout(req, res) {
    delete req.decoded;
    if (req.decoded) {
      return res.status(500).send({ error: 'You did not logout' });
    }
    return res.status(200).send({ message: 'Logged Out' });
  },
};

module.exports = UserCtrl;
