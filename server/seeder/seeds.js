var seeder = require('mongoose-seed');
var Document = require('../models/document.js');
var Role = require('../models/role.js');
var User = require('../models/user.js');
// var UserData = require('../Fake Data/user.js');
var RoleData = require('./Data/roles');
// var DocumentData = require('./Fake Data/document.js');
 
// Connect to MongoDB via Mongoose 
seeder.connect('mongodb://localhost/docs', function() {
 
    // Load Mongoose models 
    seeder.loadModels([
        // '../models/document.js',
        '../models/role.js',
        // '../models/user.js'
    ]);
 
    // Clear specified collections 
    seeder.clearModels(['Document', 'Role', 'User'], function() {
 
        // Callback to populate DB once collections have been cleared 
        	return  seeder.populateModels(data);

    });
  //   seeder.clearModels(['Document', 'Role', 'User'], function() {
  //       	seeder.populateModels(data);

  //   }).then(function() {
  //   // The database objects are stored in dbData
  //   		console.log("Here");
		// }).catch(function(err) {
  //   // handle error
		// });
});
 
// Data array containing seed data - documents organized by Model 
var data = [
    {
        'model': 'Role',
        'documents': [RoleData.SuperUser,RoleData.Admin,RoleData.User]
    }
    // {
    //     'model': 'User',
    //     'documents': [UserData.SuperUser,UserData.Admin,UserData.User]
    // }
];
 
