const catchAsync = require('../utilites/catchAsync');

const User = require('../models/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.joinGroup = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { groups: req.body.group },
    },
    {
      new: true,
    }
  ).select('-__v -email');

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.leaveGroup = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { groups: req.body.group } },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
