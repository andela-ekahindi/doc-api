var Document = require("../models/document");

var DocumentCtrl = {
    CreateOneDoc: function(req, res) {
        if (!req.body.title) {
            return res.status(400).json({
                status: false,
                error: "Title required"
            });
        }
        if (!req.body.content) {
            return res.status(400).json({
                status: false,
                error: "Content required"
            });
        }


        if (!req.decoded) {
            return res.status(401).json({
                status: false,
                error: "Sign In Required"
            });
        }
        var doc = new Document();
        doc.title = req.body.title;
        doc.content = req.body.content;
        doc.ownerId = req.decoded._doc._id;

        doc.save(function(err, doc) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err
                });
            } else {
                return res.status(201).json({
                    status: true,
                    document: doc
                });
            }
        });
    },
    GetAllDocs: function(req, res) {
        if(!req.params.limit){
            //Turn if statements to tenary operators... Like pronto
            req.params.limit = 0;
        }
        if(!req.params.next){
            //Turn if statements to tenary operators... Like pronto
            req.params.next = 0;
        }
        Document.find().sort("-createdAt").limit(Number(req.params.limit)).skip(Number(req.params.next)).exec(function(err, documents) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err
                });
            } else {
                return res.status(200).json({
                    status: true,
                    document: documents
                });
            }
        });
    },
    GetOneDoc: function(req, res) {
        Document.findById(req.params.id, function(err, doc) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err
                });
            } else {
                if (doc)
                    return res.status(200).json({
                        status: true,
                        document: doc
                    });
                return res.status(404).json({
                    status: true,
                    document: doc
                });
            }
        });
    },
    UpdateOneDoc: function(req, res) {
        Document.findById(req.params.id, function(err, doc) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err
                });
            } else {
                if (req.body.title) {
                    doc.title = req.body.title;
                }
                if (req.body.content) {
                    doc.content = req.body.content;
                }
                doc.modifiedAt = Date.now();
                doc.update(function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({
                            status: true,
                            document: doc
                        });
                    }
                });
            }

        });
    },

    DeleteOneDoc: function(req, res) {
        Document.remove({
            _id: req.params.id
        }, function(err) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err
                });
            } else {
                res.json({
                    status: true,
                    document: null
                });
            }
        });
    }
};

module.exports = DocumentCtrl;