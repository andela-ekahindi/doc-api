let mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Document", DocumentSchema);