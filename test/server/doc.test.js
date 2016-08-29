var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var app = require('../../server.js');

describe('Document', function () {
	it('GET all documents api/documents', function (done) {
		request(app)
			.get('/api/documents/')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err,res) {
				expect(res.status).to.equal(200);
				
			    // // Error key should be false.
			    // res.body.error.should.equal(false);
			    // expect(true).to.equal(true);
			    done();
			});
	});
	it('should validates that a new user document created has a published date defined', function (done) {
		
	});

	it('should validates that all documents are returned, limited by a specified number, when Documents.all is called with a query parameter limit.', function (done) {
		
	});

	it('should mploys the limit above with an offset as well (pagination). So documents could be fetched in chunks e.g 1st 10 document, next 10 documents (skipping the 1st 10) and so on.', function (done) {
		
	});
	
	it('should validates that all documents are returned in order of their published dates, starting from the most recent when Documents.all is called', function(done) {
		
	});
});