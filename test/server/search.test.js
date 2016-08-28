var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;

// var app = require('../../server.js');

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:5000");

describe('Search', function () {
	it('should validates that all documents, limited by a specified number and ordered by published date, that can be accessed by a specified role.', function (done) {
		request(server)
			.get('/')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				// HTTP status should be 200
			    res.status.should.equal(200);
			    // Error key should be false.
			    res.body.error.should.equal(false);
			    done();
			});
	});

	// it('should validates that all documents, limited by a specified number, that were published on a certain date', function (done) {
		
	// });
});