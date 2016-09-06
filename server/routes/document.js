var express = require('express');
var mongoose = require('mongoose');
var AuthCtrl = require('../controllers/auth');
var router = express.Router();
var DocumentCtrl = require('../controllers/document');

// router.use(function(req, res, next) {
//     // do logging
//     next(); // make sure we go to the next routes and don't stop here
// }); 

router.use(AuthCtrl.Auth); 

router.route('/documents')
	.post(DocumentCtrl.CreateOneDoc)
	.get(DocumentCtrl.GetAllDocs);

router.route('/documents/:limit')
	.get(DocumentCtrl.GetAllDocs);

router.route('/documents/:id')
	.get(DocumentCtrl.GetOneDoc)
	.put(DocumentCtrl.UpdateOneDoc)
	.delete(DocumentCtrl.DeleteOneDoc);

router.route('/documents/:limit/:next')
	.get(DocumentCtrl.GetAllDocs);

module.exports = router;