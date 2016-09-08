"use strict"
let Document = require("../models/document");

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
        if (!req.query.limit) {
            //Turn if statements to tenary operators... Like pronto
            req.query.limit = 0;
        }
        if (!req.query.next) {
            //Turn if statements to tenary operators... Like pronto
            req.query.next = 0;
        }
        Document.find()
            .sort("-createdAt")
            .limit(Number(req.query.limit))
            .skip(Number(req.query.next))
            .exec(function(err, documents) {
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
        Document.findById({_id: req.params.id}, function(err, doc) {
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
                doc.save(function(err) {
                    if (err) {
                        return res.status(500).json({
                            status: false,
                            error: err
                        });
                    } else {
                        return res.status(200).send({
                            status: true,
                            document: doc
                        });
                    }
                });
            }

        });
    },
    FindByDateCreate: function(req, res) {
        Document.find({
            createdAt: req.params.date
        }).exec(function(err, doc) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err
                });
            } else {
                return res.status(200).json({
                    status: true,
                    document: doc
                });
            }
        });
    },
    FindAllDocByUser: function(req, res) {
        Document.find({
            ownerId: req.params.user_id
        })
            .sort("-createdAt")
            .exec(function(err, doc) {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        error: err
                    });
                } else {
                    return res.status(200).json({
                        status: true,
                        document: doc
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
                return res.status(200).json({
                    status: true,
                    document: null
                });
            }
        });
    }
};

module.exports = DocumentCtrl;