var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const connectionController = require('../controllers/connectionController');

router.get('/findUsers', userController.findUsers);
router.get('/online', userController.getOnlineUsers);
router.get('/friends/:id', connectionController.getFriendList);
router.get('/addFriend', connectionController.addFriend);
router.get('/email/:email', userController.findByEmail);
router.get('/login/:login', userController.findByLogin);
router.post('/', userController.createUser);
router.put('/', userController.updateUser);

module.exports = router;
