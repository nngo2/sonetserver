var express = require('express');
var router = express.Router();

const postController = require('../controllers/postController');

router.get('/user/:username', postController.findByUser);
router.get('/recent/:page', postController.findRecentPosts);
router.post('/', postController.createPost);

module.exports = router;
