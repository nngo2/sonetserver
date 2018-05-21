var express = require('express');
var router = express.Router();

const userController = require('../controllers/loginController');

router.post('/login', userController.login);

module.exports = router;
