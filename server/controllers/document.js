/* eslint no-underscore-dangle: "off" */
/* eslint no-param-reassign: "off" */
/* eslint consistent-return: "off" */
/* eslint no-shadow: "off"*/

const Document = require("../models/document");

const DocumentCtrl = {
  create(req, res) {
    if (!req.body.title) { return res.status(400).json({ status: false, error: "Title required" }); }
    if (!req.body.content) { return res.status(400).json({ status: false, error: "Content required" }); }
    const doc = new Document();
    doc.title = req.body.title;
    doc.content = req.body.content;
    if (req.body.public) { doc.public = req.body.public; }
    doc.ownerId = req.decoded._doc._id;

    doc.save((err, document) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      return res.status(201).json({ status: true, document });
    });
  },
  all(req, res) {
    const limit = req.query.limit || 0;
    const next = req.query.next || 0;
    let endDate;
    let startDate;
    if (req.query.date) {
      startDate = new Date(req.query.date);
      endDate = new Date(startDate.getTime() + (24 * 60 * 60 * 1000));
    } else {
      endDate = Date.now();
      startDate = new Date("1970-1-1");
    }
    if (req.decoded._doc.role === "Users") {
      Document.find({ public: true,
                      createdAt: { $gte: startDate,
                                   $lt: endDate,
                                  },
                     })
              .sort("-createdAt")
              .limit(Number(limit))
              .skip(Number(next))
              .exec((err, documents) => {
                if (err) { return res.status(500).json({ status: false, error: err }); }
                return res.status(200).json({ status: true, documents });
              });
    } else {
      Document.find({ createdAt: { $gte: startDate, $lt: endDate } })
              .sort("-createdAt")
              .limit(Number(limit))
              .skip(Number(next))
              .exec((err, documents) => {
                if (err) { return res.status(500).json({ status: false, error: err }); }
                return res.status(200).json({ status: true, documents });
              });
    }
  },
  get(req, res) {
    Document.findById(req.params.id, (err, doc) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      if (doc) { return res.status(200).json({ status: true, document: doc }); }
      return res.status(404).json({ status: true, document: doc });
    });
  },
  update(req, res) {
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
  getByUser(req, res) {
    Document.find({ ownerId: req.params.user_id })
            .sort("-createdAt")
            .exec((err, doc) => {
              if (err) { return res.status(500).json({ status: false, error: err }); }
              return res.status(200).json({ status: true, document: doc });
            });
  },
  delete(req, res) {
    Document.remove({ _id: req.params.id }, (err) => {
      if (err) { return res.status(500).json({ status: false, error: err }); }
      return res.status(200).json({ status: true, document: null });
    });
  },
};

module.exports = DocumentCtrl;
