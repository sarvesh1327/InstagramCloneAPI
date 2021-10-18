const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, 'Please provide a heading for your post'],
      trim: true,
    },
    caption: {
      type: String,
      maxLength: [
        500,
        'You cannot excced the maxnumber of characters for caption',
      ],
    },
    multimedia: {
      type: String,
    },
    group: {
      type: mongoose.Schema.ObjectId,
      ref: 'Group',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual('totalLikes').get(function () {
  return this.likes.length;
});

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});
// postSchema.pre(/^find/);

postSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

postSchema.methods.toggleLikes = function (userId) {
  if (this.likes.includes(userId)) {
    this.likes.splice(userId, 1);
    return;
  }
  this.likes.push(userId);
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
