var Role = require('../models/role');
var bodyParser = require('body-parser');

var RoleCtrl = {
	CreateOnerole:function (req, res) {
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
	GetAllroles: function (req, res) {
		Role.find(function(err, roles){
            if(err){
            	res.json({status: false, error: "Something went wrong"});
            }else{
            	res.json(roles);
            }
        });
	},
	GetOnerole:function (req, res) {
		Role.findById(req.params.role_id, function (err, role) {
            if (err){
                res.send(err);
            }else{
            	res.json(role);
            }
    	});
	},

	DeleteOnerole: function(req, res){
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