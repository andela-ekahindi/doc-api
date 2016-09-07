// var fakery = require('mongoose-fakery');
// var Document = require('../../models/document');

// var fakeDocument = {
// 	Doc1: fakery.fake('doc1', mongoose.model('Document'), {
// 						ownerId: 1,
// 						title:'Hi',
// 						content:'From test',
// 						public:true
// 					}),
// 	Doc2: fakery.fake('doc2', mongoose.model('Document'), 
// 						{title: 'Admin'}),
// 	Doc3: fakery.fake('doc3', mongoose.model('Document'), 
// 						{title: 'User'}),
// 	Doc4: fakery.fake('doc4', mongoose.model('Document'), 
// 						{title: 'SuperUser'}),
// 	Doc5: fakery.fake('doc5', mongoose.model('Document'), 
// 						{title: 'Admin'}),
// 	Doc6: fakery.fake('doc6', mongoose.model('Document'), 
// 						{title: 'User'}),
// 	Doc7: fakery.fake('doc7', mongoose.model('Document'), 
// 						{title: 'User'}),
// 	Doc8: fakery.fake('doc8', mongoose.model('Document'), 
// 						{title: 'SuperUser'}),
// 	Doc9: fakery.fake('doc9', mongoose.model('Document'), 
// 						{title: 'Admin'}),
// 	Doc10: fakery.fake('doc10', mongoose.model('Document'), 
// 						{title: 'User'}),
// };

var fakeDocument = {

    Doc1: {
        ownerId: 1,
        title: 'Hi Doc1',
        content: 'From test Doc1',
        public: true
    },
    Doc2: {
        ownerId: 2,
        title: 'Hi Doc2',
        content: 'From test Doc2',
        public: true
    },
    Doc3: {
        ownerId: 1,
        title: 'Hi Doc3',
        content: 'From test Doc3',
        public: true
    },
    Doc4: {
        ownerId: 1,
        title: 'Hi Doc4',
        content: 'From test Doc4',
        public: true
    },
    Doc5: {
        ownerId: 1,
        title: 'Hi Doc5',
        content: 'From test Doc5',
        public: true
    },
    Doc6: {
        ownerId: 1,
        title: 'Hi Doc6',
        content: 'From test Doc6',
        public: true
    },
    Doc7: {
        ownerId: 1,
        title: 'Hi Doc7',
        content: 'From test Doc7',
        public: true
    },
    Doc8: {
        ownerId: 1,
        title: 'Hi Doc8',
        content: 'From test Doc8',
        public: true
    },
    Doc9: {
        ownerId: 1,
        title: 'Hi Doc9',
        content: 'From test Doc9',
        public: true
    },
    Doc10: {
        ownerId: 1,
        title: 'Hi Doc10',
        content: 'From test Doc10',
        public: true
    },

};


module.exports = fakeDocument;