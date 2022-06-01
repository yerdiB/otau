const express = require('express')
const commentController = require('../controllers/commentController')
const router = express.Router();


router.get('/',commentController.getAllComment);
router.post('/', commentController.createComment);
router.patch('/:commentId', commentController.updateComment);
router.delete('/', commentController.deleteComment);

module.exports = router