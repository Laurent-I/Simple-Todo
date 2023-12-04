const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middleware/verifyToken');

router.post('/register', AuthController.postRegister);

router.post('/login', AuthController.postLogin);

router.post('/logout', AuthMiddleware.logout);

module.exports = router;