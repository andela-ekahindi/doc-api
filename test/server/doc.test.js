/* eslint no-undef: "off"*/
/* eslint no-unused-expressions: "off"*/
/* eslint no-underscore-dangle: "off" */

const app = require("../../server.js");
const request = require("supertest")(app);
const expect = require("chai").expect;

describe("DOCUMENT", () => {
  describe("Require Login", () => {
    describe("GET api/documents", () => {
      it("should fail before login", (done) => {
        request
          .get("/api/documents/")
          .expect("Content-Type", /json/)
          .expect(401)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(401);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("message", "status");
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.true;
            expect(res.body.message).to.eql("No token provided. Missing parameters");
            done();
          });
      });
    });

    describe("GET api/documents", () => {
      let tokenLogin;
      before((done) => {
        request
          .post("/api/users/login")
          .send({
            email: "User5firstname@example.com",
            password: "User5",
          })
          .end((err, res) => {
            tokenLogin = res.body.token;
            done();
          });
      });
      it("should succeed after login", (done) => {
        request
          .get("/api/documents/")
          .set("x-access-token", tokenLogin)
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("documents", "status");
            expect(res.body).to.have.property("documents");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.true;
            done();
          });
      });
    });
  });

  describe("CRUD Document Operations", () => {
    let token;
    let documentId;
    before((done) => {
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
      it("should POST private documents to api/documents", (done) => {
        request
          .post("/api/documents/")
          .set("x-access-token", token)
          .send({
            title: "New From Test",
            content: "This is a doc created by the tests",
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(201);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("document", "status");
            expect(res.body).to.have.property("document");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.true;
            expect(res.body.document).to.be.a("object");
            expect(res.body.document).to.include.keys("_id", "ownerId", "content", "title", "modifiedAt", "createdAt", "public");
            expect(res.body.document.content).to.be.a("string");
            expect(res.body.document.title).to.be.a("string");
            expect(res.body.document.title).to.eql("New From Test");
            expect(res.body.document.public).to.be.false;
            expect(res.body.document.content).to.eql("This is a doc created by the tests");
            documentId = res.body.document._id;
            done();
          });
      });
      it("should POST public documents to api/documents", (done) => {
        request
          .post("/api/documents/")
          .set("x-access-token", token)
          .send({
            title: "New Public From Test",
            content: "This is a Public doc created by the tests",
            public: true,
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(201);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("document", "status");
            expect(res.body).to.have.property("document");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.true;
            expect(res.body.document).to.be.a("object");
            expect(res.body.document).to.include.keys("_id", "ownerId", "content", "title", "modifiedAt", "createdAt", "public");
            expect(res.body.document.content).to.be.a("string");
            expect(res.body.document.title).to.be.a("string");
            expect(res.body.document.title).to.eql("New Public From Test");
            expect(res.body.document.public).to.be.true;
            expect(res.body.document.content).to.eql("This is a Public doc created by the tests");
            done();
          });
      });
      it("should not POST to api/documents without a title", (done) => {
        request
          .post("/api/documents/")
          .set("x-access-token", token)
          .send({
            content: "This is will return an error from the db",
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("error", "status");
            expect(res.body).to.have.property("error");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.false;
            expect(res.body.error).to.eql("Title required");
            done();
          });
      });

      it("should not POST to api/documents without a content", (done) => {
        request
          .post("/api/documents/")
          .set("x-access-token", token)
          .send({
            title: "This is will return an error from the db",
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("error", "status");
            expect(res.body).to.have.property("error");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.false;
            expect(res.body.error).to.eql("Content required");
            done();
          });
      });
    });
    describe("READ", () => {
      it("should GET ONE Documents from api/documents", (done) => {
        request
          .get(`/api/documents/${documentId}`)
          .set("x-access-token", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("document", "status");
            expect(res.body).to.have.property("document");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.true;
            expect(res.body.document).to.include.keys("_id", "ownerId", "content", "title", "modifiedAt", "createdAt");
            done();
          });
      });
      it("should GET ALL Document api/documents", (done) => {
        request
          .get("/api/documents/")
          .set("x-access-token", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("documents", "status");
            expect(res.body).to.have.property("documents");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.true;
            expect(res.body.documents).to.be.a("array");
            done();
          });
      });
      it("should GET WITH LIMIT Document api/documents/?limit=2 : limited by a specified number, when Documents.all is called with a query parameter limit.", (done) => {
        const limit = 2;
        request
          .get(`/api/documents/?limit=${limit}`)
          .set("x-access-token", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("documents", "status");
            expect(res.body).to.have.property("documents");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.true;
            expect(res.body.documents).to.be.a("array");
            expect(res.body.documents).to.have.length.of.at.most(limit);
            done();
          });
      });
    });
    describe("UPDATE", () => {
      let putDocumentId;
      before((done) => {
        request
          .post("/api/documents/")
          .set("x-access-token", token)
          .send({
            title: "Update test ",
            content: "Update test things",
          })
          .end((err, res) => {
            putDocumentId = res.body.document._id;
            done();
          });
      });

      it("should PUT to api/documents", (done) => {
        request
          .put(`/api/documents/${putDocumentId}`)
          .set("x-access-token", token)
          .send({
            title: "New Things",
          })
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("document", "status");
            expect(res.body).to.have.property("document");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.true;
            expect(res.body.document).to.be.a("object");
            expect(res.body.document).to.include.keys("_id", "ownerId", "content", "title", "modifiedAt", "createdAt");
            expect(res.body.document.content).to.be.a("string");
            expect(res.body.document.title).to.be.a("string");
            expect(res.body.document.title).to.eql("New Things");
            done();
          });
      });

      it("should not PUT to api/documents with invalid id", (done) => {
        request
          .put("/api/documents/bogusThings")
          .set("x-access-token", token)
          .send({
            title: "New Things",
          })
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(500);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("error", "status");
            expect(res.body).to.have.property("error");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.false;
            done();
          });
      });
    });
    describe("DELETE", () => {
      it("should DELETE using api/documents", (done) => {
        request
          .delete(`/api/documents/${documentId}`)
          .set("x-access-token", token)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("document", "status");
            expect(res.body).to.have.property("document");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.true;
            expect(res.body.document).to.not.be.a("object");
            expect(res.body.document).to.be.null;
            done();
          });
      });
      it("should not DELETE using api/documents with invalid ID", (done) => {
        request
          .delete("/api/documents/dhalHENflhMQDQQ1111")
          .set("x-access-token", token)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(500);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("error", "status");
            expect(res.body).to.have.property("error");
            expect(res.body).to.have.property("status");
            expect(res.body.status).to.be.false;
            done();
          });
      });
    });
  });

  describe("Requirements functions", () => {
    before((done) => {
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
    it("should validates a new document has a published date", (done) => {
      request
        .post("/api/documents/")
        .set("x-access-token", token)
        .send({
          title: "User Requirements",
          content: "This is a doc created by the tests for user requirements",
        })
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(201);
          expect(res.body).to.be.a("object");
          expect(res.body).to.include.keys("document", "status");
          expect(res.body).to.have.property("document");
          expect(res.body).to.have.property("status");
          expect(res.body.status).to.be.true;
          expect(res.body.document).to.be.a("object");
          expect(res.body.document).to.include.keys("_id", "ownerId", "content", "title", "modifiedAt", "createdAt", "public");
          expect(res.body.document.createdAt).to.be.not.null;
          done();
        });
    });
        // it("should employs the limit above with an offset as well (pagination).
        // So documents could be fetched in chunks e.g 1st 10 document, next 10 documents
        // (skipping the 1st 10) and so on.", function (done) {

        // });

        // it("should validates that all documents are returned in order
        // of their published dates, starting from the most recent
        // when Documents.all is called", function(done) {

        // });
  });
});
