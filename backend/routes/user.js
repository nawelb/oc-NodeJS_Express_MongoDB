const express = require('express');
const router = express.Router();

const userController= require('../controllers/User');
const User = require('../models/User');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

module.exports=router;