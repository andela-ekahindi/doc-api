var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var app = require('../../server.js');


describe('Document', function () {
	// describe('Requirements functions', function() {
		
	// 	it('should validates that a new user document created has a published date defined', function (done) {
			
	// 	});

	// 	it('should validates that all documents are returned, limited by a specified number, when Documents.all is called with a query parameter limit.', function (done) {
			
	// 	});

	// 	it('should employs the limit above with an offset as well (pagination). So documents could be fetched in chunks e.g 1st 10 document, next 10 documents (skipping the 1st 10) and so on.', function (done) {
			
	// 	});
		
	// 	it('should validates that all documents are returned in order of their published dates, starting from the most recent when Documents.all is called', function(done) {
			
	// 	});
	// });

	describe('Get all documents', function() {
		it('GET api/documents', function (done) {
			request(app)
				.get('/api/documents/')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function (err,res) {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.a('array');
				    done();
			});
		});
	});

	describe('Create a document', function() {
		it('POST api/documents', function (done) {
			request(app)
				.post('/api/documents/')
				.send({ ownerId: 1, title:"From Test", content:"This is a doc created by the tests"})
				.expect(200)
				.end(function (err,res) {
					expect(res.status).to.equal(200);
					// expect(res.body).to.be.a('array');
					expect(res.body).to.include.keys('message', 'status');
				    done();
			});
		});
	});

	// describe('Get a document', function() {
		
	// });

	// describe('Update a document', function() {
		
	// });

	// describe('Delete a document', function() {
		
	// });

});

