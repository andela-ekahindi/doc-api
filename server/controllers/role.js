var Role = require('../models/role');
var bodyParser = require('body-parser');

var RoleCtrl = {
	CreateOneRole:function (req, res) {
		var role = new Role();
		role.title = req.body.title;
		
        role.save(function(err, todo){
          	if(err) {
                res.json({status: false, error: "Something went wrong"});
            } else {
            	res.json({status: true, message: "Role Saved"});
            }
        });
	},
	GetAllRoles: function (req, res) {
		Role.find(function(err, roles){
            if(err){
            	res.json({status: false, error: "Something went wrong"});
            }else{
            	res.json(roles);
            }
        });
	},
	GetOneRole:function (req, res) {
		Role.findById(req.params.role_id, function (err, role) {
            if (err){
                res.send(err);
            }else{
            	res.json(role);
            }
    	});
	},

	DeleteOneRole: function(req, res){
        Role.remove({_id: req.params.id}, function(err, role){
            if(err) {
            	res.json({status: false, error: "Deleting role did not happen"});
            }else{
            	res.json({status: true, message: "Deleted successfully"});
            }
        });
    }
};

module.exports = RoleCtrl;