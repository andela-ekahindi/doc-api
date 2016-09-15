/* eslint no-undef: "off"*/
/* eslint no-unused-expressions: "off"*/
/* eslint no-underscore-dangle: "off" */

const app = require("../../server.js");
const request = require("supertest")(app);
const chai = require("chai").expect;

let token;
let documentId;
let userId;

describe("Search", () => {
  // before((done) => {
  //   request
  //     .post("/api/users/login")
  //     .send({
  //       email: "User5firstname@example.com",
  //       password: "User5",
  //     })
  //     .end((err, res) => {
  //       token = res.body.token;
  //       userId = res.body.user._id;
  //       done();
  //     });
  // });
  // it("should search by a limited and specified number and ordered by published date, that can be accessed by a specified role.", (done) => {
  //
  // });

// // it("should validates that all documents, limited by a specified number,
// that were published on a certain date", function (done) {

// // });
});
