var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.get('/email/:email', userController.findByEmail);
router.get('/login/:login', userController.findByLogin);
router.post('/', userController.createUser);

module.exports = router;
