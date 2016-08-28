var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var User = require('../models/user');
var UserCtrl = require('../controllers/user');

router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
}); 


router.route('/documents')
	.post(UserCtrl.CreateOneUser)
	.get(UserCtrl.GetAllUsers);

router.route('/documents/:id')
	.get(UserCtrl.GetOneUser)
	.delete(UserCtrl.DeleteOneUser);

module.exports = router;