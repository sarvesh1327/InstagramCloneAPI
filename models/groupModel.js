const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a group name'],
      unique: true,
      trim: true,
      maxLength: [50, `Group's name should contain less than 50 characters`],
      minLength: [5, `Group's name should be more than 5 characters`],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

groupSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'group',
  localField: '_id',
});

// groupSchema.pre(/^find/, function (next) {
//   this.select('-__v');
//   next();
// });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
