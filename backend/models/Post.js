const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: function () {
      return !this.image
    }
  },
  image: {
    type: String,
    required: function () {
      return !this.text;
    }
  },
  tags: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;