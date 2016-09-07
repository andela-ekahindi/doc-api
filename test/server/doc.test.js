var app = require('../../server.js');
var request = require('supertest')(app);
var expect = require('chai').expect;
var mongoose = require("mongoose");


describe('Document', function() {
    describe('Login is Required to Access Resources', function() {
        describe('GET api/documents', function() {
            it('should fail before login', function(done) {
                request
                    .get('/api/documents/')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(401);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.include.keys('message', 'status');
                        expect(res.body).to.have.property('message');
                        expect(res.body).to.have.property('status');
                        expect(res.body.status).to.be.true;
                        expect(res.body.message).to.eql('No token provided. Missing parameters');
                        done();
                    });
            });
        });

        describe('GET api/documents', function() {
            var token;
            beforeEach(function(done) {
                request
                    .post('/api/users/login')
                    .send({
                        email: 'User5firstname@example.com',
                        password: 'User5'
                    })
                    .end(function(err, res) {
                        token = res.body.token;
                        done()
                    })
            });
            it('should succeed after login', function(done) {
                request
                    .get('/api/documents/')
                    .set('x-access-token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.include.keys('document', 'status');
                        expect(res.body).to.have.property('document');
                        expect(res.body).to.have.property('status');
                        expect(res.body.status).to.be.true;
                        done();
                    });
            });
        });
    });

    describe('CRUD Document Operations', function() {
        var token;
        var document_id;
        beforeEach(function(done) {
            request
                .post('/api/users/login')
                .send({
                    email: 'User5firstname@example.com',
                    password: 'User5'
                })
                .end(function(err, res) {
                    token = res.body.token;
                    done()
                })
        });
        describe('CREATE', function() {
            it('should POST to api/documents', function(done) {
                request
                    .post('/api/documents/')
                    .set('x-access-token', token)
                    .send({
                        title: "New From Test",
                        content: "This is a doc created by the tests"
                    })
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(201);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.include.keys('document', 'status');
                        expect(res.body).to.have.property('document');
                        expect(res.body).to.have.property('status');
                        expect(res.body.status).to.be.true;
                        expect(res.body.document).to.be.a('object');
                        expect(res.body.document).to.include.keys('_id', 'ownerId', 'content', "title", "modifiedAt", "createdAt");
                        // expect(res.body.document._id).to.be.a('mongo things');
                        // expect(res.body.document.ownerId).to.be.a('mongo things');                        
                        expect(res.body.document.content).to.be.a('string');
                        expect(res.body.document.title).to.be.a('string');
                        // expect(res.body.document.modifiedAt).to.be.a('date');
                        // expect(res.body.document.createdAt).to.be.a('date');
                        document_id = res.body.document._id;
                        done();
                    });
            });

        });
        describe('READ', function() {
            it('should GET ONE Documents from api/documents', function(done) {
                request
                    .get('/api/documents/' + document_id)
                    .set('x-access-token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.include.keys('document', 'status');
                        expect(res.body).to.have.property('document');
                        expect(res.body).to.have.property('status');
                        expect(res.body.status).to.be.true;
                        expect(res.body.document).to.include.keys('_id', 'ownerId', 'content', "title", "modifiedAt", "createdAt");
                        done();
                    });
            });
            it('should GET ALL Document api/documents', function(done) {
                request
                    .get('/api/documents/')
                    .set('x-access-token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.include.keys('document', 'status');
                        expect(res.body).to.have.property('document');
                        expect(res.body).to.have.property('status');
                        expect(res.body.status).to.be.true;
                        expect(res.body.document).to.be.a('array');
                        done();
                    });
            });
            it('should GET WITH LIMIT Document api/documents/?limit=2', function(done) {
                var limit = 2
                request
                    .get('/api/documents/?limit=' + limit)
                    .set('x-access-token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.include.keys('document', 'status');
                        expect(res.body).to.have.property('document');
                        expect(res.body).to.have.property('status');
                        expect(res.body.status).to.be.true;
                        expect(res.body.document).to.be.a('array');
                        expect(res.body.document).to.have.length(limit);
                        done();
                    });
            });
        });
        describe('UPDATE', function() {
            var put_document_id;
            beforeEach(function(done) {
                request
                    .post('/api/documents/')
                    .set('x-access-token', token)
                    .send({
                        title: "Update test ",
                        content: "Update test things"
                    })
                    .end(function(err, res) {
                        put_document_id = res.body.document._id;
                        done();
                    });
            });

            it('should PUT to api/documents', function(done) {
                request
                    .put('/api/documents/' + document_id)
                    .set('x-access-token', token)
                    .send({
                        title: "New Things"
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        //errors here
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.include.keys('document', 'status');
                        expect(res.body).to.have.property('document');
                        expect(res.body).to.have.property('status');
                        expect(res.body.status).to.be.true;
                        expect(res.body.document).to.be.a('object');
                        expect(res.body.document).to.include.keys('_id', 'ownerId', 'content', "title", "modifiedAt", "createdAt");
                        // expect(res.body.document._id).to.be.a('mongo things');
                        // expect(res.body.document.ownerId).to.be.a('mongo things');                        
                        expect(res.body.document.content).to.be.a('string');
                        expect(res.body.document.title).to.be.a('string');
                        // expect(res.body.document.modifiedAt).to.be.a('date');
                        // expect(res.body.document.createdAt).to.be.a('date');
                        expect(res.body.document.title).to.eql('New Things');
                        done();
                    });
            });

        });
        describe('DELETE', function() {
            it('should DELETE using api/documents', function(done) {
                request
                    .delete('/api/documents/' + document_id)
                    .set('x-access-token', token)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.include.keys('document', 'status');
                        expect(res.body).to.have.property('document');
                        expect(res.body).to.have.property('status');
                        expect(res.body.status).to.be.true;
                        expect(res.body.document).to.not.be.a('object');
                        // expect(res.body.document).to.include.keys('_id', 'ownerId', 'content', "title", "modifiedAt", "createdAt");
                        // // expect(res.body.document._id).to.be.a('mongo things');
                        // // expect(res.body.document.ownerId).to.be.a('mongo things');                        
                        // expect(res.body.document.content).to.be.a('string');
                        // expect(res.body.document.title).to.be.a('string');
                        // // expect(res.body.document.modifiedAt).to.be.a('date');
                        // // expect(res.body.document.createdAt).to.be.a('date');
                        // expect(res.body.document.title).to.eql('New Things');
                        done();
                    });
            });

        });
    });

});


//     // describe('Requirements functions', function() {

//     // 	it('should validates that a new user document created has a published date defined', function (done) {

//     // 	});

//     // 	it('should validates that all documents are returned, limited by a specified number, when Documents.all is called with a query parameter limit.', function (done) {

//     // 	});

//     // 	it('should employs the limit above with an offset as well (pagination). So documents could be fetched in chunks e.g 1st 10 document, next 10 documents (skipping the 1st 10) and so on.', function (done) {

//     // 	});

//     // 	it('should validates that all documents are returned in order of their published dates, starting from the most recent when Documents.all is called', function(done) {

//     // 	});
//     // });
