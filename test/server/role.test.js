var app = require('../../server.js');
var request = require('supertest')(app);
var chai = require('chai');
var expect = chai.expect;


describe('ROLE', function() {
    describe('Admins', function() {
        var token_admin;
        beforeEach(function(done) {
            request
                .post('/api/users/login')
                .send({
                    email: 'User5firstname@example.com',
                    password: 'User5'
                })
                .end(function(err, res) {
                    token_admin = res.body.token;
                    done();
                })

        });
        it('should GET ALL roles', function(done) {
            request
                .get('/api/roles/')
                .set('x-access-token', token_admin)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    expect(res.status).to.exist;
                    expect(res.body).to.exist;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('object');
                    // expect(res.body).to.include.keys('document', 'status');
                    // expect(res.body).to.have.property('document');
                    // expect(res.body).to.have.property('status');
                    // expect(res.body.status).to.be.true;
                    // expect(res.body.document).to.be.a('array');
                    done();
                });
        });
    });
    describe('None Admins', function() {
        var token_user;

        beforeEach(function(done) {
            request
                .post('/api/users/login')
                .send({
                    email: 'User4firstname@example.com',
                    password: 'User4'
                })
                .end(function(err, res) {
                    token_user = res.body.token;
                    done();
                })
        });
        it('should not GET ANY roles ', function(done) {
            request
                .get('/api/roles/')
                .set('x-access-token', token_user)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    expect(res.status).to.exist;
                    expect(res.body).to.exist;
                    expect(res.status).to.equal(403);
                    expect(res.body).to.be.a('object');
                    // expect(res.body).to.include.keys('document', 'status');
                    // expect(res.body).to.have.property('document');
                    // expect(res.body).to.have.property('status');
                    // expect(res.body.status).to.be.true;
                    // expect(res.body.document).to.be.a('array');
                    done();
                });
        });
    });
    describe('CRUD Role Operations', function() {
        var token;
        var role_id;
        beforeEach(function(done) {
            request
                .post('/api/users/login')
                .send({
                    email: 'User5firstname@example.com',
                    password: 'User5'
                })
                .end(function(err, res) {
                    token = res.body.token;
                    done();
                })

        });
        describe('CREATE', function() {
            it('should POST to api/roles', function(done) {
                request
                    .post('/api/roles/')
                    .set('x-access-token', token)
                    .send({
                        title: "Tester",
                    })
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(201);
                        expect(res.body).to.be.a('object');
                        // expect(res.body).to.include.keys('document', 'status');
                        // expect(res.body).to.have.property('document');
                        // expect(res.body).to.have.property('status');
                        // expect(res.body.status).to.be.true;
                        // expect(res.body.document).to.be.a('array');
                        role_id = res.body.role._id;

                        done();
                    });
            });
                        it('should POST to api/roles', function(done) {
                request
                    .post('/api/roles/')
                    .set('x-access-token', token)
                    .send({
                        title: "Tester",
                    })
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(500);
                        expect(res.body).to.be.a('object');
                        // expect(res.body).to.include.keys('document', 'status');
                        // expect(res.body).to.have.property('document');
                        // expect(res.body).to.have.property('status');
                        // expect(res.body.status).to.be.true;
                        // expect(res.body.document).to.be.a('array');


                        done();
                    });
            });
            it('should not POST to api/roles without a title', function(done) {
                request
                    .post('/api/roles/')
                    .set('x-access-token', token)
                    .send({})
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(400);
                        expect(res.body).to.be.a('object');
                        // expect(res.body).to.include.keys('document', 'status');
                        // expect(res.body).to.have.property('document');
                        // expect(res.body).to.have.property('status');
                        // expect(res.body.status).to.be.true;
                        // expect(res.body.document).to.be.a('array');

                        done();
                    });
            });
        });
        describe('READ', function() {
            it('should GET ALL Roles from api/roles', function(done) {
                request
                    .get('/api/roles/')
                    .set('x-access-token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(200);
                        expect(res.body).to.be.a('object');
                        // expect(res.body).to.include.keys('document', 'status');
                        // expect(res.body).to.have.property('document');
                        // expect(res.body).to.have.property('status');
                        // expect(res.body.status).to.be.true;
                        // expect(res.body.document).to.be.a('array');
                        done();
                    });
            });
            it('should GET ONE Role from api/roles', function(done) {
                request
                    .get('/api/roles/' + role_id)
                    .set('x-access-token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(200);
                        expect(res.body).to.be.a('object');
                        // expect(res.body).to.include.keys('document', 'status');
                        // expect(res.body).to.have.property('document');
                        // expect(res.body).to.have.property('status');
                        // expect(res.body.status).to.be.true;
                        // expect(res.body.document).to.include.keys('_id', 'ownerId', 'content', "title", "modifiedAt", "createdAt");
                        done();
                    });
            });
            it('should not GET ONE Role from api/roles with an Invalid _id', function(done) {
                request
                    .get('/api/roles/' + 'Bogusthings')
                    .set('x-access-token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(500);
                        expect(res.body).to.be.a('object');
                        // expect(res.body).to.include.keys('document', 'status');
                        // expect(res.body).to.have.property('document');
                        // expect(res.body).to.have.property('status');
                        // expect(res.body.status).to.be.true;
                        // expect(res.body.document).to.include.keys('_id', 'ownerId', 'content', "title", "modifiedAt", "createdAt");
                        done();
                    });
            });
        });
        describe('UPDATE', function() {
            it('should PUT to api/roles', function(done) {
            	request
                    .put('/api/roles/' + role_id)
                    .set('x-access-token', token)
                    .send({
                        title: "Testerer"
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(200);
                        expect(res.body).to.be.a('object');
                        // expect(res.body).to.include.keys('document', 'status');
                        // expect(res.body).to.have.property('document');
                        // expect(res.body).to.have.property('status');
                        // expect(res.body.status).to.be.true;
                        // expect(res.body.document).to.not.be.a('object');
                        // expect(res.body.document).to.be.null;
                        done();
                    });

            });
            it('should not PUT to api/roles without title', function(done) {
                request
                    .put('/api/roles/' + role_id)
                    .set('x-access-token', token)
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(400);
                        expect(res.body).to.be.a('object');
                        // expect(res.body).to.include.keys('document', 'status');
                        // expect(res.body).to.have.property('document');
                        // expect(res.body).to.have.property('status');
                        // expect(res.body.status).to.be.true;
                        // expect(res.body.document).to.not.be.a('object');
                        // expect(res.body.document).to.be.null;
                        done();
                    });

            });
            it('should not PUT to api/roles with Invalid _id', function(done) {
                request
                    .put('/api/roles/' + 'Bogusthings')
                    .set('x-access-token', token)
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(500);
                        expect(res.body).to.be.a('object');
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
        describe('DELETE', function() {
            it('should DELETE using api/roles', function(done) {
                request
                    .delete('/api/roles/' + role_id)
                    .set('x-access-token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(200);
                        expect(res.body).to.be.a('object');
                        // expect(res.body).to.include.keys('document', 'status');
                        // expect(res.body).to.have.property('document');
                        // expect(res.body).to.have.property('status');
                        // expect(res.body.status).to.be.true;
                        // expect(res.body.document).to.not.be.a('object');
                        // expect(res.body.document).to.be.null;
                        done();
                    });


            });
            it('should not DELETE using api/roles invalid _id', function(done) {
                request
                    .delete('/api/roles/' + 'Bogusthings')
                    .set('x-access-token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        expect(res.status).to.exist;
                        expect(res.body).to.exist;
                        expect(res.status).to.equal(500);
                        expect(res.body).to.be.a('object');
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
    // it('should validates that a new role created has a unique title', function (done) {

    // });

    // it('should validates that all roles are returned when Roles.all is called', function (done) {

    // });
});

// describe('GET /', function() {
// 	it('', function (done) {

// 	});
// });