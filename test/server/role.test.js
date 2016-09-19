/* eslint no-undef: "off"*/
/* eslint no-unused-expressions: "off"*/

const app = require('../../server.js');
const request = require('supertest')(app);
const chai = require('chai');

const expect = chai.expect;


describe('ROLE', () => {
  describe('Admins', () => {
    let tokenAdmin;
    before((done) => {
      request
        .post('/api/users/login')
        .send({ email: 'User5firstname@example.com', password: 'User5' })
        .end((err, res) => {
          tokenAdmin = res.body.token;
          done();
        });
    });
    it('should GET ALL roles', (done) => {
      request
        .get('/api/roles/')
        .set('x-access-token', tokenAdmin)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body[1]).to.have.keys('_id', 'title');
          done();
        });
    });
  });
  describe('None Admins', () => {
    let tokenUser;

    before((done) => {
      request
        .post('/api/users/login')
        .send({
          email: 'User4firstname@example.com',
          password: 'User4',
        })
        .end((err, res) => {
          tokenUser = res.body.token;
          done();
        });
    });
    it('should not GET ANY roles ', (done) => {
      request
        .get('/api/roles/')
        .set('x-access-token', tokenUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('Unauthorized');
          done();
        });
    });
  });
  describe('CRUD Role Operations', () => {
    let token;
    let roleId;
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
    describe('CREATE', () => {
      it('should POST to api/roles', (done) => {
        request
          .post('/api/roles/')
          .set('x-access-token', token)
          .send({
            title: 'Tester',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(201);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('title', '_id');
            roleId = res.body._id;
            done();
          });
      });
      it('should not POST duplicates to api/roles: should validates that a new role created has a unique title', (done) => {
        request
          .post('/api/roles/')
          .set('x-access-token', token)
          .send({
            title: 'Tester',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(500);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('code', 'errmsg', 'index');
            done();
          });
      });
      it('should not POST to api/roles without a title', (done) => {
        request
          .post('/api/roles/')
          .set('x-access-token', token)
          .send({})
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.eql('Title required');
            done();
          });
      });
    });
    describe('READ', () => {
      it('should GET ALL Roles from api/roles: should validates that all roles are returned when Roles.all is called', (done) => {
        request
          .get('/api/roles/')
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array');
            expect(res.body[0].title).to.eql('SuperUser');
            expect(res.body[1].title).to.eql('Admin');
            done();
          });
      });
      it('should GET ONE Role from api/roles', (done) => {
        request
          .get(`/api/roles/${roleId}`)
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('_id', 'title');
            done();
          });
      });
      it('should not GET ONE Role from api/roles with an Invalid _id', (done) => {
        request
          .get('/api/roles/Bogusthings')
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(500);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.keys('message', 'path', 'name', 'kind', 'value');
            done();
          });
      });
    });
    describe('UPDATE', () => {
      it('should PUT to api/roles', (done) => {
        request
          .put(`/api/roles/${roleId}`)
          .set('x-access-token', token)
          .send({ title: 'Testerer' })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.title).to.eql('Testerer');
            done();
          });
      });
      it('should not PUT to api/roles without title', (done) => {
        request
          .put(`/api/roles/${roleId}`)
          .set('x-access-token', token)
          .send({})
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.keys('errors', 'message', 'name');
            done();
          });
      });
      it('should not PUT to api/roles with Invalid _id', (done) => {
        request
          .put('/api/roles/Bogusthings')
          .set('x-access-token', token)
          .send({})
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(500);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.keys('message', 'path', 'name', 'kind', 'value');
            done();
          });
      });
    });
    describe('DELETE', () => {
      it('should DELETE using api/roles', (done) => {
        request
          .delete(`/api/roles/${roleId}`)
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            done();
          });
      });
      it('should not DELETE using api/roles invalid _id', (done) => {
        request
          .delete('/api/roles/Bogusthings')
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(500);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.keys('message', 'path', 'name', 'kind', 'value');
            done();
          });
      });
    });
  });
});
