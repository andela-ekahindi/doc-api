/* eslint no-undef: "off" */
/* eslint no-unused-expressions: "off" */

const app = require('../../server.js');
const request = require('supertest')(app);
const expect = require('chai').expect;
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

describe('USER', () => {
  describe('CRUD USER Operations', () => {
    let token;
    let userId;
    before((done) => {
      request
        .post('/api/users/login')
        .send({ email: 'User5firstname@example.com', password: 'User5' })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });
    describe('CREATE', () => {
      it('should POST to api/users and create user : should validates that a new user created has a role, both first and last names defined', (done) => {
        request
          .post('/api/users/')
          .send({
            username: 'Tester',
            first: 'Test',
            last: 'Tester',
            email: 'Tester@example.com',
            password: 'Tester',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(201);
            expect(res.body).to.be.a('object');
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('_id', 'username', 'name', 'email', 'password', 'role');
            expect(res.body.username).to.eql('Tester');
            expect(res.body.email).to.eql('Tester@example.com');
            expect(res.body.role).to.eql('User');
            expect(res.body.name).to.be.a('object');
            expect(res.body.name.first).to.eql('Test');
            expect(res.body.name.last).to.eql('Tester');
            userId = res.body._id;
            done();
          });
      });
      it('should POST to api/users and create admin', (done) => {
        request
          .post('/api/users/')
          .send({
            username: 'TesterAdmin',
            first: 'TestAdmin',
            last: 'TesterAdmin',
            email: 'TesterAdmin@example.com',
            password: 'TesterAdmin',
            role: 'Admin',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(201);
            expect(res.body).to.be.a('object');
            expect(res.body).to.be.a('object');
            expect(res.body.role).to.eql('Admin');
            done();
          });
      });
      it('should not POST duplicate users to api/users : should validates that a new user created is unique', (done) => {
        request
          .post('/api/users/')
          .send({
            username: 'Tester',
            first: 'Test',
            last: 'Tester',
            email: 'Tester@example.com',
            password: 'Tester',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('code', 'errmsg', 'index', 'op');
            done();
          });
      });
      it('should not POST to api/users without a username', (done) => {
        request
          .post('/api/users/')
          .send({
            first: 'Bad Test',
            last: 'Bad Tester',
            email: 'BadTester@example.com',
            password: 'BadTester',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.eql('username required');
            done();
          });
      });
      it('should not POST to api/users without a first name', (done) => {
        request
          .post('/api/users/')
          .send({
            username: 'Bad',
            last: 'Bad Tester',
            email: 'BadTester@example.com',
            password: 'BadTester',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.eql('first name required');
            done();
          });
      });
      it('should not POST to api/users without a last name', (done) => {
        request
          .post('/api/users/')
          .send({
            username: 'Bad',
            first: 'Bad Tester',
            email: 'BadTester@example.com',
            password: 'BadTester',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.eql('last name required');
            done();
          });
      });
      it('should not POST to api/users without an email', (done) => {
        request
          .post('/api/users/')
          .send({
            username: 'Bad',
            first: 'Bad Tester',
            last: 'Very',
            password: 'BadTester',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.eql('email required');
            done();
          });
      });
      it('should not POST to api/users without a password', (done) => {
        request
          .post('/api/users/')
          .send({
            username: 'Bad',
            first: 'Bad Tester',
            last: 'Very',
            email: 'BadTester@example.com',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.eql('password required');
            done();
          });
      });
    });
    describe('READ', () => {
      it('should GET ALL Users from api/users: should validates that all users are returned', (done) => {
        request
          .get('/api/users/')
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array');
            expect(res.body[0]).to.include.keys('_id', 'username', 'name', 'email', 'password', 'role');
            done();
          });
      });
      it('should GET ONE User from api/user', (done) => {
        request
          .get(`/api/users/${userId}`)
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('_id', 'email', 'name', 'role', 'username', 'password');
            expect(mongoose.Types.ObjectId.isValid(res.body._id)).to.be.true;
            done();
          });
      });
      it('should not GET ONE User from api/user with inavlid ID', (done) => {
        request
          .get('/api/users/bogusThings')
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.keys('kind', 'message', 'name', 'path', 'value');
            done();
          });
      });
    });
    describe('UPDATE', () => {
      it('should PUT new first name  to api/users', (done) => {
        request
          .put(`/api/users/${userId}`)
          .set('x-access-token', token)
          .send({
            first: 'Testerer',
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.name).to.be.a('object');
            expect(res.body.name.first).to.eql('Testerer');
            done();
          });
      });
      it('should PUT new last name  to api/users', (done) => {
        request
          .put(`/api/users/${userId}`)
          .set('x-access-token', token)
          .send({
            last: 'Testerererr',
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body.name).to.be.a('object');
            expect(res.body.name.last).to.eql('Testerererr');
            done();
          });
      });
      it('should PUT new username  to api/users', (done) => {
        request
          .put(`/api/users/${userId}`)
          .set('x-access-token', token)
          .send({
            username: 'TTester',
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.username).to.eql('TTester');
            done();
          });
      });
      it('should PUT new email  to api/users', (done) => {
        request
          .put(`/api/users/${userId}`)
          .set('x-access-token', token)
          .send({
            email: 'TTester@testerrr.com',
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.email).to.eql('TTester@testerrr.com');
            done();
          });
      });
      it('should PUT new password  to api/users', (done) => {
        request
          .put(`/api/users/${userId}`)
          .set('x-access-token', token)
          .send({
            password: 'TTester',
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(bcrypt.compareSync('TTester', res.body.password)).to.be.true;
            done();
          });
      });
      it('should not PUT to api/users with an invalid _ID', (done) => {
        request
          .put('/api/users/bogusThings')
          .set('x-access-token', token)
          .send({
            first: 'Testerer',
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(500);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.keys('kind', 'message', 'name', 'path', 'value');
            done();
          });
      });
    });
    describe('DELETE', () => {
      it('should DELETE using api/users', (done) => {
        request
          .delete(`/api/users/${userId}`)
          .set('x-access-token', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.exist;
            expect(res.body).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.keys('ok', 'n');
            done();
          });
      });
    });
    it('should not DELETE using api/users', (done) => {
      request
        .delete('/api/users/bogusThings')
        .set('x-access-token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('kind', 'message', 'name', 'path', 'value');
          done();
        });
    });
  });
  describe('Login', () => {
    it('should return a token', (done) => {
      request
        .post('/api/users/login')
        .send({
          email: 'User5firstname@example.com',
          password: 'User5',
        })
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('token', 'user');
          expect(res.body.token).to.be.not.null;
          done();
        });
    });
    it('should not return a token when no email is provided', (done) => {
      request
        .post('/api/users/login')
        .send({
          password: 'User5',
        })
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.eql('User not Found');
          done();
        });
    });
    it('should not return a token with an invalid passowrd', (done) => {
      request
        .post('/api/users/login')
        .send({
          email: 'User5firstname@example.com',
          password: 'User5Bogus',
        })
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('error');
          done();
        });
    });
  });
  describe('Logout', () => {
    it('should allow for users to logout from the system /api/urers/logout', (done) => {
      request
        .post('/api/users/logout')
        .send({})
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('message');
          expect(res.body.message).to.eql('Logged Out');
          done();
        });
    });
    it('should not allow users to logout without having been logged in', (done) => {
      request
        .post('/api/users/login')
        .send({})
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('error');
          done();
        });
    });
  });
});
