var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var RoleCtrl = require('../controllers/role');

router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
}); 


router.route('/roles')
	.post(RoleCtrl.CreateOneRole)
	.get(RoleCtrl.GetAllRoles);

router.route('/roles/:id')
	.get(RoleCtrl.GetOneRole)
	.delete(RoleCtrl.DeleteOneRole);

module.exports = router;