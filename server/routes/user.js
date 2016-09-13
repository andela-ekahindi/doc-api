/* eslint new-cap: "off" */
const express = require("express");

const router = express.Router();
const UserCtrl = require("../controllers/user");
const Authentic = require("../controllers/middleware");

router.route("/users/login")
  .post(UserCtrl.LoginUser);

router.route("/users")
  .post(UserCtrl.CreateOneUser);

router.use(Authentic.Auth);

router.route("/users")
  .get(UserCtrl.GetAllUsers);

router.route("/users/:id")
  .get(UserCtrl.GetOneUser)
  .delete(UserCtrl.DeleteOneUser)
  .put(UserCtrl.UpdateOneUser);

module.exports = router;
