var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var RoleCtrl = require('../controllers/role');
var Access = require('../controllers/middleware');


router.use(Access.Auth); 
router.route('/roles' )
	.post(Access.AdminAccess, RoleCtrl.CreateOneRole)
	.get(Access.AdminAccess, RoleCtrl.GetAllRoles);

router.route('/roles/:id')
	.get(Access.AdminAccess, RoleCtrl.GetOneRole)
	.put(Access.AdminAccess, RoleCtrl.UpdateOneRole)
	.delete(Access.AdminAccess, RoleCtrl.DeleteOneRole);

module.exports = router;