var express = require('express');
var router = express.Router();

const postController = require('../controllers/postController');

router.get('/user/:username', postController.findByUser);
router.get('/recent/:page', postController.findRecentPosts);
router.post('/', postController.createPost);
router.post('/search/:page', postController.searchPosts); // /api/posts/search/0
router.post('/:postId/comments', postController.createPostComment);
router.get('/:postId/comments', postController.getPostComments);

module.exports = router;
