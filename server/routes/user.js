var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var UserCtrl = require('../controllers/user');
var AuthCtrl = require('../controllers/auth');

router.route('/users/login')
	.post(UserCtrl.LoginUser);

router.route('/users')
	.post(UserCtrl.CreateOneUser);

//middleware to the protect the API routes
//without we cant access the routes below


router.use(AuthCtrl.Auth); 


router.route('/users')
	.get(UserCtrl.GetAllUsers);

router.route('/users/:id')
	.get(UserCtrl.GetOneUser)
	.delete(UserCtrl.DeleteOneUser);

router.route('/users/logout')
	.post(UserCtrl.LogoutUser);


module.exports = router;