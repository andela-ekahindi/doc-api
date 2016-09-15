/* eslint no-underscore-dangle: "off" */
/* eslint no-param-reassign: "off" */
/* eslint consistent-return: "off" */
/* eslint no-shadow: "off"*/

const User = require("../models/user");
const Role = require("../models/role");
const jwt = require("jsonwebtoken");

const UserCtrl = {
  create(req, res) {
    if (!req.body.username) { return res.status(400).json({ status: false, error: "username required" }); }
    if (!req.body.first) { return res.status(400).json({ status: false, error: "first name required" }); }
    if (!req.body.last) { return res.status(400).json({ status: false, error: "last name required" }); }
    if (!req.body.email) { return res.status(400).json({ status: false, error: "email required" }); }
    if (!req.body.password) { return res.status(400).json({ status: false, error: "password required" }); }

    const usr = new User();
    usr.username = req.body.username;
    usr.name = { first: req.body.first, last: req.body.last };
    usr.email = req.body.email;
    usr.password = usr.generateHash(req.body.password);

    if (!req.body.role) {
      Role.findOne({ title: "User" }, (err, rol) => {
        if (err) { return res.status(400).json({ status: false, error: err }); }
        usr.role = rol.title;
        usr.save((err, user) => {
          if (err) { return res.status(400).json({ status: false, error: err }); }
          return res.status(201).json({ status: true, user });
        });
      });
    } else {
      usr.role = req.body.role;
      usr.save((err, user) => {
        if (err) { return res.status(400).json({ status: false, error: err }); }
        return res.status(201).json({ status: true, user });
      });
    }
  },
  all(req, res) {
    User.find((err, users) => {
      if (err) { return res.status(400).json({ status: false, error: err }); }
      return res.status(200).json({ status: true, users });
    });
  },
  get(req, res) {
    User.findById(req.params.id, (err, user) => {
      if (err) { return res.status(400).json({ status: false, error: err }); }
      return res.status(200).json({ status: true, user });
    });
  },
  update(req, res) {
    User.findById({ _id: req.params.id }, (err, user) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }

      if (req.body.username) { user.username = req.body.username; }
      if (req.body.first) { user.name.first = req.body.first; }
      if (req.body.last) { user.name.last = req.body.last; }
      if (req.body.email) { user.email = req.body.email; }
      if (req.body.password) { user.password = user.generateHash(req.body.password); }
      user.save((err) => {
        if (err) { return res.status(500).json({ status: false, error: err }); }
        return res.status(200).send({ status: true, user });
      });
    });
  },
  delete(req, res) {
    User.remove({ _id: req.params.id }, (err) => {
      if (err) { return res.status(400).json({ status: false, error: err }); }
      return res.status(200).json({ status: true, user: null });
    });
  },
  login(req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) { return res.status(400).json({ status: false, error: err }); }
      if (!user) { return res.status(401).json({ status: false, error: "User not Found" }); }
      if (user) {
        if (!user.validPassword(req.body.password)) { return res.status(401).json({ status: false, error: "Wrong password" }); }
        const token = jwt.sign(user, req.app.get("Secret"), { expiresIn: "14d" });
        user.save((err) => {
          if (err) { return res.status(500).json({ status: false, error: err }); }
          return res.status(200).json({ status: true, message: "You are Login in", token, user });
        });
      }
    });
  },
  logout(req, res) {
    delete req.decoded;
    if (req.decoded) { return res.status(500).json({ status: false, error: "You didnot logout" }); }
    return res.status(200).json({ status: true, message: "Logged Out" });
  },
};

module.exports = UserCtrl;
