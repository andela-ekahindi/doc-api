/* eslint new-cap: "off" */
const express = require('express');

const router = express.Router();
const User = require('../controllers/user');
const Authentic = require('../controllers/middleware');

router.route('/users/login')
  .post(User.login);

router.route('/users')
  .post(User.create);

router.use(Authentic.Auth);

router.route('/users')
  .get(User.all);

router.route('/users/:id')
  .get(User.get)
  .delete(User.delete)
  .put(User.update);

router.route('/users/logout')
    .post(User.logout);

module.exports = router;
