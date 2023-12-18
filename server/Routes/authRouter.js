const express = require('express');
const router = express.Router();
const { Signup, Login } = require('../Controllers/authController');
const { userVerification } = require('../Middlewares/AuthMiddleware');

router.post('/auth/signup', Signup);
router.post('/auth/login', Login);
router.post('/', userVerification);

module.exports = router;
