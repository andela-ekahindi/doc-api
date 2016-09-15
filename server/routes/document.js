/* eslint new-cap: "off" */
const express = require("express");
const Authen = require("../controllers/middleware");

const router = express.Router();
const Documents = require("../controllers/document");


router.use(Authen.Auth);

router.route("/documents")
  .post(Documents.create)
  .get(Documents.all);


router.route("/documents/:id")
  .get(Documents.get)
  .put(Documents.update)
  .delete(Documents.delete);

router.route("/:user_id/documents")
  .get(Documents.getByUser);

router.get("/search", Documents.findByRole);

module.exports = router;
