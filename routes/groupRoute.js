const express = require('express');

const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.route('/leave').post(groupController.leaveGroup);

router
  .route('/')
  .get(groupController.getAllgroups)
  .post(authController.protect, groupController.createGroup);

router.route('/:id').get(authController.protect, groupController.getGroup);

module.exports = router;
