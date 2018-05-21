var express = require('express');
var router = express.Router();

const postController = require('../controllers/postController');

router.get('/:username', postController.findByUser);
router.post('/', postController.createPost);

module.exports = router;
