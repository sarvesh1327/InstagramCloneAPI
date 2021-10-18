const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const catchAsync = require('../utilites/catchAsync');
const AppError = require('../utilites/appError');

exports.validate = (req, res, next) => {
  if (!req.user.groups.includes(req.body.group)) {
    return next(
      new AppError(
        'You are not part of this group, Please join this group to post anything in this group',
        401
      )
    );
  }
  if (!req.body.heading) {
    return next(
      new AppError(
        'This post need a heading, Please provide a heding first',
        400
      )
    );
  }
  next();
};

exports.upload = catchAsync(async (req, res, next) => {
  const newPost = await Post.create({
    heading: req.body.heading,
    caption: req.body.caption,
    multimedia: req.body.multimedia,
    group: req.body.group,
  });
  res.status(201).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
});

exports.getFeed = catchAsync(async (req, res, next) => {
  const posts = await Post.find()
    .where('group')
    .in(req.user.groups)
    .sort('-createdAt')
    .populate({
      path: 'group',
      select: 'name',
    });
  res.status(200).json({
    staus: 'success',
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: 'comments',
    sort: '-createdAt',
    select: '-__v',
  });
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.manageLikes = catchAsync(async (req, res, next) => {
  let post = await Post.findById(req.body.post);
  post.toggleLikes(req.user._id);
  post = await post.save();
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const comment = await Comment.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      comment,
    },
  });
});
