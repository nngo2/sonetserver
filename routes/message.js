var express = require('express');
var router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/add', messageController.addMessage);
router.get('/:fromUserId/:toUserId', messageController.getMessages);

module.exports = router;