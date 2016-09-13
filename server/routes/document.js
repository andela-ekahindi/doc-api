/* eslint new-cap: "off" */
const express = require("express");
const Authen = require("../controllers/middleware");

const router = express.Router();
const DocumentCtrl = require("../controllers/document");


router.use(Authen.Auth);

router.route("/documents")
  .post(DocumentCtrl.CreateOneDoc)
  .get(DocumentCtrl.GetAllDocs);

router.route("/documents/:id")
  .get(DocumentCtrl.GetOneDoc)
  .put(DocumentCtrl.UpdateOneDoc)
  .delete(DocumentCtrl.DeleteOneDoc);

router.route("/:user_id/documents")
  .get(DocumentCtrl.FindAllDocByUser);


module.exports = router;
