const express = require('express');

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const s3Controller = require('../controllers/s3Controller');

const router = express.Router();
router.use('/', authController.protect);
router
  .route('/')
  .post(postController.validate, s3Controller.s3Upload, postController.upload);

router.route('/feed').get(postController.getFeed);
router.route('/like-button').patch(postController.manageLikes);
router.route('/:id').get(postController.getPost);

module.exports = router;
