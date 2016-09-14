/* eslint new-cap: "off" */
const express = require("express");

const router = express.Router();

const Role = require("../controllers/role");
const Access = require("../controllers/middleware");

router.use(Access.Auth);
router.route("/roles")
  .post(Access.AdminAccess, Role.create)
  .get(Access.AdminAccess, Role.all);

router.route("/roles/:id")
  .get(Access.AdminAccess, Role.get)
  .put(Access.AdminAccess, Role.update)
  .delete(Access.AdminAccess, Role.delete);

module.exports = router;
