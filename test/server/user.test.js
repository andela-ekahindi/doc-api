var app = require('../../server.js');
var request = require('supertest')(app);
var expect = require('chai').expect;



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

// 	// it('should validates that a new user created has a role defined', function (done) {
		
// 	// });

// 	// it('should validates that a new user created both first and last names', function (done) {
		
// 	// });

// 	// it('should validates that all users are returned', function(done) {
		
// 	// });
// });