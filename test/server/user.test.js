/* eslint no-undef: "off" */
/* eslint no-unused-expressions: "off" */
/* eslint no-underscore-dangle: "off" */

const app = require("../../server.js");
const request = require("supertest")(app);
const expect = require("chai").expect;

describe("USER", () => {
  describe("CRUD USER Operations", () => {
    let token;
    let userId;
    beforeEach((done) => {
      request
                    .post("/api/users/login")
                    .send({
                      email: "User5firstname@example.com",
                      password: "User5",
                    })
                    .end((err, res) => {
                      token = res.body.token;
                      done();
                    });
    });
    describe("CREATE", () => {
      it("should POST to api/users and create user", (done) => {
        request
            .post("/api/users/")
            .send({
              username: "Tester",
              name: {
                first: "Test",
                last: "Tester",
              },
              email: "Tester@example.com",
              password: "Tester",
            })
            .expect(200)
            .end((err, res) => {
              expect(res.status).to.exist;
              expect(res.body).to.exist;
              expect(res.status).to.equal(201);
              expect(res.body).to.be.a("object");
              expect(res.body).to.include.keys("user", "status");
              expect(res.body).to.have.property("user");
              expect(res.body).to.have.property("status");
              expect(res.body.status).to.be.true;
              expect(res.body.user).to.be.a("object");
              userId = res.body.user._id;
              done();
            });
      });
      it("should not POST to api/users without a username", (done) => {
        request
            .post("/api/users/")
            .send({
              name: {
                first: "Bad Test",
                last: "Bad Tester",
              },
              email: "BadTester@example.com",
              password: "BadTester",
            })
            .expect(200)
            .end((err, res) => {
              expect(res.status).to.exist;
              expect(res.body).to.exist;
              expect(res.status).to.equal(400);
              expect(res.body).to.be.a("object");
              expect(res.body).to.include.keys("status", "error");
              expect(res.body).to.have.property("status");
              expect(res.body).to.have.property("error");
              expect(res.body.status).to.be.false;
              expect(res.body.error).to.eql("username required");
              done();
            });
      });
      it("should not POST to api/users without a first name", (done) => {
        request
            .post("/api/users/")
            .send({
              username: "Bad",
              name: {
                last: "Bad Tester",
              },
              email: "BadTester@example.com",
              password: "BadTester",
            })
            .expect(200)
            .end((err, res) => {
              expect(res.status).to.exist;
              expect(res.body).to.exist;
              expect(res.status).to.equal(400);
              expect(res.body).to.be.a("object");
              expect(res.body).to.include.keys("status", "error");
              expect(res.body).to.have.property("status");
              expect(res.body).to.have.property("error");
              expect(res.body.status).to.be.false;
              expect(res.body.error).to.eql("first name required");
              done();
            });
      });
      it("should not POST to api/users without a last name", (done) => {
        request
            .post("/api/users/")
            .send({
              username: "Bad",
              name: {
                first: "Bad Tester",
              },
              email: "BadTester@example.com",
              password: "BadTester",
            })
            .expect(200)
            .end((err, res) => {
              expect(res.status).to.exist;
              expect(res.body).to.exist;
              expect(res.status).to.equal(400);
              expect(res.body).to.be.a("object");
              expect(res.body).to.include.keys("status", "error");
              expect(res.body).to.have.property("status");
              expect(res.body).to.have.property("error");
              expect(res.body.status).to.be.false;
              expect(res.body.error).to.eql("last name required");
              done();
            });
      });
      it("should not POST to api/users without an email", (done) => {
        request
            .post("/api/users/")
            .send({
              username: "Bad",
              name: {
                first: "Bad Tester",
                last: "Very",
              },
              password: "BadTester",
            })
            .expect(200)
            .end((err, res) => {
              expect(res.status).to.exist;
              expect(res.body).to.exist;
              expect(res.status).to.equal(400);
              expect(res.body).to.be.a("object");
              expect(res.body).to.include.keys("status", "error");
              expect(res.body).to.have.property("status");
              expect(res.body).to.have.property("error");
              expect(res.body.status).to.be.false;
              expect(res.body.error).to.eql("email required");
              done();
            });
      });
      it("should not POST to api/users without a password", (done) => {
        request
            .post("/api/users/")
            .send({
              username: "Bad",
              name: {
                first: "Bad Tester",
                last: "Very",
              },
              email: "BadTester@example.com",
            })
            .expect(200)
            .end((err, res) => {
              expect(res.status).to.exist;
              expect(res.body).to.exist;
              expect(res.status).to.equal(400);
              expect(res.body).to.be.a("object");
              expect(res.body).to.include.keys("status", "error");
              expect(res.body).to.have.property("status");
              expect(res.body).to.have.property("error");
              expect(res.body.status).to.be.false;
              expect(res.body.error).to.eql("password required");
              done();
            });
      });
    });
    describe("READ", () => {
      it("should GET ALL Users from api/users", (done) => {
        request
                        .get("/api/users/")
                        .set("x-access-token", token)
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .end((err, res) => {
                          expect(res.status).to.exist;
                          expect(res.body).to.exist;
                          expect(res.status).to.equal(200);
                          expect(res.body).to.be.a("object");
                          expect(res.body).to.include.keys("users", "status");
                          expect(res.body).to.have.property("users");
                          expect(res.body.status).to.be.true;
                          expect(res.body.users).to.be.a("array");
                          expect(res.body.users[0]).to.include.keys("username", "name", "email", "password");
                          done();
                        });
      });
      it("should GET ONE User from api/user", (done) => {
        request
                        .get(`/api/users/${userId}`)
                        .set("x-access-token", token)
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .end((err, res) => {
                          expect(res.status).to.exist;
                          expect(res.body).to.exist;
                          expect(res.status).to.equal(200);
                          expect(res.body).to.be.a("object");
                            // expect(res.body).to.include.keys("document", "status");
                            // expect(res.body).to.have.property("document");
                            // expect(res.body).to.have.property("status");
                            // expect(res.body.status).to.be.true;
                            // expect(res.body.document).to.include.keys("_id",
                            // "ownerId", "content", "title", "modifiedAt", "createdAt");
                          done();
                        });
      });
    });
    describe("UPDATE", () => {
      it("should PUT to api/users", (done) => {
        request
                        .put(`/api/users/${userId}`)
                        .set("x-access-token", token)
                        .send({
                          name: { first: "Testerer" },
                        })
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .end((err, res) => {
                          expect(res.status).to.exist;
                          expect(res.body).to.exist;
                          expect(res.status).to.equal(200);
                          expect(res.body).to.be.a("object");
                            // expect(res.body).to.include.keys("document", "status");
                            // expect(res.body).to.have.property("document");
                            // expect(res.body).to.have.property("status");
                            // expect(res.body.status).to.be.true;
                            // expect(res.body.document).to.not.be.a("object");
                            // expect(res.body.document).to.be.null;
                          done();
                        });
      });
    });
    describe("DELETE", () => {
      it("should DELETE using api/users", (done) => {
        request
          .delete(`/api/users/${userId}`)
          .set("x-access-token", token)
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .end((err, res) => {
                          expect(res.status).to.exist;
                          expect(res.body).to.exist;
                          expect(res.status).to.equal(200);
                          expect(res.body).to.be.a("object");
                            // expect(res.body).to.include.keys("document", "status");
                            // expect(res.body).to.have.property("document");
                            // expect(res.body).to.have.property("status");
                            // expect(res.body.status).to.be.true;
                            // expect(res.body.document).to.not.be.a("object");
                            // expect(res.body.document).to.be.null;
                          done();
                        });
      });
    });
  });
  describe("Login", () => {
    it("should return a token", (done) => {
      request
        .post("/api/users/login")
        .send({
          email: "User5firstname@example.com",
          password: "User5",
        })
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a("object");
          expect(res.body).to.include.keys("status", "message", "token", "user");
          expect(res.body.status).to.be.true;
          expect(res.body.message).to.eql("You are Login in");
          expect(res.body.token).to.be.not.null;
          done();
        });
    });
    it("should not return a token when no email is provided", (done) => {
      request
        .post("/api/users/login")
        .send({
          password: "User5",
        })
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a("object");
          expect(res.body).to.include.keys("status", "error");
          expect(res.body.error).to.eql("User not Found");
          expect(res.body.status).to.be.false;
          done();
        });
    });
  });
  // describe("User", function () {
  // it("should create a new user", function (done) {
  // request(app)
  //  .get("/api/users/")
  //  .expect("Content-Type", /json/)
  //  .expect(200)
  //  .end(function (err,res) {
  //  // body...
  // });
  // });
  // it("should validates that a new user created is unique", function (done) {
  //
  // });
  //
  // it("should validates that a new user created has a user defined", function (done) {
  //
  // });
  //
  // it("should validates that a new user created both first and last names",
  // function (done) {
  //
  // });
  //
  // it("should validates that all users are returned", function(done) {
  //
  // });
  // });
});
