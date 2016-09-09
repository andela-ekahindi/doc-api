var config = require('../../config/config.js');

var mongodb = require('mongodb');
var async = require('async');
var FakeUsers = require('./data/users');
var FakeRoles = require('./data/roles');
var users, roles;

async.series([

    function(callback) {

        var MongoClient = mongodb.MongoClient;
        MongoClient.connect(config.db, function(err, docs) {
            if (err) {
                console.log("Something went wrong:", err);
            } else {
                console.log("+++++++++CLEARING COLECTIONS++++++++");
                users = docs.collection('users');
                roles = docs.collection('roles');
                console.log("---------USERS----------------------");
                users.remove();
                console.log("---------ROLES----------------------");
                roles.remove();
                console.log("+++++++++ADDING DATA++++++++++++++++");
                callback();

            }
        })
    },
    function(callback) {
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
                callback();

            }
        });
    },

    function(callback) {
        roles.insert(FakeRoles, function(err, result) {
            if (err) {
                console.log("Something went wrong:", err)
            } else {
                console.log("---------ROLES----------------------");
                result.ops.forEach(function(role) {
                    console.log("ROLE TITLE:", role.title);
                    console.log("_ID:", role._id);
                });
            }
            console.log("ADDED", result.insertedCount, "ROLES");
            callback();

        });
    }
], function(err) {
    if (err)
        console.log(err)
    else
        process.exit(0);
})