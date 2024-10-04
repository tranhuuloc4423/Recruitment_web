const express = require('express')
const router = express.Router()
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
  updateViews,
  updateApplied,
  updateSaved,
  updateStatus
} = require('../controllers/postControllers')

router.post('/create', createPost)
router.put('/:postId', updatePost)
router.delete('/:postId', deletePost)
router.get('/:userId/', getAllPosts)
router.get('/:userId/:postId', getPostById)
router.put('/:postId/views', updateViews)
router.put('/:postId/applied', updateApplied)
router.put('/:postId/saved', updateSaved)
router.put('/:postId/status', updateStatus)

module.exports = router
