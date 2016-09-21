/* eslint no-undef: "off"*/
/* eslint no-unused-expressions: "off"*/

const app = require('../../server.js');
const request = require('supertest')(app);
const expect = require('chai').expect;


describe('DOCUMENT', () => {
  describe('Require Login', () => {
    describe('GET api/documents', () => {
      it('should fail before login', (done) => {
        request
          .get('/api/documents/')
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(401);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.eql('No token provided. Missing parameters');
            done();
          });
      });
    });

    describe('GET api/documents', () => {
      let tokenLogin;
      before((done) => {
        request
          .post('/api/users/login')
          .send({
            email: 'User5firstname@example.com',
            password: 'User5',
          })
          .end((err, res) => {
            tokenLogin = res.body.token;
            done();
          });
      });
      it('should succeed after login', (done) => {
        request
          .get('/api/documents/')
          .set('x-access-token', tokenLogin)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array');
            done();
          });
      });
    });
  });

  describe('CRUD Document Operations', () => {
    let token;
    let documentId;
    let userId;
    before((done) => {
      request
        .post('/api/users/login')
        .send({
          email: 'User5firstname@example.com',
          password: 'User5',
        })
        .end((err, res) => {
          token = res.body.token;
          userId = res.body.user._id;
          done();
        });
    });
    describe('CREATE', () => {
      it('should POST private documents to api/documents', (done) => {
        request
          .post('/api/documents/')
          .set('x-access-token', token)
          .send({
            title: 'New From Test',
            content: 'This is a doc created by the tests',
          })
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(201);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('_id', 'ownerId', 'content', 'title', 'modifiedAt', 'createdAt', 'public');
            expect(res.body.content).to.be.a('string');
            expect(res.body.title).to.be.a('string');
            expect(res.body.title).to.eql('New From Test');
            expect(res.body.public).to.be.false;
            expect(res.body.content).to.eql('This is a doc created by the tests');
            documentId = res.body._id;
            done();
          });
      });

      it('should POST public documents to api/documents', (done) => {
        request
          .post('/api/documents/')
          .set('x-access-token', token)
          .send({
            title: 'New Public From Test',
            content: 'This is a Public doc created by the tests',
            public: true,
          })
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(201);
            expect(res.body).to.be.a('object');
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('_id', 'ownerId', 'content', 'title', 'modifiedAt', 'createdAt', 'public');
            expect(res.body.content).to.be.a('string');
            expect(res.body.title).to.be.a('string');
            expect(res.body.title).to.eql('New Public From Test');
            expect(res.body.public).to.be.true;
            expect(res.body.content).to.eql('This is a Public doc created by the tests');
            done();
          });
      });
      it('should POST for specific roles of users to api/documents', (done) => {
        request
          .post('/api/documents/')
          .set('x-access-token', token)
          .send({
            title: 'New Users Doc From Test',
            content: 'This is a Users doc with a Users role created by the tests',
            public: true,
            role: 'Users',
          })
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(201);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('_id', 'ownerId', 'content', 'title', 'modifiedAt', 'createdAt', 'public');
            expect(res.body.content).to.be.a('string');
            expect(res.body.title).to.be.a('string');
            expect(res.body.title).to.eql('New Users Doc From Test');
            expect(res.body.public).to.be.true;
            expect(res.body.content).to.eql('This is a Users doc with a Users role created by the tests');
            done();
          });
      });
      it('should not POST to api/documents without a title', (done) => {
        request
          .post('/api/documents/')
          .set('x-access-token', token)
          .send({
            content: 'This is will return an error from the db',
          })
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('error');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.eql('Title required');
            done();
          });
      });

      it('should not POST to api/documents without a content', (done) => {
        request
          .post('/api/documents/')
          .set('x-access-token', token)
          .send({
            title: 'This is will return an error from the db',
          })
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('error');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.eql('Content required');
            done();
          });
      });
    });
    describe('READ', () => {
      it('should GET ONE Documents from api/documents', (done) => {
        request
          .get(`/api/documents/${documentId}`)
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('_id', 'ownerId', 'content', 'title', 'modifiedAt', 'createdAt');
            done();
          });
      });
      it('should GET ONE Documents from with a non existent id_ api/documents', (done) => {
        request
          .get('/api/documents/57daf1ae48324f06fb4cafd6')
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(404);
            expect(res.body).to.be.a('object');
            expect(res.body).to.be.empty;
            done();
          });
      });
      it('should GET ALL Documents by the user defined from api/users/:id/documents', (done) => {
        request
          .get(`/api/users/${userId}/documents/`)
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(Array.isArray(res.body)).to.be.true;
            expect(res.body[1]).to.include.keys('_id', 'ownerId', 'content', 'title', 'modifiedAt', 'createdAt');
            expect(res.body[1].ownerId).to.eql(res.body[0].ownerId);
            done();
          });
      });
      it('should GET ALL Documents by the role defined on them from api/documents?role=Admin', (done) => {
        request
          .get('/api/search/?role=Admin')
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(Array.isArray(res.body)).to.be.true;
            expect(res.body[0]).to.include.keys('_id', 'ownerId', 'content', 'title', 'modifiedAt', 'createdAt');
            done();
          });
      });

      it('should GET ALL Document api/documents : documents are returned in order of their published dates, starting from the most recent', (done) => {
        request
          .get('/api/documents/')
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array');
            expect(res.body[0].createdAt).to.be.above(res.body[1].createdAt);
            done();
          });
      });
      it('should GET WITH LIMIT Document api/documents/?limit=2 : limited by a specified number, when Documents.all is called with a query parameter limit.', (done) => {
        const limit = 2;
        request
          .get(`/api/documents/?limit=${limit}`)
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array');
            expect(res.body).to.have.length.of.at.most(limit);
            done();
          });
      });
      it('should GET WITH LIMIT and allow for pagination api/documents/?limit=2&page=2 : limit above with an offset as well (pagination)', (done) => {
        const limit = 1;
        const page = 2;
        request
          .get(`/api/documents/?limit=${limit}&page=${page}`)
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array');
            expect(res.body).to.have.length.of.at.most(limit);
            done();
          });
      });
    });
    describe('UPDATE', () => {
      let putDocumentId;
      before((done) => {
        request
          .post('/api/documents/')
          .set('x-access-token', token)
          .send({
            title: 'Update test ',
            content: 'Update test things',
          })
          .end((err, res) => {
            putDocumentId = res.body._id;
            done();
          });
      });

      it('should PUT the title to api/documents', (done) => {
        request
          .put(`/api/documents/${putDocumentId}`)
          .set('x-access-token', token)
          .send({
            title: 'New Things',
          })
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('_id', 'ownerId', 'content', 'title', 'modifiedAt', 'createdAt');
            expect(res.body.content).to.be.a('string');
            expect(res.body.title).to.be.a('string');
            expect(res.body.title).to.eql('New Things');
            done();
          });
      });
      it('should PUT the content to api/documents', (done) => {
        request
          .put(`/api/documents/${putDocumentId}`)
          .set('x-access-token', token)
          .send({
            content: 'New Things',
          })
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('_id', 'ownerId', 'content', 'title', 'modifiedAt', 'createdAt');
            expect(res.body.title).to.be.a('string');
            expect(res.body.content).to.be.a('string');
            expect(res.body.content).to.eql('New Things');
            done();
          });
      });

      it('should not PUT to api/documents with invalid id', (done) => {
        request
          .put('/api/documents/bogusThings')
          .set('x-access-token', token)
          .send({
            title: 'New Things',
          })
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(500);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('kind', 'message', 'name', 'path');
            done();
          });
      });
    });
    describe('DELETE', () => {
      it('should DELETE using api/documents', (done) => {
        request
          .delete(`/api/documents/${documentId}`)
          .set('x-access-token', token)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            done();
          });
      });
      it('should not DELETE using api/documents with invalid ID', (done) => {
        request
          .delete('/api/documents/dhalHENflhMQDQQ1111')
          .set('x-access-token', token)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(500);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('kind');
            done();
          });
      });
    });
  });

  describe('Requirements functions', () => {
    before((done) => {
      request
        .post('/api/users/login')
        .send({
          email: 'User5firstname@example.com',
          password: 'User5',
        })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });
    it('should validates a new document has a published date', (done) => {
      request
        .post('/api/documents/')
        .set('x-access-token', token)
        .send({
          title: 'User Requirements',
          content: 'This is a doc created by the tests for user requirements',
        })
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(201);
          expect(res.body).to.be.a('object');
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('_id', 'ownerId', 'content', 'title', 'modifiedAt', 'createdAt', 'public');
          expect(res.body.createdAt).to.be.not.null;
          done();
        });
    });
  });
});
