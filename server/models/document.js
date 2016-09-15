const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Document", DocumentSchema);
