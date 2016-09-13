/* eslint no-console: "off" */
/* eslint no-underscore-dangle: "off" */
/* eslint func-names: "off" */

const config = require("../../config/config.js");

const mongodb = require("mongodb");
const async = require("async");
const FakeUsers = require("./data/users");

const FakeRoles = require("./data/roles");

let users;
let roles;

async.series([

  function (callback) {
    const MongoClient = mongodb.MongoClient;
    MongoClient.connect(config.db, (err, docs) => {
      if (err) {
        console.log("Something went wrong:", err);
      } else {
        console.log("+++++++++CLEARING COLECTIONS++++++++");
        users = docs.collection("users");
        roles = docs.collection("roles");
        console.log("---------USERS----------------------");
        users.remove();
        console.log("---------ROLES----------------------");
        roles.remove();
        console.log("+++++++++ADDING DATA++++++++++++++++");
        callback();
      }
    });
  },
  function (callback) {
    users.insert(FakeUsers, (err, result) => {
      if (err) {
        console.log("Something went wrong:", err);
      } else {
        console.log("---------USERS----------------------");
        result.ops.forEach((user) => {
          console.log("USERNAME:", user.username);
          console.log("_ID:", user._id);
        });
        console.log("ADDED", result.insertedCount, "USERS");
        callback();
      }
    });
  },

  function (callback) {
    roles.insert(FakeRoles, (err, result) => {
      if (err) {
        console.log("Something went wrong:", err);
      } else {
        console.log("---------ROLES----------------------");
        result.ops.forEach((role) => {
          console.log("ROLE TITLE:", role.title);
          console.log("_ID:", role._id);
        });
      }
      console.log("ADDED", result.insertedCount, "ROLES");
      callback();
    });
  },
], (err) => {
  if (err) { console.log(err); } else { process.exit(0); }
});
