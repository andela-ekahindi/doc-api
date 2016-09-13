/* eslint no-underscore-dangle: "off" */
/* eslint no-param-reassign: "off" */
/* eslint consistent-return: "off" */
/* eslint no-shadow: "off"*/

const Document = require("../models/document");

const DocumentCtrl = {
  CreateOneDoc(req, res) {
    if (!req.body.title) { return res.status(400).json({ status: false, error: "Title required" }); }
    if (!req.body.content) { return res.status(400).json({ status: false, error: "Content required" }); }
    const doc = new Document();
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.ownerId = req.decoded._doc._id;

    doc.save((err, document) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      return res.status(201).json({ status: true, document });
    });
  },
  GetAllDocs(req, res) {
    const limit = req.query.limit || 0;
    const next = req.query.next || 0;
    Document.find()
            .sort("-createdAt")
            .limit(Number(limit))
            .skip(Number(next))
            .exec((err, documents) => {
              if (err) { return res.status(500).json({ status: false, error: err }); }
              return res.status(200).json({ status: true, documents });
            });
  },
  GetOneDoc(req, res) {
    Document.findById(req.params.id, (err, doc) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      if (doc) { return res.status(200).json({ status: true, document: doc }); }
      return res.status(404).json({ status: true, document: doc });
    });
  },
  UpdateOneDoc(req, res) {
    Document.findById({ _id: req.params.id }, (err, doc) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      if (req.body.title) { doc.title = req.body.title; }
      if (req.body.content) { doc.content = req.body.content; }
      doc.modifiedAt = Date.now();
      doc.save((err) => {
        if (err) { return res.status(500).json({ status: false, error: err }); }
        return res.status(200).send({ status: true, document: doc });
      });
    });
  },
  FindAllDocByUser(req, res) {
    Document.find({ ownerId: req.params.user_id })
            .sort("-createdAt")
            .exec((err, doc) => {
              if (err) { return res.status(500).json({ status: false, error: err }); }
              return res.status(200).json({ status: true, document: doc });
            });
  },
  DeleteOneDoc(req, res) {
    Document.remove({ _id: req.params.id }, (err) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      return res.status(200).json({ status: true, document: null });
    });
  },
};

module.exports = DocumentCtrl;
