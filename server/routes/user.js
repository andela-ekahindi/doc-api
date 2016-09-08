var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var UserCtrl = require('../controllers/user');
var Authentic = require('../controllers/middleware');

router.route('/users/login')
	.post(UserCtrl.LoginUser);

router.route('/users')
	.post(UserCtrl.CreateOneUser);

router.use(Authentic.Auth); 


router.route('/users')
	.get(UserCtrl.GetAllUsers);

router.route('/users/:id')
	.get(UserCtrl.GetOneUser)
	.delete(UserCtrl.DeleteOneUser);

router.route('/users/logout')
	.post(UserCtrl.LogoutUser);


module.exports = router;