var Document = require('../models/document');

var DocumentCtrl = {
	CreateOneDoc:function (req, res) {
		var doc = new Document();
		doc.title = req.body.title;
		doc.content = req.body.content;
        doc.ownerId = req.body.ownerId;

        doc.save(function(err, todo){
          	if(err) {
                console.log(err);
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
    UpdateOneDoc: function (req, res) {
        Document.findById(req.params.id, function (err, doc) {
            if (err){
                res.send(err);
            }
            else{
                if(req.body.title){
                    doc.title = req.body.title;
                }
                if(req.body.content){
                    doc.content = req.body.content;
                }
                doc.modifiedAt = Date.now();
                doc.update(function (err) {
                    if(err){
                        res.send(err);
                    }else{
                        res.send({message: "Doc Updated", document: doc});
                    }
                });
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