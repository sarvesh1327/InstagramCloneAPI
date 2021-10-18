const Group = require('../models/groupModel');
const catchAsync = require('../utilites/catchAsync');
const AppError = require('../utilites/appError');

exports.getAllgroups = catchAsync(async (req, res, next) => {
  const groups = await Group.find();

  res.status(200).json({
    status: 'success',
    data: {
      groups,
    },
  });
});

exports.getGroup = catchAsync(async (req, res, next) => {
  if (!req.user.groups.includes(req.params.id)) {
    return next(
      new AppError(
        'You are not part of this group, Please join the group to see the posts in the group',
        401
      )
    );
  }
  const group = await Group.findById(req.params.id).populate({
    path: 'posts',
    options: { sort: '-createdAt', select: '-__v' },
  });

  res.status(200).json({
    status: 'success',
    data: {
      group,
    },
  });
});

exports.createGroup = catchAsync(async (req, res, next) => {
  const newGroup = await Group.create({
    name: req.body.name,
  });
  res.status(201).json({
    status: 'success',
    data: {
      group: newGroup,
    },
  });
});
