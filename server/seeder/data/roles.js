// var fakery = require('mongoose-fakery');
// var mongoose = require('mongoose');
// var Role = require('../../models/role');

var fakeRole = {
	SuperUser: {title: 'SuperUser'},
	Admin: 	   {title: 'Admin'},
	User:	   {title: 'User'}
};

module.exports = fakeRole;

// var fakeRole = {
// 	SuperUser: fakery.fake('role2', mongoose.model('Role'), 
// 						{title: 'SuperUser'}),
// 	Admin: fakery.fake('role1', mongoose.model('Role'), 
// 						{title: 'Admin'}),
// 	User: fakery.fake('role2', mongoose.model('Role'), 
// 						{title: 'User'}),
// };