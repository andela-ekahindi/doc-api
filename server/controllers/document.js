const Document = require('../models/document');

const DocumentCtrl = {
  create(req, res) {
    if (!req.body.title) {
      return res.status(400).send({ error: 'Title required' });
    }
    if (!req.body.content) {
      return res.status(400).send({ error: 'Content required' });
    }
    const doc = new Document();
    doc.title = req.body.title;
    doc.content = req.body.content;
    if (req.body.public) { doc.public = req.body.public; }
    doc.ownerId = req.decoded._doc._id;
    if (req.body.role) { doc.role = req.body.role; } else { doc.role = req.decoded._doc.role; }

    doc.save((err, document) => {
      if (err) { return res.status(500).json({ error: err }); }
      return res.status(201).send(document);
    });
  },
  all(req, res) {
    const limit = req.query.limit || 0;
    const page = req.query.page || 0;
    let endDate = Date.now();
    let startDate;
    const query = {};
    startDate = new Date('1970-1-1');
    if (req.query.date) {
      startDate = new Date(req.query.date);
      endDate = new Date(startDate.getTime() + (24 * 60 * 60 * 1000));
    }

    if (req.query.date) {
      query.createdAt = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    if (req.decoded._doc.role === 'Users') {
      query.role = 'Users';
      query.public = true;
    }

    if (req.decoded._doc.role === 'Users') {
      Document.find(query)
              .sort('-createdAt')
              .limit(Number(limit))
              .skip(Number(page) * Number(limit))
              .exec((err, documents) => {
                if (err) { return res.status(500).json({ status: false, error: err }); }
                return res.status(200).json({ status: true, documents });
              });
    } else {
      Document.find({
        createdAt: { $gte: startDate,
                $lt: endDate,
              },
      })
              .sort('-createdAt')
              .limit(Number(limit))
              .skip(Number(Number(page) * Number(limit)))
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
      doc.save((err) => {
        if (err) { return res.status(500).json({ status: false, error: err }); }
        return res.status(200).send({ status: true, document: doc });
      });
    });
  },
  getByUser(req, res) {
    Document.find({ ownerId: req.params.user_id })
            .sort('-createdAt')
            .exec((err, doc) => {
              if (err) { return res.status(500).json({ status: false, error: err }); }
              return res.status(200).json({ status: true, document: doc });
            });
  },
  findByRole(req, res) {
    Document.find({ role: req.query.role })
            .sort('-createdAt')
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
