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
                            // expect(res.body).to.include.keys('document', 'status');
                            // expect(res.body).to.have.property('document');
                            // expect(res.body).to.have.property('status');
                            // expect(res.body.status).to.be.true;
                            // expect(res.body.document).to.be.a('array');
                          userId = res.body.user._id;

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
                            // expect(res.body).to.be.a('object');
                            // expect(res.body).to.include.keys('document', 'status');
                            // expect(res.body).to.have.property('document');
                            // expect(res.body).to.have.property('status');
                            // expect(res.body.status).to.be.true;
                            // expect(res.body.document).to.be.a('array');
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
                            // expect(res.body).to.include.keys('document', 'status');
                            // expect(res.body).to.have.property('document');
                            // expect(res.body).to.have.property('status');
                            // expect(res.body.status).to.be.true;
                            // expect(res.body.document).to.include.keys('_id',
                            // 'ownerId', 'content', "title", "modifiedAt", "createdAt");
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
                            // expect(res.body).to.include.keys('document', 'status');
                            // expect(res.body).to.have.property('document');
                            // expect(res.body).to.have.property('status');
                            // expect(res.body.status).to.be.true;
                            // expect(res.body.document).to.not.be.a('object');
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
                            // expect(res.body).to.include.keys('document', 'status');
                            // expect(res.body).to.have.property('document');
                            // expect(res.body).to.have.property('status');
                            // expect(res.body.status).to.be.true;
                            // expect(res.body.document).to.not.be.a('object');
                            // expect(res.body.document).to.be.null;
                          done();
                        });
      });
    });
  });
});
        // describe('Login', function() {
        // it('should return a token', function (done) {
        // request
        //                 .post('/api/users/login')
        //                 .send({
        //                     email: 'User5firstname@example.com',
        //                     password: 'User5'
        //                 })
        //                 .end(function(err, res) {
        //                     expect(res.status).to.equal(200);
        //                     done()
        //                 })
        // });
        // });
        // describe('User', function () {
        // // it('should create a new user', function (done) {
        // // request(app)
        // //  .get('/api/users/')
        // //  .expect('Content-Type', /json/)
        // //  .expect(200)
        // //  .end(function (err,res) {
        // //  // body...
        // //});
        // //});
        // // it('should validates that a new user created is unique', function (done) {

        // // });

        // // it('should validates that a new user created has a user defined', function (done) {

        // // });

        // //it('should validates that a new user created both first and last names',
        // function (done) {

        // // });

        // // it('should validates that all users are returned', function(done) {

        // // });
        // });
