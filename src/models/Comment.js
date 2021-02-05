const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const CommentSchema = new Schema({
    post_id: { type: ObjectId },
    name: { type: String, },
    email: { type: String, },
    comment: { type: String,  }
});

module.exports = mongoose.model('Comment', CommentSchema);