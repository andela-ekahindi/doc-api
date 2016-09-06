var seeder = require('mongoose-seed');
var Document = require('../models/document.js');
var Role = require('../models/role.js');
var User = require('../models/user.js');
var UserData = require('./data/users');
var RoleData = require('./data/roles');
var DocumentData = require('./data/documents');
 
seeder.connect('mongodb://localhost/docs', function() {
 
    seeder.loadModels([
        '../models/document.js',
        '../models/role.js',
        '../models/user.js'
    ]);
 
    seeder.clearModels(['Document', 'Role', 'User'], function() {
        	return  seeder.populateModels(data);
    });
});
 
// Data array containing seed data - documents organized by Model 
var data = [
    {
        'model': 'Role',
        'documents': [RoleData.SuperUser,RoleData.Admin,RoleData.User]
    },
    {
        'model': 'Document',
        'documents': [DocumentData.Doc1,DocumentData.Doc2,DocumentData.Doc3,DocumentData.Doc4, DocumentData.Doc5, DocumentData.Doc6,DocumentData.Doc7,DocumentData.Doc8,DocumentData.Doc9, DocumentData.Doc10]
    },
    {
        'model': 'User',
        'documents': [UserData.User1,UserData.User2, UserData.User3, UserData.User4, UserData.User5]
    }
];
 
