const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: String,
    required: true,
  },
},
  {
    timestamps: { updatedAt: 'modifiedAt' },
  });


module.exports = mongoose.model('Document', DocumentSchema);
