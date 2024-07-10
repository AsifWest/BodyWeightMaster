const express = require('express');
const router = express.Router();
// Controllers function
const { signupUser, loginUser } = require('../controlers/userController');

// Login
router.post('/login', loginUser);

// Signup
router.post('/signup', signupUser);

module.exports = router;
