var Document = require('../models/document');
var bodyParser = require('body-parser');

var DocumentCtrl = {
	CreateOneDoc:function (req, res) {
		var doc = new Document();
		doc.title = req.body.title;
		doc.content = req.body.content;
		
        doc.save(function(err, todo){
          	if(err) {
                res.json({status: false, error: "Something went wrong"});
            } else {
            	res.json({status: true, message: "Document Saved"});
            }
        });
	},
	GetAllDocs: function (req, res) {
		Document.find(function(err, documents){
            if(err){
            	res.json({status: false, error: "Something went wrong"});
            }else{
            	res.json(documents);
            }
        });
	},
	GetOneDoc:function (req, res) {
		Document.findById(req.params.id, function (err, doc) {
            if (err){
                res.send(err);
            }else{
            	res.json(doc);
            }
    	});
	},

	DeleteOneDoc: function(req, res){
        Document.remove({_id: req.params.id}, function(err, doc){
            if(err) {
            	res.json({status: false, error: "Deleting Doc did not happen"});
            }else{
            	res.json({status: true, message: "Deleted successfully"});
            }
        });
    }
};

module.exports = DocumentCtrl;