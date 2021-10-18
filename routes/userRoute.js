const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(authController.signup);

router.post('/login', authController.login);
router.get('/', userController.getAllUsers);
router.use('/', authController.protect);
router.route('/join').patch(userController.joinGroup);
router.route('/leave').patch(userController.leaveGroup);

module.exports = router;
