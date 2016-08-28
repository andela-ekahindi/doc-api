var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Document = require('../models/document');
var DocumentCtrl = require('../controllers/document');

router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
}); 


router.route('/documents')
	.post(DocumentCtrl.CreateOneDoc)
	.get(DocumentCtrl.GetAllDocs);

router.route('/documents/:id')
	.get(DocumentCtrl.GetOneDoc)
	.delete(DocumentCtrl.DeleteOneDoc);

module.exports = router;