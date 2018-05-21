var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAll);
router.get('/email/:email', userController.findByEmail);
router.get('/login/:login', userController.findByLogin);
router.post('/', userController.createUser);
router.put('/', userController.updateUser);

module.exports = router;
