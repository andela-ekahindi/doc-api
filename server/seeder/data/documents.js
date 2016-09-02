var fakery = require('mongoose-fakery');
var Document = require('../../models/document');

var fakeDocument = {
	Doc1: fakery.fake('doc1', mongoose.model('Document'), {
						ownerId: 1,
						title:'Hi',
						content:'From test',
						public:true
					}),
	Doc2: fakery.fake('doc2', mongoose.model('Document'), 
						{title: 'Admin'}),
	Doc3: fakery.fake('doc3', mongoose.model('Document'), 
						{title: 'User'}),
	Doc4: fakery.fake('doc4', mongoose.model('Document'), 
						{title: 'SuperUser'}),
	Doc5: fakery.fake('doc5', mongoose.model('Document'), 
						{title: 'Admin'}),
	Doc6: fakery.fake('doc6', mongoose.model('Document'), 
						{title: 'User'}),
	Doc7: fakery.fake('doc7', mongoose.model('Document'), 
						{title: 'User'}),
	Doc8: fakery.fake('doc8', mongoose.model('Document'), 
						{title: 'SuperUser'}),
	Doc9: fakery.fake('doc9', mongoose.model('Document'), 
						{title: 'Admin'}),
	Doc10: fakery.fake('doc10', mongoose.model('Document'), 
						{title: 'User'}),
};

module.exports = fakeDocument;
