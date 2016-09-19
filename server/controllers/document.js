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

    if (req.body.public) {
      doc.public = req.body.public;
    }

    doc.ownerId = req.decoded._id;

    if (req.body.role) {
      doc.role = req.body.role;
    }

    doc.role = req.decoded.role;

    doc.save((error, document) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.status(201).send(document);
    });
  },
  all(req, res) {
    const limit = req.query.limit || 0;
    const page = req.query.page || 0;
    let endDate = Date.now();
    let startDate = new Date('1970-1-1');
    const query = {};
    if (req.query.date) {
      startDate = new Date(req.query.date);
      endDate = new Date(startDate.getTime() + (24 * 60 * 60 * 1000));
    }
    query.createdAt = {
      $gte: startDate,
      $lt: endDate,
    };

    if (req.decoded.role === 'Users') {
      query.role = 'Users';
      query.public = true;
    }

    Document.find(query)
            .sort('-createdAt')
            .limit(Number(limit))
            .skip(Number(page) * Number(limit))
            .exec((error, documents) => {
              if (error) {
                return res.status(500).send(error);
              }
              return res.status(200).send(documents);
            });
  },
  get(req, res) {
    Document.findById(req.params.id, (error, document) => {
      if (error) {
        return res.status(500).send(error);
      }
      if (document) { return res.status(200).send(document); }
      return res.status(404).send(document);
    });
  },
  update(req, res) {
    Document.findById({ _id: req.params.id }, (error, document) => {
      if (error) {
        return res.status(500).send(error);
      }
      if (req.body.title) {
        document.title = req.body.title;
      }
      if (req.body.content) {
        document.content = req.body.content;
      }
      document.save((error) => {
        if (error) {
          return res.status(500).send(error);
        }
        return res.status(200).send(document);
      });
    });
  },
  getByUser(req, res) {
    Document.find({ ownerId: req.params.user_id })
            .sort('-createdAt')
            .exec((error, document) => {
              if (error) {
                return res.status(500).send(error);
              }
              return res.status(200).send(document);
            });
  },
  findByRole(req, res) {
    Document.find({ role: req.query.role })
            .sort('-createdAt')
            .exec((error, document) => {
              if (error) {
                return res.status(500).send(error);
              }
              return res.status(200).send(document);
            });
  },
  delete(req, res) {
    Document.remove({ _id: req.params.id }, (error, document) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.status(200).send(document);
    });
  },
};

module.exports = DocumentCtrl;
