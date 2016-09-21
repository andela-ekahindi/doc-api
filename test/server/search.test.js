/* eslint no-undef: "off"*/
/* eslint no-unused-expressions: "off"*/

const app = require('../../server.js');
const request = require('supertest')(app);
const expect = require('chai').expect;

let token;

describe('Search', () => {
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
  it('documents can be ordered by date and searched by limit and by role', (done) => {
    request
        .get('/api/documents/?date=2016-09-20&limit=2')
        .set('x-access-token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect((res.body).length).be.at.most(2);
          expect(res.body[1]).to.include.keys('_id', 'ownerId', 'content', 'title', 'modifiedAt', 'createdAt');
          expect(res.body[1].public).to.eql(false);
          done();
        });
  });
  it('documents cannot be searched by incorrect query', (done) => {
    request
        .get('/api/documents/date=2016-09-15&limit=2')
        .set('x-access-token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(500); expect(res.body).to.be.a('object');
          expect(res.body).to.have.keys('name', 'message', 'kind', 'path', 'value');
          done();
        });
  });

  it('get all documents with a limit are in order of the most recent published on a certain date', (done) => {
    request
        .get('/api/documents/?limit=2')
        .set('x-access-token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.exist;
          expect(res.body).to.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect((res.body).length).be.at.most(2);
          expect(res.body[1]).to.include.keys('_id', 'ownerId', 'content', 'title', 'modifiedAt', 'createdAt');
          expect(res.body[1].createdAt).to.be.below(res.body[0].createdAt);
          done();
        });
  });
});
