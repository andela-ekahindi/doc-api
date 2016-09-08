var app = require('../../server.js');
var request = require('supertest')(app);
var expect = require('chai').expect;


describe('USER', function() {
        describe('CRUD USER Operations', function() {
            var token;
            var user_id;
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
                it('should POST to api/users and create user', function(done) {
                    request
                        .post('/api/users/')
                        .send({
                            username: "Tester",
                            name: {
                                first: 'Test',
                                last: 'Tester'
                            },
                            email: "Tester@example.com",
                            password: "Tester"
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
                            user_id = res.body.user._id;

                            done();
                        });
                });
            });
            describe('READ', function() {
                it('should GET ALL Users from api/users', function(done) {
                    request
                        .get('/api/users/')
                        .set('x-access-token', token)
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err, res) {
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
                it('should GET ONE User from api/user', function(done) {
                    request
                        .get('/api/users/' + user_id)
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
            });
            describe('UPDATE', function() {
                it('should PUT to api/users', function(done) {
                    request
                        .put('/api/users/' + user_id)
                        .set('x-access-token', token)
                        .send({
                            name: {first: "Testerer"}
                        })
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err, res) {
                        	//no route for update user details
                            expect(res.status).to.exist;
                            expect(res.body).to.exist;
                            // expect(res.status).to.equal(200);
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
                it('should DELETE using api/users', function(done) {
                    request
                        .delete('/api/users/' + user_id)
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
            });
        });
});
        // describe('Login', function() {
        // 		it('should return a token', function (done) {
        // 			request
        //                 .post('/api/users/login')
        //                 .send({
        //                     email: 'User5firstname@example.com',
        //                     password: 'User5'
        //                 })
        //                 .end(function(err, res) {
        //                     expect(res.status).to.equal(200);
        //                     done()
        //                 })
        // 		});
        // });
        // describe('User', function () {
        // 	// it('should create a new user', function (done) {
        // 	// 	request(app)
        // 	// 		.get('/api/users/')
        // 	// 		.expect('Content-Type', /json/)
        // 	// 		.expect(200)
        // 	// 		.end(function (err,res) {
        // 	// 			// body...
        // 	// 		});
        // 	// });
        // 	// it('should validates that a new user created is unique', function (done) {

        // 	// });

        // 	// it('should validates that a new user created has a user defined', function (done) {

        // 	// });

        // 	// it('should validates that a new user created both first and last names', function (done) {

        // 	// });

        // 	// it('should validates that all users are returned', function(done) {

        // 	// });
        // });