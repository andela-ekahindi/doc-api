var config = require('../../config/config.js');
var mongodb = require('mongodb');
var FakeUsers = require('./data/users');
var FakeRoles = require('./data/roles');

var MongoClient = mongodb.MongoClient;

MongoClient.connect(config.db, function(err, docs) {
    if (err) {
        console.log("Something went wrong:", err);
    } else {
        console.log("+++++++++CLEARING COLECTIONS++++++++");
        var users = docs.collection('users');
        var roles = docs.collection('roles');
        console.log("---------USERS----------------------");
        users.remove();
        console.log("---------ROLES----------------------");
        roles.remove();
        console.log("+++++++++ADDING DATA++++++++++++++++");
        users.insert(FakeUsers, function(err, result) {
            if (err) {
                console.log("Something went wrong:", err)
            } else {
                console.log("---------USERS----------------------");
                result.ops.forEach(function(user) {
                    console.log("USERNAME:", user.username);
                    console.log("_ID:", user._id);
                });
                console.log("ADDED", result.insertedCount, "USERS");	
            }
        });
        roles.insert(FakeRoles, function(err, result) {
            if (err) {
                console.log("Something went wrong:", err)
            } else {
        console.log("---------ROLES----------------------");
                result.ops.forEach(function(role) {
                    console.log("ROLE TITLE:", role.title);
                    console.log("_ID:", role._id);
                });	 	            }
                console.log("ADDED", result.insertedCount, "ROLES");	
        });
        docs.close();
    }
})