/* eslint no-undef: "off"*/
/* eslint no-unused-expressions: "off"*/
/* eslint no-underscore-dangle: "off" */

const app = require("../../server.js");
const request = require("supertest")(app);
const expect = require("chai").expect;

let token;

describe("Search", () => {
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
  it("documents can be ordered by date and searched by limit and by role", (done) => {
    request
        .get("/api/documents/?date=2016-09-16&limit=2")
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
          expect(Array.isArray(res.body.documents)).to.be.true;
          expect((res.body.documents).length).be.at.most(2);
          expect(res.body.documents[0]).to.include.keys("_id", "ownerId", "content", "title", "modifiedAt", "createdAt");
          expect(res.body.documents[0].public).to.eql(false);
          done();
        });
  });
  it("documents cannot be searched by incorrect query", (done) => {
    request
        .get("/api/documents/date=2016-09-15&limit=2")
        .set("x-access-token", token)
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
          done();
        });
  });

  it("get all documents with a limit are in order of the most recent published on a certain date", (done) => {
    request
        .get("/api/documents/?limit=2")
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
          expect(Array.isArray(res.body.documents)).to.be.true;
          expect((res.body.documents).length).be.at.most(2);
          expect(res.body.documents[1]).to.include.keys("_id", "ownerId", "content", "title", "modifiedAt", "createdAt");
          expect(res.body.documents[1].createdAt).to.be.below(res.body.documents[0].createdAt);
          done();
        });
  });
});
