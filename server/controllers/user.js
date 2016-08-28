var User = require('../models/user');
var bodyParser = require('body-parser');

var UserCtrl = {
	CreateOneUser:function (req, res) {
		var user = new User();
		user.username = req.body.username;
		user.name.first = req.body.name.first;
        user.name.last = req.body.name.last;
        user.email = req.body.email;
        user.password = req.body.password;
		
        user.save(function(err, todo){
          	if(err) {
                res.json({status: false, error: "Something went wrong"});
            } else {
            	res.json({status: true, message: "User Saved"});
            }
        });
	},
	GetAllUsers: function (req, res) {
		User.find(function(err, users){
            if(err){
            	res.json({status: false, error: "Something went wrong"});
            }else{
            	res.json(users);
            }
        });
	},
	GetOneUser:function (req, res) {
		User.findById(req.params.id, function (err, user) {
            if (err){
                res.send(err);
            }else{
            	res.json(user);
            }
    	});
	},

	DeleteOneUser: function(req, res){
        User.remove({_id: req.params.id}, function(err, user){
            if(err) {
            	res.json({status: false, error: "Deleting User did not happen"});
            }else{
            	res.json({status: true, message: "Deleted successfully"});
            }
        });
    }
};

module.exports = UserCtrl;