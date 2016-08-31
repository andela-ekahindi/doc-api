var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var UserCtrl = require('../controllers/user');
var LoginCtrl = require('../controllers/auth');
// router.set('Secret', config.secret); // secret variable

router.route('/users/login')
	.post(UserCtrl.LoginUser);

router.route('/users')
	.post(UserCtrl.CreateOneUser);

//middleware to the protect the API routes
//without we cant access the routes below


router.use(LoginCtrl.Login); 


router.route('/users')
	.get(UserCtrl.GetAllUsers);

router.route('/users/:id')
	.get(UserCtrl.GetOneUser)
	.delete(UserCtrl.DeleteOneUser);


module.exports = router;