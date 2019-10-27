require('dotenv').config();
const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');


const User = require('../models/user');


UserController = require('../controller/user');

router.post("/signup", UserController.users_signup);


router.post("/login",UserController.user_login);



router.delete('/:userId', checkAuth, UserController.user_delete);


module.exports = router;