const express = require('express')
const router = express.Router()
const postControllers = require('../controllers/postControllers')

router.post('/:userType/:userId', postControllers.createPost)
router.put('/:authorType/:userId/:postId', postControllers.updatePost)
router.delete('/:authorType/:userId/:postId', postControllers.deletePost)
router.get('/:authorType/:userId/', postControllers.getAllPosts)
router.get('/:authorType/:userId/:postId', postControllers.getPostById)

module.exports = router
