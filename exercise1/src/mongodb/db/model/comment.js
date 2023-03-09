const mongoose = require('../index');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    createdAt: Number,
    updatedAt: Number
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
  }
);

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
