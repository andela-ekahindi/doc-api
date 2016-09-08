var express = require('express');
var mongoose = require('mongoose');
var Authen = require('../controllers/middleware');
var router = express.Router();
var DocumentCtrl = require('../controllers/document');

// router.use(function(req, res, next) {
//     // do logging
//     next(); // make sure we go to the next routes and don't stop here
// }); 

router.use(Authen.Auth); 

router.route('/documents')
	.post(DocumentCtrl.CreateOneDoc)
	.get(DocumentCtrl.GetAllDocs);

// router.route('/documents/:date')
// 	.get(DocumentCtrl.GetAllDocs);

router.route('/documents/:id')
	.get(DocumentCtrl.GetOneDoc)
	.put(DocumentCtrl.UpdateOneDoc)
	.delete(DocumentCtrl.DeleteOneDoc);

router.route('/:user_id/documents')
	.get(DocumentCtrl.FindAllDocByUser);


module.exports = router;